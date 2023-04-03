import { AlterRecordingResponse, Recording } from '@smartesting/shared/dist'
import {
  countScenarioNumber,
  createAllScenario,
  evalDeclarations,
  generateStatements,
  parseScenario,
} from '@smartesting/fdit-scenario/dist/web'
import { Parameters } from '@smartesting/fdit-scenario/dist/types'
import assert from 'assert'
import IAlterationManager from '../../adapters/IAlterationManager'

export default async function alterRecording(
  scenario: string,
  recording: Recording,
  recordingToReplay: Recording | undefined,
  alterationManager: IAlterationManager
): Promise<AlterRecordingResponse> {
  const { errors, parameters } = await extractParameters(scenario, recording)

  console.log(JSON.stringify(parameters))

  if (errors.length > 0)
    return {
      error: errors.join('\n'),
      alteredRecordings: [],
    }

  assert(parameters)

  const alteredRecordings = await alterationManager.runAlterations(
    parameters,
    recording,
    recordingToReplay
  )

  return {
    alteredRecordings,
    error: null,
  }
}

/**
 * Generation of Json scenario and creation of altered recording
 * @param scenario scenario program to parse
 * @param recording Recording to alter
 * @returns Generated output from this FDI-T program
 */
export const extractParameters = async (
  scenario: string,
  recording: Recording
): Promise<{
  parameters: Parameters[]
  errors: string[]
}> => {
  const { value, parserErrors, lexerErrors } = await parseScenario(scenario)

  const errors = lexerErrors
    .map(
      (lexerError: any) =>
        `${lexerError.message}: l.${lexerError.line}:${lexerError.column}`
    )
    .concat(
      parserErrors.map(
        (parserError: any) =>
          `${parserError.message}: near '${parserError.token.image}' -> l.${parserError.token.startLine}:${parserError.token.startColumn}`
      )
    )

  if (errors.length > 0) {
    return {
      errors,
      parameters: [],
    }
  }

  const declarations = evalDeclarations(value.declarations)

  const parameters: Parameters[] = []

  const scenarios: string[] = []
  if (declarations.declarations.length === 0)
    return {
      parameters: [
        generateStatements(value, recording.name, recording.content),
      ],
      errors: [],
    }

  let scenarioNumber: number = 1
  for (const declaration of declarations.declarations) {
    scenarioNumber = scenarioNumber * countScenarioNumber(scenario, declaration)
  }
  scenarios.push(...createAllScenario(scenario, declarations, scenarioNumber))

  for (const newScenario of scenarios) {
    const { value, parserErrors, lexerErrors } = await parseScenario(
      newScenario
    )
    if (parserErrors.length === 0 && lexerErrors.length === 0) {
      parameters.push(
        generateStatements(value, recording.name, recording.content)
      )
    }
  }
  return {
    parameters,
    errors: [],
  }
}

const alterRecordings = (scenario: string, recording: Recording): void => {}

/*for (let i = 0; i < scenarios.length; i++) {
  let index_filename = recording.name.indexOf('.')
  let newfileName =
    recording.name.substring(0, index_filename) +
    '_' +
    i +
    recording.name.substring(index_filename)
  const scenarioJson = await parseAndGenerate(
    scenarios[i],
    newfileName,
    recording.content
  )
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
} */
