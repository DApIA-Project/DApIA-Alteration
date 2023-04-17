import { Parameters } from '@smartesting/fdit-scenario/dist/types'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import IAlterationManager from './IAlterationManager'
import { execSync } from 'child_process'
import * as fs from 'fs'

export class JavaAlterationManager implements IAlterationManager {
  async runAlterations(
    parameters: Parameters[],
    recording: Recording,
    optionsAlteration: OptionsAlteration,
    recordingToReplay?: Recording
  ): Promise<Recording[]> {
    let recordingsAltered: Recording[] = []

    let numeroFichier = 0
    for (const parameter of parameters) {
      let indexFileName = recording.name.indexOf('.')
      let newFileName =
        recording.name.substring(0, indexFileName) +
        '_' +
        numeroFichier +
        recording.name.substring(indexFileName)
      if (parameters[numeroFichier].sensors != undefined) {
        parameters[numeroFichier].sensors.sensor![0].record = newFileName
      }

      await fs.promises.writeFile(
        'temp/scenario_' + numeroFichier + '.json',
        JSON.stringify(parameters[numeroFichier], null, 2)
      )
      await fs.promises.writeFile('temp/' + newFileName, recording.content)
      if (recordingToReplay != undefined) {
        await fs.promises.writeFile(
          'temp/' + recordingToReplay.name,
          recordingToReplay.content
        )
      }

      const optionsToWrite: string = determineOptions(optionsAlteration)

      await executeAlterationJar(
        recording.content,
        newFileName,
        optionsToWrite,
        'temp/scenario_' + numeroFichier + '.json'
      )

      const contentFileAltered = await fs.promises.readFile(
        'temp/modified__' + newFileName
      )
      recordingsAltered.push({
        name: 'modified__' + newFileName,
        content: contentFileAltered.toString(),
      })

      fs.unlink('temp/scenario_' + numeroFichier + '.json', () => {})

      fs.unlink('temp/' + newFileName, () => {})

      fs.unlink('temp/modified__' + newFileName, () => {})

      if (recordingToReplay != undefined) {
        fs.unlink('temp/' + recordingToReplay.name, () => {})
      }

      numeroFichier++
    }

    return recordingsAltered
  }
}

/**
 * Execution of Java Alteration program
 * @param fileContent Content of file will be altered
 * @param fileName Name of file will be altered
 * @param scenarioPath Path of scenario which will be applied on recording
 * @returns void
 */
function executeAlterationJar(
  fileContent: string,
  fileName: string,
  options: string,
  scenarioPath: string
): void {
  execSync(
    'java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar ' +
      scenarioPath +
      ' ' +
      fileName +
      ' ' +
      options
  )
}

function determineOptions(options: OptionsAlteration): string {
  let strOption = ''
  if (options.haveLabel) {
    strOption = strOption + '-l'
  }
  if (options.haveRealism) {
    strOption = strOption + ' -gs -t -vr -latn -lonn'
  }
  return strOption
}
