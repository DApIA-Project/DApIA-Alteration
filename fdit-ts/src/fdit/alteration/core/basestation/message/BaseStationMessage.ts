import { timestampToStrDate } from '../BaseStationParser'
import { JsonObject } from 'type-fest'

interface Comparable<T> {
  compareTo(other: T): number
}

export default abstract class BaseStationMessage
  implements Comparable<BaseStationMessage>
{
  private static readonly DECIMAL_FORMAT_EN = new Intl.NumberFormat('en-US')
  protected static readonly DECIMAL_FORMAT_1 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
  })
  protected static readonly DECIMAL_FORMAT_5 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 5,
  })

  private mask: number
  protected transmissionType: number
  protected sessionID: number
  protected aircraftID: number
  protected icao: string
  protected flightID: number
  protected timestampGenerated: number
  protected timestampLogged: number

  public constructor(
    transmissionType: number,
    sessionID: number,
    aircraftID: number,
    icao: string,
    flightID: number,
    timestampGenerated: number,
    timestampLogged: number,
    mask: number
  ) {
    this.transmissionType = transmissionType
    this.sessionID = sessionID
    this.aircraftID = aircraftID
    this.flightID = flightID
    this.icao = icao
    this.timestampGenerated = timestampGenerated
    this.timestampLogged = timestampLogged
    this.mask = mask
  }

  static doubleToString(
    groundSpeed2: number | null,
    decimalFormat1: Intl.NumberFormat
  ): string {
    return groundSpeed2 != null ? decimalFormat1.format(groundSpeed2) : ''
  }

  static integerToString(integer: number | null): string {
    return integer != null ? String(integer) : ''
  }

  static booleanToString(aBoolean: boolean | null): string {
    if (aBoolean == null) {
      return ''
    }
    return aBoolean ? '1' : '0'
  }

  protected static jsonObjectToString(jsonObject: JsonObject | null): string {
    if (jsonObject == null) {
      return ''
    }
    return ',' + JSON.stringify(jsonObject)
  }

  public getFlightID(): number {
    return this.flightID
  }

  public setFlightID(flightID: number): void {
    this.flightID = flightID
  }

  public getSessionID(): number {
    return this.sessionID
  }

  public setSessionID(sessionID: number): void {
    this.sessionID = sessionID
  }

  public getTransmissionType(): number {
    return this.transmissionType
  }

  public setTransmissionType(transmissionType: number): void {
    this.transmissionType = transmissionType
  }

  public getAircraftID(): number {
    return this.aircraftID
  }

  public setAircraftID(aircraftID: number): void {
    this.aircraftID = aircraftID
  }

  public getIcao(): string {
    return this.icao
  }

  public setIcao(icao: string): void {
    this.icao = icao
  }

  public getTimestampGenerated(): number {
    return this.timestampGenerated
  }

  public setTimestampGenerated(timestampGenerated: number): void {
    this.timestampGenerated = timestampGenerated
  }

  public getTimestampLogged(): number {
    return this.timestampLogged
  }

  public setTimestampLogged(timestampLogged: number): void {
    this.timestampLogged = timestampLogged
  }

  public getMask(): number | null {
    return this.mask
  }

  public setMask(mask: number): void {
    this.mask = mask
  }

  public toString(): string {
    return `MSG,${this.transmissionType},${this.sessionID},${this.aircraftID},${
      this.icao
    },${this.flightID},${timestampToStrDate(
      this.timestampGenerated
    )},${timestampToStrDate(this.timestampLogged)},`
  }

  public hashCode(): number {
    let result = 17
    result = 31 * result + this.transmissionType
    result = 31 * result + this.sessionID
    result = 31 * result + this.aircraftID
    result = 31 * result + this.hashCodeString(this.icao)
    result = 31 * result + this.flightID
    result = 31 * result + this.hashCodeNumber(this.timestampGenerated)
    result = 31 * result + this.hashCodeNumber(this.timestampLogged)
    return result
  }

  private hashCodeString(value: string): number {
    let hash = 0
    if (value.length === 0) {
      return hash
    }
    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i)
      hash = (hash << 5) - hash + charCode
      hash |= 0
    }
    return hash
  }

  private hashCodeNumber(value: number): number {
    const roundedValue = Math.floor(value)
    const lowerBits = roundedValue & 0xffffffff
    const upperBits = (roundedValue / 0x100000000) & 0xffffffff
    return lowerBits ^ upperBits
  }

  public equals(obj: unknown): boolean {
    if (!(obj instanceof BaseStationMessage)) {
      return false
    }

    const message = obj as BaseStationMessage
    return (
      this.transmissionType === message.getTransmissionType() &&
      this.sessionID === message.getSessionID() &&
      this.aircraftID === message.getAircraftID() &&
      this.icao === message.getIcao() &&
      this.flightID === message.getFlightID() &&
      this.timestampGenerated === message.getTimestampGenerated() &&
      this.timestampLogged === message.getTimestampLogged()
    )
  }

  public compareTo(message: BaseStationMessage): number {
    return this.timestampGenerated - message.getTimestampGenerated()
  }

  public doSwitch(type: number): void {
    switch (type) {
      case 1:
        this.visitBstMessage1()
        break
      case 2:
        this.visitBstMessage2()
        break
      case 3:
        this.visitBstMessage3()
        break
      case 4:
        this.visitBstMessage4()
        break
      case 5:
        this.visitBstMessage5()
        break
      case 6:
        this.visitBstMessage6()
        break
      case 7:
        this.visitBstMessage7()
        break
      case 8:
        this.visitBstMessage8()
        break
      default:
        this.visitBstMessageFull()
        break
    }
  }

  public visitBstMessage1(): void {
    return null
  }
  public visitBstMessage2(): void {
    return this.visitBstMessageFull()
  }
  public visitBstMessage3(): void {
    return this.visitBstMessageFull()
  }
  public visitBstMessage4(): void {
    return this.visitBstMessageFull()
  }
  public visitBstMessage5(): void {
    return this.visitBstMessageFull()
  }
  public visitBstMessage6(): void {
    return this.visitBstMessageFull()
  }
  public visitBstMessage7(): void {
    return this.visitBstMessageFull()
  }
  public visitBstMessage8(): void {
    return this.visitBstMessageFull()
  }
  public visitBstMessageFull(): void {
    return null
  }
}
