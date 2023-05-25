import {
  AlterRecordingError,
  AlterRecordingResponse,
  OptionsAlteration,
  Recording,
} from '@smartesting/shared/dist'
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
  optionsAlteration: OptionsAlteration,
  alterationManager: IAlterationManager
): Promise<AlterRecordingResponse> {
  const { errors, parameters } = await extractParameters(
    scenario,
    recording,
    recordingToReplay
  )

  if (errors.length > 0)
    return {
      error: errors.join('\n'),
      alteredRecordings: [],
    }

  assert(parameters)

  const alteredRecordings = await alterationManager.runAlterations(
    parameters,
    recording,
    optionsAlteration,
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
 * @param recordingToReplay *optional* Recording to replay
 * @returns Generated output from this FDI-T program
 */
export const extractParameters = async (
  scenario: string,
  recording: Recording,
  recordingToReplay: Recording | undefined
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
    errors.push(AlterRecordingError.invalidSyntax)
    return {
      errors,
      parameters: [],
    }
  }

  const declarations = evalDeclarations(value.declarations)

  const parameters: Parameters[] = []

  const scenarios: string[] = []
  if (declarations.declarations.length === 0)
    if (recordingToReplay === undefined) {
      return {
        parameters: [
          generateStatements(value, recording.name, recording.content, ''),
        ],
        errors: [],
      }
    } else {
      return {
        parameters: [
          generateStatements(
            value,
            recording.name,
            recording.content,
            recordingToReplay.name
          ),
        ],
        errors: [],
      }
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
      if (recordingToReplay === undefined) {
        parameters.push(
          generateStatements(value, recording.name, recording.content, '')
        )
      } else {
        parameters.push(
          generateStatements(
            value,
            recording.name,
            recording.content,
            recordingToReplay.name
          )
        )
      }
    }
  }
  return {
    parameters,
    errors: [],
  }
}
