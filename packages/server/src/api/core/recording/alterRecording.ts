import {
  AlterRecordingError,
  AlterRecordingResponse,
  Recording,
} from '@smartesting/shared/dist'
import {
  countScenarioNumber,
  createAllScenario,
  get_variables,
  parseAndGenerate,
} from '@smartesting/fdit-scenario/dist/web'
import { Declarations } from '@smartesting/fdit-scenario/dist/types_variables'
import fs from 'fs'
import { execSync } from 'child_process'
import assert from 'assert'

export default async function alterRecording(
  scenario: string,
  recording: Recording,
  recordingToReplay?: Recording
): Promise<AlterRecordingResponse> {
  const { error, filesToRemove, newfileName, scenarioJson } =
    await generateJsonAndAlterate(scenario, recording, recordingToReplay)

  // TODO: delete files if there is an error
  if (error)
    return {
      error: AlterRecordingError.invalidSyntax,
      alteredRecordings: [],
    }

  assert(filesToRemove)
  assert(newfileName)
  assert(scenarioJson)

  const alteredRecordings: Recording[] = []
  for (const fileToRemoveName of filesToRemove) {
    if (fileToRemoveName.startsWith('modified__')) {
      const data = await fs.promises.readFile('./temp/' + fileToRemoveName)
      alteredRecordings.push({
        content: data.toString(),
        name: fileToRemoveName,
      })
    }
    fs.unlink(`temp/${fileToRemoveName}`, () => null)
  }

  return {
    alteredRecordings,
    error: null,
  }
}

/**
 * Generation of Json scenario and creation of altered recording
 * @param scenario scenario program to parse
 * @param fileContent Content of file will be altered
 * @param fileName Name of file will be altered
 * @param fileContent2 Content of file 2 will be use for alteration (OPTIONAL)
 * @param fileName2 Name of file 2 will be use for alteration (OPTIONAL)
 * @returns Generated output from this FDIT program
 */
export const generateJsonAndAlterate = async (
  scenario: string,
  recording: Recording,
  recordingToReplay?: Recording
): Promise<{
  scenarioJson?: {}
  newfileName?: string
  filesToRemove?: string[]
  error?: string
}> => {
  /** Recuperation de variables sous format JSON **/
  const variablesJson: Declarations | undefined = await get_variables(scenario)
  let filesToRemove: string[] = []
  /** Si variableJson est defini alors existence de variable **/
  if (variablesJson != undefined && variablesJson!.declarations.length != 0) {
    /** Compte le nombre de scénario possibles **/
    let nb_scenario: number = 1
    for (let i = 0; i < variablesJson.declarations.length; i++) {
      nb_scenario =
        nb_scenario *
        countScenarioNumber(scenario, variablesJson.declarations[i])
    }
    /** Creation de tous les scenarios possibles (format scenario) **/
    const liste_scenario: string[] = createAllScenario(
      scenario,
      variablesJson,
      nb_scenario
    )
    let scenarioOne = undefined
    let fileNameToReturn = ''
    /** Pour chaque scenario, parse du scenario, creation de fichier et alteration **/
    for (let i = 0; i < liste_scenario.length; i++) {
      let index_filename = recording.name.indexOf('.')
      let newfileName =
        recording.name.substring(0, index_filename) +
        '_' +
        i +
        recording.name.substring(index_filename)
      const scenarioJson = await parseAndGenerate(
        liste_scenario[i],
        newfileName,
        recording.content
      )
      /** Créé un fichier JSON du scenario envoyé **/
      if (i == 0) {
        scenarioOne = scenarioJson
        fileNameToReturn = newfileName
      }
      filesToRemove.push('modified__' + newfileName)
      filesToRemove.push('scenario_' + i + '.json')
      await fs.promises.writeFile(
        'temp/scenario_' + i + '.json',
        JSON.stringify(scenarioJson, null, 2)
      )

      await fs.promises.writeFile('temp/' + newfileName, recording.content)
      if (recordingToReplay) {
        await fs.promises.writeFile(
          'temp/' + recordingToReplay.name,
          recording.content
        )
        filesToRemove.push(recordingToReplay.name)
      }

      executeAlterationJar(
        recording.content,
        newfileName,
        'temp/scenario_' + i + '.json'
      )

      fs.unlink('temp/' + newfileName, () => {
        console.log('Le fichier ' + newfileName + ' a été supprimé.')
      })
    }

    return {
      scenarioJson: scenarioOne,
      newfileName: fileNameToReturn,
      filesToRemove,
    }
  } else {
    /** Pas de variables donc parse du scenario, creation des fichiers et altération **/
    const scenarioJson = await parseAndGenerate(
      scenario,
      recording.name,
      recording.content
    )
    /** Créé un fichier JSON du scenario envoyé **/
    if (scenarioJson == undefined) {
      await fs.promises.writeFile(
        'temp/scenario.json',
        JSON.stringify({}, null, 2)
      )
      filesToRemove.push('scenario.json')
      return { error: 'error while parsing', filesToRemove }
    } else {
      await fs.promises.writeFile(
        'temp/scenario.json',
        JSON.stringify(scenarioJson, null, 2)
      )
      filesToRemove.push('scenario.json')
    }

    await fs.promises.writeFile('temp/' + recording.name, recording.content)
    if (recordingToReplay) {
      await fs.promises.writeFile(
        'temp/' + recordingToReplay.name,
        recording.content
      )
      filesToRemove.push(recordingToReplay.name)
    }

    filesToRemove.push('modified__' + recording.name)

    executeAlterationJar(
      recording.content,
      recording.name,
      'temp/scenario.json'
    )

    fs.unlink('temp/' + recording.name, () => {
      console.log('Le fichier ' + recording.name + ' a été supprimé.')
    })
    return { scenarioJson, newfileName: recording.name, filesToRemove }
  }
}

/**
 * Execution of Java Alteration program
 * @param fileContent Content of file will be altered
 * @param fileName Name of file will be altered
 * @param path_scenario Path of scenario which will be applied on recording
 * @returns void
 */
function executeAlterationJar(
  fileContent: string,
  fileName: string,
  path_scenario: string
): void {
  execSync(
    'java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar ' +
      path_scenario +
      ' ' +
      fileName
  )
}
