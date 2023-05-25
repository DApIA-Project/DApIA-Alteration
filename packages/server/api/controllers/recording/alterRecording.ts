import { RequestHandler } from 'express'
import { AlterRecordingError } from '@smartesting/shared/dist'
import alterRecordingCore from '../../core/recording/alterRecording'
import { JavaAlterationManager } from '../../adapters/JavaAlterationManager'

const alterRecording: RequestHandler = async (req, res) => {
  const { scenario, recording, recordingToReplay, optionsAlteration } = req.body
  if (
    isBlank(scenario) ||
    !recording ||
    isBlank(recording.content) ||
    isBlank(recording.name)
  ) {
    return res
      .status(422)
      .json({ error: AlterRecordingError.invalidFormat, alteredRecordings: [] })
  }
  if (!isValidExtension(recording.name)) {
    return res
      .status(422)
      .json({ error: AlterRecordingError.invalidFormat, alteredRecordings: [] })
  }

  if (recordingToReplay) {
    if (
      isBlank(scenario) ||
      !recordingToReplay ||
      isBlank(recordingToReplay.content) ||
      isBlank(recordingToReplay.name)
    ) {
      return res.status(422).json({
        error: AlterRecordingError.invalidFormat,
        alteredRecordings: [],
      })
    }
    if (!isValidExtension(recordingToReplay.name)) {
      return res.status(422).json({
        error: AlterRecordingError.invalidFormat,
        alteredRecordings: [],
      })
    }

    const regex_replay = new RegExp(`\\breplay\\b`, 'g')
    if (scenario.match(regex_replay) === null) {
      return res.status(422).json({
        error: AlterRecordingError.invalidFormat,
        alteredRecordings: [],
      })
    }
  }
  const response = await alterRecordingCore(
    scenario,
    recording,
    recordingToReplay,
    optionsAlteration,
    new JavaAlterationManager()
  )

  if (response.error != null) return res.status(422).json(response)
  return res.status(200).json(response)
}

function isBlank(str: string | undefined) {
  return !str || str.trim().length === 0
}

function isValidExtension(str: string) {
  const regex = /.(sbs|csv|bst)$/i
  return regex.test(str)
}

export default alterRecording
