import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import { Parameters } from '@smartesting/alteration-scenario/dist/types'

export default interface IAlterationManager {
  runAlterations(
    parameters: Parameters[],
    recording: Recording,
    optionsAlteration: OptionsAlteration,
    recordingToReplay?: Recording
  ): Promise<Recording[]>
}
