import { Parameters } from '@smartesting/fdit-scenario/dist/types'
import { Recording } from '@smartesting/shared/dist'
import IAlterationManager from './IAlterationManager'
import { execSync } from 'child_process'

export class JavaAlterationManager implements IAlterationManager {
  async runAlterations(
    parameters: Parameters[],
    recording: Recording,
    recordingToReplay?: Recording
  ): Promise<Recording[]> {
    throw new Error('Not implemented')
  }
}

/**
 * Execution of Java Alteration program
 * @param fileContent Content of file will be altered
 * @param fileName Name of file will be altered
 * @param scenarioPath Path of scenario which will be applied on recording
 * @returns void
 */
function executeAlterationJar(
  fileContent: string,
  fileName: string,
  scenarioPath: string
): void {
  execSync(
    'java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar ' +
      scenarioPath +
      ' ' +
      fileName
  )
}
