import BaseStationMessageFull from './message/BaseStationMessageFull'
import { Message } from '../engine/message'
import { JsonObject } from 'type-fest'
import { parse } from 'date-fns'
import { format } from 'date-fns-tz'

type Nullable<T> = T | null
type Callable<T> = () => T

function nullish<T>(callable: Callable<T>): Nullable<T> {
  try {
    return callable()
  } catch (ignored) {
    return null
  }
}

class BstMessageTypeSwitch<T> {
  private cases: { [key: string]: Callable<T> } = {}

  constructor(cases: { [key: string]: Callable<T> }) {
    this.cases = cases
  }

  doSwitch(key: string): T {
    if (this.cases.hasOwnProperty(key)) {
      return this.cases[key]()
    } else {
      throw new Error(`No case defined for key: ${key}`)
    }
  }
}

export class BaseStationParser {
  private static SPLIT_PATTERN = ',(?=(?:[^"]*"[^"]*")*[^"]*$)'
  private static SPLIT_JSON_PATTERN = ',\\{'
  public static BST_DATE_PATTERN = 'yyyy/MM/dd,HH:mm:ss.SSS'

  private constructor() {}

  public static createBstMessage(line: string): Message | null {
    const parts: string[] = line.split(BaseStationParser.SPLIT_JSON_PATTERN)
    const extraFieldsArePresent = parts.length > 1

    const fields: string[] = parts[0].split(BaseStationParser.SPLIT_PATTERN)
    const fieldsWithElement: (string[] | string)[] = extraFieldsArePresent
      ? [fields, `{${parts[1]}`]
      : fields

    try {
      const bstType: number =
        BaseStationParser.extractBstType(fieldsWithElement)
      const sessionID: number =
        BaseStationParser.extractSessionID(fieldsWithElement)
      const aircraftID: number =
        BaseStationParser.extractAircraftID(fieldsWithElement)
      const icao: string = BaseStationParser.extractIcao(fieldsWithElement)
      const flightID: number =
        BaseStationParser.extractFlightID(fieldsWithElement)
      const timestampGenerated: number =
        BaseStationParser.extractTimestampGenerated(fieldsWithElement)
      const timestampLogged: number =
        BaseStationParser.extractTimestampLogged(fieldsWithElement)

      return new BstMessageTypeSwitch<Message | null>({
        visitBstMessageFull: () => {
          return new BaseStationMessageFull(
            bstType,
            sessionID,
            aircraftID,
            icao,
            flightID,
            timestampGenerated,
            timestampLogged,
            BaseStationParser.nullableString(() =>
              BaseStationParser.extractCallSign(fieldsWithElement)
            ),
            BaseStationParser.nullableInteger(() =>
              BaseStationParser.extractAltitude(fieldsWithElement)
            ),
            BaseStationParser.nullableDouble(() =>
              BaseStationParser.extractGroundSpeed(fieldsWithElement)
            ),
            BaseStationParser.nullableDouble(() =>
              BaseStationParser.extractTrack(fieldsWithElement)
            ),
            BaseStationParser.nullableDouble(() =>
              BaseStationParser.extractLatitude(fieldsWithElement)
            ),
            BaseStationParser.nullableDouble(() =>
              BaseStationParser.extractLongitude(fieldsWithElement)
            ),
            BaseStationParser.nullableInteger(() =>
              BaseStationParser.extractVerticalRate(fieldsWithElement)
            ),
            BaseStationParser.nullableInteger(() =>
              BaseStationParser.extractSquawk(fieldsWithElement)
            ),
            BaseStationParser.nullableBoolean(() =>
              BaseStationParser.extractAlert(fieldsWithElement)
            ),
            BaseStationParser.nullableBoolean(() =>
              BaseStationParser.extractEmergency(fieldsWithElement)
            ),
            BaseStationParser.nullableBoolean(() =>
              BaseStationParser.extractSpi(fieldsWithElement)
            ),
            BaseStationParser.nullableBoolean(() =>
              BaseStationParser.extractOnGround(fieldsWithElement)
            ),
            BaseStationParser.nullableJsonObject(() =>
              BaseStationParser.extractExtraField(fieldsWithElement)
            )
            //, BaseStationParser.extractMask(fieldsWithElement)
          )
        },
      }).doSwitch('0')
    } catch (e) {
      return null
    }
  }

