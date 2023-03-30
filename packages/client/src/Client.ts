import { AlterRecordingResponse } from '@smartesting/shared/dist/responses/alterRecordingResponse'
import { Recording } from '@smartesting/shared/dist'

export default class Client {
  static async alteration(
    value: string | null,
    recording: Recording,
    recordingToReplay?: Recording
  ): Promise<AlterRecordingResponse> {
    const response = await fetch('http://localhost:3001/recording/alteration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scenario: value,
        recording,
        recordingToReplay,
      }),
    })
    return await response.json()
  }
}
