import * as fs from 'fs'
import { parse } from 'date-fns'
import { zonedTimeToUtc, format } from 'date-fns-tz'
import { BaseStationMessage } from './BaseStationMessage'
import { Action, ActionParameters, ActionType } from './Action'
//import {FlightParameter} from "./flightParameter";

// Classe BaseStationParser pour l'analyse des messages BaseStation
export class BaseStationParser {
  private static readonly BST_DATE_PATTERN = 'yyyy/MM/dd,HH:mm:ss.SSS'
  private static readonly SPLIT_PATTERN = ',(?=(?:[^"]*"[^"]*")*[^"]*$)'
  private static readonly SPLIT_JSON_PATTERN = ',{'

  private constructor() {}

  private static nullableString(value: string): string | null {
    return value !== '' ? value : null
  }

  private static nullableInteger(value: string): number | null {
    const intValue = parseInt(value, 10)
    return !isNaN(intValue) ? intValue : null
  }

  private static nullableFloat(value: string): number | null {
    const floatValue = parseFloat(value)
    return !isNaN(floatValue) ? floatValue : null
  }

  private static nullableBoolean(value: string): boolean | null {
    if (value === '1') {
      return true
    } else if (value === '0') {
      return false
    } else {
      return null
    }
  }

  private static nullableJsonObject(value: string): any | null {
    try {
      return JSON.parse(value)
    } catch (error) {
      return null
    }
  }

  public static strDateToTimestamp(date: string): number {
    const parsedDate = parse(
      date,
      BaseStationParser.BST_DATE_PATTERN,
      new Date()
    )
    const utcDate = zonedTimeToUtc(parsedDate, 'UTC')
    return utcDate.getTime()
  }

  public static timestampToStrDate(timestamp: number): string {
    return format(new Date(timestamp), BaseStationParser.BST_DATE_PATTERN, {
      timeZone: 'UTC',
    })
  }

  public static createBstMessage(line: string): BaseStationMessage | null {
    const parts = line.split(BaseStationParser.SPLIT_JSON_PATTERN)
    const extraFieldsArePresent = parts.length > 1
    const fields = parts[0].split(BaseStationParser.SPLIT_PATTERN)
    const fieldsWithElement = extraFieldsArePresent
      ? [...fields, `{${parts[1]}`]
      : fields

    try {
      const transmissionType = BaseStationParser.nullableInteger(
        fieldsWithElement[1]
      )
      const sessionID = BaseStationParser.nullableInteger(fieldsWithElement[2])
      const aircraftID = BaseStationParser.nullableInteger(fieldsWithElement[3])
      const icao = fieldsWithElement[4]
      const flightID = BaseStationParser.nullableInteger(fieldsWithElement[5])
      const timestampGenerated = BaseStationParser.strDateToTimestamp(
        fieldsWithElement[6] + ',' + fieldsWithElement[7]
      )
      const timestampLogged = BaseStationParser.strDateToTimestamp(
        fieldsWithElement[8] + ',' + fieldsWithElement[9]
      )

      const callSign = BaseStationParser.nullableString(fieldsWithElement[10])
      const altitude = BaseStationParser.nullableInteger(fieldsWithElement[11])
      const groundSpeed = BaseStationParser.nullableFloat(fieldsWithElement[12])
      const track = BaseStationParser.nullableFloat(fieldsWithElement[13])
      const latitude = BaseStationParser.nullableFloat(fieldsWithElement[14])
      const longitude = BaseStationParser.nullableFloat(fieldsWithElement[15])
      const verticalRate = BaseStationParser.nullableInteger(
        fieldsWithElement[16]
      )
      const squawk = BaseStationParser.nullableInteger(fieldsWithElement[17])
      const alert = BaseStationParser.nullableBoolean(fieldsWithElement[18])
      const emergency = BaseStationParser.nullableBoolean(fieldsWithElement[19])
      const spi = BaseStationParser.nullableBoolean(fieldsWithElement[20])
      const onGround = BaseStationParser.nullableBoolean(fieldsWithElement[21])
      const extraField = BaseStationParser.nullableJsonObject(
        fieldsWithElement[fieldsWithElement.length - 1]
      )
      const mask = BaseStationParser.nullableInteger(fieldsWithElement[23])

      return new BaseStationMessage(
        transmissionType,
        sessionID,
        aircraftID,
        icao,
        flightID,
        timestampGenerated,
        timestampLogged,
        callSign,
        altitude,
        groundSpeed,
        track,
        latitude,
        longitude,
        verticalRate,
        squawk,
        alert,
        emergency,
        spi,
        onGround,
        extraField
      )
    } catch (ignored) {
      return null
    }
  }
}
// Fonction pour vérifier si l'extension du fichier est SBS
function isSbsFile(fileName: string): boolean {
  const validExtensions = ['.sbs', '.sbs1', '.sbs2']
  const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()
  return validExtensions.includes(fileExtension)
}

export function writeBaseStationMessageToFile(
  message: BaseStationMessage,
  filePath: string
): void {
  const line =
    'MSG,' +
    message.transmissionType +
    ',' +
    message.sessionID +
    ',' +
    message.aircraftID +
    ',' +
    message.icao +
    ',' +
    message.flightID +
    ',' +
    BaseStationParser.timestampToStrDate(message.timestampGenerated) +
    ',' +
    BaseStationParser.timestampToStrDate(message.timestampLogged) +
    ',' +
    (message.callSign !== null ? message.callSign : '') +
    ',' +
    (message.altitude !== null ? message.altitude : '') +
    ',' +
    (message.groundSpeed !== null ? message.groundSpeed : '') +
    ',' +
    (message.track !== null ? message.track : '') +
    ',' +
    (message.latitude !== null ? message.latitude : '') +
    ',' +
    (message.longitude !== null ? message.longitude : '') +
    ',' +
    (message.verticalRate !== null ? message.verticalRate : '') +
    ',' +
    (message.squawk !== null ? message.squawk : '') +
    ',' +
    (message.alert !== null ? (message.alert ? '1' : '0') : '') +
    ',' +
    (message.emergency !== null ? (message.emergency ? '1' : '0') : '') +
    ',' +
    (message.spi !== null ? (message.spi ? '1' : '0') : '') +
    ',' +
    (message.onGround !== null ? (message.onGround ? '1' : '0') : '') +
    ',' +
    JSON.stringify(message.extraField !== null ? message.extraField : '') +
    ',' +
    (message.mask !== null ? message.mask : '')

  fs.appendFileSync(filePath, line + '\n')
}
//fonction
function main(): void {
  const inputFile = 'input.txt'
  const outputFile = 'output.txt'
  const alterationType: ActionType = ActionType.ALTERATION
  if (!isSbsFile(inputFile)) {
    console.log("Le fichier d'entrée doit avoir une extension SBS.")
    return
  }
  const lines = fs.readFileSync(inputFile, 'utf-8').split('\n')

  for (const line of lines) {
    const message = BaseStationParser.createBstMessage(line)
    if (message !== null) {
      const alteredMessage = alterBaseStationMessage(message, alterationType)
      writeBaseStationMessageToFile(alteredMessage, outputFile)
    }
  }

  console.log('Les messages ont été traités avec succès.')
}

function alterBaseStationMessage(
  message: BaseStationMessage,
  alterationType: ActionType,
  parameters?: ActionParameters<any>
): BaseStationMessage {
  const action = new Action()
  action.doSwitch(alterationType, message, parameters)
  return message
}

main()