  private static nullableInteger(callable: Callable<number>): Nullable<number> {
    return nullish(callable)
  }

  private static nullableDouble(callable: Callable<number>): Nullable<number> {
    return nullish(callable)
  }

  private static nullableString(callable: Callable<string>): Nullable<string> {
    return nullish(callable)
  }

  private static nullableBoolean(
    callable: Callable<boolean>
  ): Nullable<boolean> {
    return nullish(callable)
  }

  private static nullableJsonObject(
    callable: Callable<JsonObject>
  ): Nullable<JsonObject> {
    return nullish(callable)
  }

  private static extractVerticalRate(fields: (string[] | string)[]): number {
    return parseFloat(<string>fields[16])
  }

  private static extractTrack(fields: (string[] | string)[]): number {
    return parseFloat(<string>fields[13])
  }

  private static extractSquawk(fields: (string[] | string)[]): number {
    return parseInt(<string>fields[17])
  }

  private static extractSpi(fields: (string[] | string)[]): boolean {
    return BaseStationParser.parseFlag(<string>fields[20])
  }

  private static extractOnGround(fields: (string[] | string)[]): boolean {
    return BaseStationParser.parseFlag(<string>fields[21])
  }

  private static extractMask(fields: string[]): number {
    return fields.length >= 24 ? parseInt(fields[23]) : 0
  }

  private static extractExtraField(
    fields: (string[] | string)[]
  ): JsonObject | null {
    if (fields.length === 23 || fields.length === 25) {
      return JSON.parse(<string>fields[fields.length - 1])
    }
    return null
  }

  private static extractGroundSpeed(fields: (string[] | string)[]): number {
    return parseFloat(<string>fields[12])
  }

  private static extractEmergency(fields: (string[] | string)[]): boolean {
    return BaseStationParser.parseFlag(<string>fields[19])
  }

  private static extractAltitude(fields: (string[] | string)[]): number | null {
    try {
      return parseInt(<string>fields[11])
    } catch (ignored) {
      return null
    }
  }

  private static extractAlert(fields: (string[] | string)[]): boolean {
    return BaseStationParser.parseFlag(<string>fields[18])
  }

  private static parseFlag(flag: string): boolean {
    return parseInt(flag) === 1
  }

  private static extractBstType(partLine: (string[] | string)[]): number {
    return parseInt(<string>partLine[1])
  }

  private static extractAircraftID(partLine: (string[] | string)[]): number {
    return parseInt(<string>partLine[3])
  }

  private static extractSessionID(partLine: (string[] | string)[]): number {
    return parseInt(<string>partLine[2])
  }

  private static extractFlightID(partLine: (string[] | string)[]): number {
    return parseInt(<string>partLine[5])
  }

  private static extractIcao(partLine: (string[] | string)[]): string {
    return <string>partLine[4]
  }

  private static extractTimestampGenerated(
    partLine: (string[] | string)[]
  ): number {
    return BaseStationParser.strDateToTimestamp(`${partLine[6]},${partLine[7]}`)
  }

  private static extractTimestampLogged(
    partLine: (string[] | string)[]
  ): number {
    return BaseStationParser.strDateToTimestamp(`${partLine[8]},${partLine[9]}`)
  }

  private static extractLatitude(
    partLine: (string[] | string)[]
  ): number | null {
    try {
      return parseFloat(<string>partLine[14])
    } catch (ignored) {
      return null
    }
  }

  private static extractLongitude(
    partLine: (string[] | string)[]
  ): number | null {
    try {
      return parseFloat(<string>partLine[15])
    } catch (ignored) {
      return null
    }
  }

  private static extractCallSign(partLine: (string[] | string)[]): string {
    return <string>partLine[10]
  }

  public static strDateToTimestamp(date: string): number {
    const dateFormat: Date = parse(
      date,
      BaseStationParser.BST_DATE_PATTERN,
      new Date(),
      { timeZone: 'UTC' }
    )
    return dateFormat.getTime()
  }

  public static timestampToStrDate(timestamp: number): string {
    return format(new Date(timestamp), BaseStationParser.BST_DATE_PATTERN, {
      timeZone: 'UTC',
    })
  }
}
