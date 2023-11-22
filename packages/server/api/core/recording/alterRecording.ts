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
} from '@smartesting/alteration-scenario/dist/web'
import { Parameters } from '@smartesting/alteration-scenario/dist/types'
import assert from 'assert'
import IAlterationManager from '../../adapters/IAlterationManager'
import { csvToSbs, sbsToCsv } from '@dapia-project/data-converter/dist/src'
import { AlterationScenarioSemanticVisitor } from '@smartesting/alteration-scenario/dist/generators/AlterationScenarioSemanticVisitor'
import { SemanticError } from '@smartesting/alteration-scenario/dist/generators/index'

export default async function alterRecording(
  scenario: string,
  recording: Recording,
  recordingToReplay: Recording | undefined,
  optionsAlteration: OptionsAlteration,
  alterationManager: IAlterationManager
): Promise<AlterRecordingResponse> {
  let fileIsCsv: boolean = false

  const regex = /.csv$/i
  if (regex.test(recording.name)) {
    fileIsCsv = true
    recording.content = csvToSbs(recording.content)

    if (recording.content === 'Error content file') {
      return {
        error: recording.content,
        alteredRecordings: [],
      }
    }
    recording.name = recording.name.replace('.csv', '.sbs')
  }
  if (recordingToReplay !== undefined) {
    if (regex.test(recordingToReplay.name)) {
      recordingToReplay.content = csvToSbs(recordingToReplay.content)
      if (recordingToReplay.content === 'Error content file') {
        return {
          error: recordingToReplay.content,
          alteredRecordings: [],
        }
      }
      recordingToReplay.name = recordingToReplay.name.replace('.csv', '.sbs')
    }
  }

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
  for (const alteredRecording of alteredRecordings) {
    alteredRecording.content = alteredRecording.content.replace(/\n+$/, '\n')
  }
  console.log(parameters)
  if (fileIsCsv) {
    let alteredRecordingsCsv: Recording[] = []
    for (const recordingSbs of alteredRecordings) {
      let contentCsv: string = sbsToCsv(recordingSbs.content)
      let contentName: string = recordingSbs.name.replace('.sbs', '.csv')
      let recordingCsv: Recording = { content: contentCsv, name: contentName }
      alteredRecordingsCsv.push(recordingCsv)
    }

    return {
      alteredRecordings: alteredRecordingsCsv,
      error: null,
    }
  } else {
    return {
      alteredRecordings,
      error: null,
    }
  }
}

/**
 * Generation of Json scenario and creation of altered recording
 * @param scenario scenario program to parse
 * @param recording Recording to alter
 * @param recordingToReplay Recording to replay
 * @returns Generated output from this ALTERATION program
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

  const visitor = new AlterationScenarioSemanticVisitor()
  const result: SemanticError[] = visitor.visitScenario(value)
  const array_result: string[] = []
  for (const semanticError of result) {
    if (semanticError.errors != '') {
      array_result.push(semanticError.errors)
    }
  }
  if (array_result.length > 0) {
    return {
      parameters: [],
      errors: array_result,
    }
  }

  const parameters: Parameters[] = []

  const scenarios: string[] = []
  if (declarations.declarations.length === 0)
    if (recordingToReplay === undefined) {
      return {
        parameters: [generateStatements(value, recording)],
        errors: [],
      }
    } else {
      return {
        parameters: [generateStatements(value, recording, recordingToReplay)],
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
        parameters.push(generateStatements(value, recording))
      } else {
        parameters.push(generateStatements(value, recording, recordingToReplay))
      }
    }
  }
  return {
    parameters,
    errors: [],
  }
}
