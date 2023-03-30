import { Recording } from '@smartesting/shared/dist'
import { Parameters } from '@smartesting/fdit-scenario/dist/types'

export default interface IAlterationManager {
  runAlterations(
    parameters: Parameters[],
    recording: Recording,
    recordingToReplay?: Recording
  ): Promise<Recording[]>
}
