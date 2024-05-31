import alterRecordingCore from '../../core/recording/alterRecording'
import { JavaAlterationManager } from '../../adapters/JavaAlterationManager'
import { TypescriptAlterationManager } from '../../adapters/TypescriptAlterationManager'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import {
  AlterRecordingError,
  AlterRecordingResponse,
} from '@smartesting/shared/dist/responses/alterRecordingResponse'

export default makeRequestHandler<AlterRecordingResponse>(
  async (req): Promise<AlterRecordingResponse> => {
    const { alterationManager } = req.adapters
    const {
      scenario,
      recording,
      recordingToReplay,
      optionsAlteration,
      outputFormat,
    } = req.body
    if (
      isBlank(scenario) ||
      !recording ||
      isBlank(recording.content) ||
      isBlank(recording.name)
    ) {
      return { error: AlterRecordingError.invalidFormat, alteredRecordings: [] }
    }
    if (!isValidExtension(recording.name)) {
      return { error: AlterRecordingError.invalidFormat, alteredRecordings: [] }
    }

    if (recordingToReplay) {
      if (
        isBlank(scenario) ||
        !recordingToReplay ||
        isBlank(recordingToReplay.content) ||
        isBlank(recordingToReplay.name)
      ) {
        return {
          error: AlterRecordingError.invalidFormat,
          alteredRecordings: [],
        }
      }
      if (!isValidExtension(recordingToReplay.name)) {
        return {
          error: AlterRecordingError.invalidFormat,
          alteredRecordings: [],
        }
      }

      const regex_replay = new RegExp(`\\breplay\\b`, 'g')
      if (scenario.match(regex_replay) === null) {
        return {
          error: AlterRecordingError.invalidFormat,
          alteredRecordings: [],
        }
      }
    } else {
      const regex_replay = new RegExp(`\\breplay\\b`, 'g')
      if (scenario.match(regex_replay) !== null) {
        return {
          error: AlterRecordingError.invalidFormat,
          alteredRecordings: [],
        }
      }
    }
    return await alterRecordingCore(
      scenario,
      recording,
      recordingToReplay,
      optionsAlteration,
      outputFormat,
      alterationManager
    )
  }
)

function isBlank(str: string | undefined) {
  return !str || str.trim().length === 0
}

function isValidExtension(str: string) {
  const regex = /.(sbs|csv|bst)$/i
  return regex.test(str)
}
