import * as fs from 'fs'
import { copyFileSync } from 'fs'

import { EngineManager } from '../core/engine/EngineManager'
import { EngineParameters } from '../core/engine/EngineParameters'
import { Recording } from '../core/incident/Recording'
import { Sensor } from '../core/incident/Sensor'
import { ActionLogger } from '../core/logging/ActionLogger'

export class AlterationAPI {
  private constructor() {}

  public static startAlteration(
    destination: string,
    incidentFilePath: string,
    options?: {
      labeled?: boolean
      logResults?: boolean
      commandLine?: string
      prefix?: string
      suffix?: string
    }
  ): void {
    console.log('startAlteration')
    const {
      labeled = false,
      logResults = false,
      commandLine = '',
      prefix = 'modified',
      suffix = '',
    } = options || {}

    const incidentData = fs.readFileSync(incidentFilePath, 'utf-8')
    const incident: Incident = JSON.parse(incidentData)
    const sensors: Sensor[] = incident.getSensors()

    let argCount = 2 // par défaut

    if (labeled && logResults && commandLine && prefix && suffix) {
      argCount = 6 // toutes les options
      console.log('startAlteration6args')
    } else {
      console.log('startAlteration2args')
    }

    for (const sensor of sensors) {
      const recordingFilePath = `${incidentFilePath}/${sensor.getRecord()}`
      if (
        !fs.existsSync(recordingFilePath) ||
        !fs.statSync(recordingFilePath).isFile()
      ) {
        console.log('FileNotFound')
        throw new Error(`File not found: ${recordingFilePath}`)
      }

      const recording = new Recording(recordingFilePath, sensor.getFirstDate())
      const logger = new ActionLogger()
      console.log('Nombre action : ' + sensor.getActions().length)

      const engineManager = new EngineManager(
        recording,
        sensor.getActions(),
        logger,
        new EngineParameters(labeled, commandLine)
      )

      recording.setFile(engineManager.run())

      const newFileName =
        prefix +
        '_' +
        sensor.getsID() +
        '_' +
        suffix +
        '.' +
        this.getFileExtension(recordingFilePath)

      copyFileSync(recording.getFile(), `${destination}/${newFileName}`)

      if (logResults) {
        logger.print(`${recordingFilePath}/metrics.csv`)
      }

      console.log('in for')
    }

    console.log('For finish')
  }

  private static getFileExtension(name: string): string {
    const blocks = name.split('.')
    if (blocks.length > 1) {
      return blocks[blocks.length - 1]
    }
    return ''
  }
}
