import { AlterRecordingResponse } from '@smartesting/shared/dist/responses/alterRecordingResponse'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import apiUrl from './config'

export default class Client {
  static async alteration(
    value: string | null,
    recording: Recording,
    optionsAlteration: OptionsAlteration,
    recordingToReplay?: Recording
  ): Promise<AlterRecordingResponse> {
    const response = await fetch(`${apiUrl}/recording/alteration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scenario: value,
        recording,
        optionsAlteration,
        recordingToReplay,
      }),
    })
    return await response.json()
  }
}
