import { Parameters } from '@smartesting/alteration-scenario/dist/types'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import IAlterationManager from './IAlterationManager'
import { execSync } from 'child_process'
import * as fs from 'fs'

export class JavaAlterationManager implements IAlterationManager {
  async runAlterations(
    parameters: Parameters[],
    recording: Recording,
    optionsAlteration: OptionsAlteration,
    recordingToReplay?: Recording
  ): Promise<Recording[]> {
    const recordingsAltered: Recording[] = []

    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i]
      const scenarioJsonPath = `temp/scenario_${i}.json`
      const indexFileName = recording.name.indexOf('.')
      const newFileName = `${recording.name.substring(
        0,
        indexFileName
      )}_${i}${recording.name.substring(indexFileName)}`

      const newFileFilePath = `temp/${newFileName}`
      if (
        parameter.sensors.sensor !== undefined &&
        parameter.sensors.sensor.length > 0
      ) {
        parameter.sensors.sensor[0].record = newFileName
      }
      await fs.promises.writeFile(
        scenarioJsonPath,
        JSON.stringify(parameter, null, 2)
      )
      await fs.promises.writeFile(newFileFilePath, recording.content)
      if (recordingToReplay != undefined) {
        await fs.promises.writeFile(
          `temp/${recordingToReplay.name}`,
          recordingToReplay.content
        )
      }

      const optionsToWrite: string = determineOptions(optionsAlteration)

      await executeAlterationJar(
        recording.content,
        newFileName,
        optionsToWrite,
        scenarioJsonPath
      )

      const contentFileAltered = await fs.promises.readFile(
        `temp/modified__${newFileName}`
      )
      recordingsAltered.push({
        name: `modified__${newFileName}`,
        content: contentFileAltered.toString(),
      })

      fs.unlink(scenarioJsonPath, () => {})
      fs.unlink(newFileFilePath, () => {})
      fs.unlink(`temp/modified__${newFileName}`, () => {})
      if (recordingToReplay != undefined)
        fs.unlink(`temp/${recordingToReplay.name}`, () => {})
    }

    return recordingsAltered
  }
}

/**
 * Execution of Java Alteration program
 * @param fileContent Content of file will be altered
 * @param fileName Name of file will be altered
 * @param options Options passing to the alteration engine
 * @param scenarioPath Path of scenario which will be applied on recording
 * @returns void
 */
function executeAlterationJar(
  fileContent: string,
  fileName: string,
  options: string,
  scenarioPath: string
): void {
  execSync(
    'java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar ' +
      scenarioPath +
      ' ' +
      fileName +
      ' ' +
      options
  )
}

function determineOptions(options: OptionsAlteration): string {
  let strOption = ''
  if (options.haveLabel) {
    strOption = strOption + '-l'
  }
  if (options.haveRealism) {
    strOption = strOption + ' -gs -t -vr'
  }
  if (options.haveNoise) {
    strOption = strOption + ' -latn -lonn'
  }
  if (options.haveDisableLatitude) {
    strOption = strOption + ' -dlat'
  }
  if (options.haveDisableLongitude) {
    strOption = strOption + ' -dlon'
  }
  if (options.haveDisableAltitude) {
    strOption = strOption + ' -dalt'
  }
  return strOption
}
