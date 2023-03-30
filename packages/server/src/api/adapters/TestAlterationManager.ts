import { Parameters } from '@smartesting/fdit-scenario/dist/types'
import { Recording } from '@smartesting/shared/dist'
import IAlterationManager from './IAlterationManager'

export class TestAlterationManager implements IAlterationManager {
  async runAlterations(
    parameters: Parameters[],
    recording: Recording,
    recordingToReplay?: Recording
  ): Promise<Recording[]> {
    const alteredRecording: Recording[] = []
    for (const parameter of parameters) {
      alteredRecording.push({
        ...recording,
      })
    }
    return alteredRecording
  }
}
