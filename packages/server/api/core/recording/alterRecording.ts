import {
  AlterRecordingError,
  AlterRecordingResponse,
  FileFormat,
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
import {
  openskyCsvToSbs,
  sbsToJson,
  sbsToNdjson,
  sbsToOpenskyCsv,
} from '@dapia-project/data-converter/dist/src'
import { AlterationScenarioSemanticVisitor } from '@smartesting/alteration-scenario/dist/generators/AlterationScenarioSemanticVisitor'
import { SemanticError } from '@smartesting/alteration-scenario/dist/generators/index'
import { getDataType } from '@dapia-project/data-converter/dist/src/utils/utils'
import { droneCsvToSbs } from '@dapia-project/data-converter/dist/src/droneCsvToSbs'
import { sbsToDroneCsv } from '@dapia-project/data-converter/dist/src/sbsToDroneCsv'
import { JsonMessage } from '@dapia-project/data-converter'

export default async function alterRecording(
  scenario: string,
  recording: Recording,
  recordingToReplay: Recording | undefined,
  optionsAlteration: OptionsAlteration,
  outputFormat: FileFormat,
  alterationManager: IAlterationManager
): Promise<AlterRecordingResponse> {
  let contentOrigin: string = recording.content
  let nameOrigin: string = recording.name
  let fileIsCsv: boolean = false
  let dataType: string = ''
  let dataTypeReplay: string
  const regex = /.csv$/i
  if (regex.test(recording.name)) {
    fileIsCsv = true
    dataType = getDataType(recording.content)
    if (dataType === 'drone') {
      recording.content = droneCsvToSbs(recording.content)
    } else {
      recording.content = openskyCsvToSbs(recording.content)
    }

    if (recording.content === 'Error content file') {
      return {
        error: AlterRecordingError.invalidContentFile,
        alteredRecordings: [],
      }
    }
    recording.name = recording.name.replace('.csv', '.sbs')
  }
  if (recordingToReplay !== undefined) {
    if (regex.test(recordingToReplay.name)) {
      dataTypeReplay = getDataType(recordingToReplay.content)
      if (dataTypeReplay === 'drone') {
        recordingToReplay.content = droneCsvToSbs(recordingToReplay.content)
      } else {
        recordingToReplay.content = openskyCsvToSbs(recordingToReplay.content)
      }
      if (recordingToReplay.content === 'Error content file') {
        return {
          error: AlterRecordingError.invalidContentFile,
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
      error: AlterRecordingError.invalidSyntax,
      alteredRecordings: [],
    }

  assert(parameters)
  const alteredRecordings = await alterationManager.runAlterations(
    parameters,
    recording,
    optionsAlteration,
    recordingToReplay
  )

  if (outputFormat === FileFormat.auto) {
    let extension: string = nameOrigin.split('.').pop()!
    switch (extension) {
      case 'csv':
        if (getDataType(contentOrigin) === 'drone') {
          outputFormat = FileFormat.droneCsv
        } else {
          outputFormat = FileFormat.openskyCsv
        }
        break
      case 'json':
        outputFormat = FileFormat.json
        break
      case 'ndjson':
        outputFormat = FileFormat.ndjson
        break
      default:
        outputFormat = FileFormat.sbs
        break
    }
  }
  switch (outputFormat) {
    case FileFormat.sbs:
      return {
        alteredRecordings,
        error: null,
      }
    case FileFormat.openskyCsv:
      let alteredRecordingsOpenskyCsv: Recording[] = []
      for (const recordingSbs of alteredRecordings) {
        let contentOpenskyCsv: string = sbsToOpenskyCsv(
          recordingSbs.content,
          false
        )
        let contentName: string = recordingSbs.name.replace('.sbs', '.csv')
        let recordingOpenskyCsv: Recording = {
          content: contentOpenskyCsv,
          name: contentName,
        }
        alteredRecordingsOpenskyCsv.push(recordingOpenskyCsv)
      }
      return {
        alteredRecordings: alteredRecordingsOpenskyCsv,
        error: null,
      }
    case FileFormat.droneCsv:
      let alteredRecordingsDroneCsv: Recording[] = []
      for (const recordingSbs of alteredRecordings) {
        let contentDroneCsv: string = sbsToDroneCsv(recordingSbs.content, false)
        let contentName: string = recordingSbs.name.replace(
          '.sbs',
          '.drone.csv'
        )
        let recordingDroneCsv: Recording = {
          content: contentDroneCsv,
          name: contentName,
        }
        alteredRecordingsDroneCsv.push(recordingDroneCsv)
      }
      return {
        alteredRecordings: alteredRecordingsDroneCsv,
        error: null,
      }
    case FileFormat.json:
      let alteredRecordingsJson: Recording[] = []
      for (const recordingSbs of alteredRecordings) {
        let contentJson: JsonMessage[] = sbsToJson(recordingSbs.content, false)
        let contentName: string = recordingSbs.name.replace('.sbs', '.json')
        let recordingJson: Recording = {
          content: contentJson.toString(),
          name: contentName,
        }
        alteredRecordingsJson.push(recordingJson)
      }
      return {
        alteredRecordings: alteredRecordingsJson,
        error: null,
      }
    case FileFormat.ndjson:
      let alteredRecordingsNdjson: Recording[] = []
      for (const recordingSbs of alteredRecordings) {
        let contentNdjson: string = sbsToNdjson(recordingSbs.content, false)
        let contentName: string = recordingSbs.name.replace('.sbs', '.ndjson')
        let recordingNdjson: Recording = {
          content: contentNdjson,
          name: contentName,
        }
        alteredRecordingsNdjson.push(recordingNdjson)
      }
      return {
        alteredRecordings: alteredRecordingsNdjson,
        error: null,
      }
    default:
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
