import { JsonObject } from 'type-fest'
import { BaseStationParser } from './BaseStationParser'
import { generateIcaoRandomOffset } from './alterUtils'
export class BaseStationMessage {
  get mask(): number | undefined {
    return this.mask
  }

  set mask(value: number) {
    this.mask = value
  }

  constructor(
    public transmissionType: number | null,
    public sessionID: number | null,
    public aircraftID: number | null,
    public icao: string,
    public flightID: number | null,
    public timestampGenerated: number,
    public timestampLogged: number,
    public callSign: string | null,
    public altitude: number | null,
    public groundSpeed: number | null,
    public track: number | null,
    public latitude: number | null,
    public longitude: number | null,
    public verticalRate: number | null,
    public squawk: number | null,
    public alert: boolean | null,
    public emergency: boolean | null,
    public spi: boolean | null,
    public onGround: boolean | null,
    public extraField?: any
  ) //public _mask?: number | null
  {
    this.transmissionType = transmissionType
    this.sessionID = sessionID
    this.aircraftID = aircraftID
    this.flightID = flightID
    this.icao = icao
    this.timestampGenerated = timestampGenerated
    this.timestampLogged = timestampLogged
    // this._mask = 0
  }

  protected static readonly DECIMAL_FORMAT_1 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
  })
  protected static readonly DECIMAL_FORMAT_5 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 5,
  })

  public getFlightID(): number | null {
    return this.flightID
  }

  public setFlightID(flightID: number | null): void {
    this.flightID = flightID
  }

  public getSessionID(): number | null {
    return this.sessionID
  }

  public setSessionID(sessionID: number | null): void {
    this.sessionID = sessionID
  }

  public getTransmissionType(): number | null {
    return this.transmissionType
  }

  public setTransmissionType(transmissionType: number | null): void {
    this.transmissionType = transmissionType
  }

  public getAircraftID(): number | null {
    return this.aircraftID
  }

  public setAircraftID(aircraftID: number | null): void {
    this.aircraftID = aircraftID
  }

  public getIcao(): string {
    return this.icao
  }

  public setIcao(icao: string | null): void {
    if (icao != null) {
      this.icao = icao
    }
  }

  public getTimestampGenerated(): number {
    return this.timestampGenerated
  }

  public setTimestampGenerated(timestampGenerated: number | null): void {
    if (timestampGenerated != null) {
      this.timestampGenerated = timestampGenerated
    }
  }

  public getTimestampLogged(): number {
    return this.timestampLogged
  }

  public setTimestampLogged(timestampLogged: number | null): void {
    if (timestampLogged != null) {
      this.timestampLogged = timestampLogged
    }
  }

  public getMask(): number | undefined {
    return this.mask
  }

  public setMask(mask: number): void {
    this.mask = mask
  }
  public isAlert(): boolean | null {
    return this.alert
  }

  public setAlert(alert: boolean): void {
    this.alert = alert
  }

  public getAltitude(): number | null {
    return this.altitude
  }

  public setAltitude(altitude: number | null): void {
    this.altitude = altitude
  }

  public getCallsign(): string | null {
    return this.callSign
  }
  public setCallsign(callSign: string | null): void {
    this.callSign = callSign
  }

  public isEmergency(): boolean | null {
    return this.emergency
  }

  public setEmergency(emergency: boolean): void {
    this.emergency = emergency
  }

  public getGroundSpeed(): number | null {
    return this.groundSpeed
  }

  public setGroundSpeed(groundSpeed: number | null): void {
    this.groundSpeed = groundSpeed
  }

  public getLatitude(): number | null {
    return this.latitude
  }
  public setLatitude(latitude: number | null): void {
    this.latitude = latitude
  }

  public getLongitude(): number | null {
    return this.longitude
  }

  public setLongitude(longitude: number | null): void {
    this.longitude = longitude
  }

  public isOnGround(): boolean | null {
    return this.onGround
  }

  public setOnGround(onGround: boolean): void {
    this.onGround = onGround
  }

  public isSpi(): boolean | null {
    return this.spi
  }

  public setSpi(spi: boolean): void {
    this.spi = spi
  }
  public getSquawk(): number | null {
    return this.squawk
  }

  public setSquawk(squawk: number | null): void {
    this.squawk = squawk
  }

  public getTrack(): number | null {
    return this.track
  }

  public setTrack(track: number | null): void {
    this.track = track
  }

  public getVerticalRate(): number | null {
    return this.verticalRate
  }
  public setVerticalRate(verticalRate: number | null): void {
    this.verticalRate = verticalRate
  }

  public getExtraField(): JsonObject | null {
    return this.extraField
  }

  public setExtraField(extraField: JsonObject | null): void {
    this.extraField = extraField
  }
  /*
    public equals(obj: unknown): boolean {
        if (!(!obj.hasOwnProperty('transmissionType') || !obj.hasOwnProperty('sessionID') || !obj.hasOwnProperty('aircraftID') || !obj.hasOwnProperty('icao') || !obj.hasOwnProperty('flightID') || !obj.hasOwnProperty('timestampGenerated') || !obj.hasOwnProperty('timestampLogged') || !obj.hasOwnProperty(
            'callSign') || !obj.hasOwnProperty('altitude') || !obj.hasOwnProperty('groundSpeed') || !obj.hasOwnProperty('track') || !obj.hasOwnProperty(
            'latitude') || !obj.hasOwnProperty('longitude') || !obj.hasOwnProperty('verticalRate') || !obj.hasOwnProperty('squawk') || !obj.hasOwnProperty('alert') || !obj.hasOwnProperty('emergency') || !obj.hasOwnProperty('spi') || !obj.hasOwnProperty('onGround') || !obj.hasOwnProperty('extraField?') || !obj.hasOwnProperty('mask?')))
        {
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
        } else {
            return false;
        }
    }
*/
  public compareTo(message: BaseStationMessage): number {
    return this.timestampGenerated - message.getTimestampGenerated()
  }
  public toString(): string {
    let message: string = `MSG,${this.transmissionType},${this.sessionID},${
      this.aircraftID
    },${this.icao},${this.flightID},${BaseStationParser.timestampToStrDate(
      this.timestampGenerated
    )},${BaseStationParser.timestampToStrDate(this.timestampLogged)}`

    let messageFull =
      message +
      (this.callSign !== null ? this.callSign : '') +
      ',' +
      BaseStationMessage.integerToString(this.altitude) +
      ',' +
      BaseStationMessage.doubleToString(
        this.groundSpeed,
        BaseStationMessage.DECIMAL_FORMAT_1
      ) +
      ',' +
      BaseStationMessage.doubleToString(
        this.track,
        BaseStationMessage.DECIMAL_FORMAT_1
      ) +
      ',' +
      BaseStationMessage.doubleToString(
        this.latitude,
        BaseStationMessage.DECIMAL_FORMAT_5
      ) +
      ',' +
      BaseStationMessage.doubleToString(
        this.longitude,
        BaseStationMessage.DECIMAL_FORMAT_5
      ) +
      ',' +
      BaseStationMessage.integerToString(this.verticalRate) +
      ',' +
      BaseStationMessage.integerToString(this.squawk) +
      ',' +
      BaseStationMessage.booleanToString(this.alert) +
      ',' +
      BaseStationMessage.booleanToString(this.emergency) +
      ',' +
      BaseStationMessage.booleanToString(this.spi) +
      ',' +
      BaseStationMessage.booleanToString(this.onGround) +
      ',' +
      ',' +
      +BaseStationMessage.jsonObjectToString(this.extraField)
    return messageFull
  }
  //function messageFull

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
  //
  protected static jsonObjectToString(jsonObject: JsonObject | null): string {
    if (jsonObject == null) {
      return ''
    }
    return ',' + JSON.stringify(jsonObject)
  }

  isCallsignParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('callsign')
  }
  isAltitudeParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('altitude')
  }
  isGroundSpeedParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('groundSpeed')
  }
  isTrackParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('track')
  }
  isLatitudeParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('latitude')
  }
  isLongitudeParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('longitude')
  }
  isVerticalRateParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('verticalRate')
  }
  isSquawkParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('squawk')
  }
  isAlertParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('alert')
  }
  isEmergencyParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('emergency')
  }
  isSpiParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('spi')
  }
  isOnGroundParameter(message: BaseStationMessage): boolean {
    return message.hasOwnProperty('onGround')
  }
  //alter methods

  public alterIcao(newIcao: string): void {
    if (newIcao.toLowerCase() === 'random') {
      newIcao = generateIcaoRandomOffset(this.icao, 1000)
    }
    this.icao = newIcao
  }

  public alterCallsign(newCallsign: string): boolean {
    if (this.callSign !== null) {
      this.callSign = newCallsign
      return true
    }
    return false
  }

  public alterAltitude(newValue: number): boolean {
    if (this.altitude !== null) {
      this.altitude = Math.round(newValue / 25) * 25
      return true
    }
    return false
  }

  public alterGroundSpeed(newValue: number): boolean {
    if (this.groundSpeed !== null) {
      this.groundSpeed = newValue
      return true
    }
    return false
  }
  public alterTrack(newValue: number): boolean {
    if (this.track !== null) {
      this.track = newValue
      return true
    }
    return false
  }

  public alterLatitude(newValue: number): boolean {
    if (this.latitude !== null) {
      this.latitude = newValue
      return true
    }
    return false
  }

  public alterLongitude(newValue: number): boolean {
    if (this.longitude !== null) {
      this.longitude = newValue
      return true
    }
    return false
  }

  public alterVerticalRate(newValue: number): boolean {
    if (this.verticalRate !== null) {
      this.verticalRate = newValue
      return true
    }
    return false
  }

  public alterSquawk(newSquawk: number): boolean {
    if (this.squawk !== null) {
      this.squawk = newSquawk
      return true
    }
    return false
  }

  public alterAlert(newAlert: boolean): boolean {
    if (this.alert !== null) {
      this.alert = newAlert
      return true
    }
    return false
  }

  public alterEmergency(newEmergency: boolean): boolean {
    if (this.emergency !== null) {
      this.emergency = newEmergency
      return true
    }
    return false
  }

  public alterSpi(newSpi: boolean): boolean {
    if (this.spi !== null) {
      this.spi = newSpi
      return true
    }
    return false
  }

  public alterOnGround(newOnGround: boolean): boolean {
    if (this.onGround !== null) {
      this.onGround = newOnGround
      return true
    }
    return false
  }
  public copy(): BaseStationMessage {
    const copy = new BaseStationMessage(
      this.transmissionType,
      this.sessionID,
      this.aircraftID,
      this.icao,
      this.flightID,
      this.timestampGenerated,
      this.timestampLogged,
      this.callSign,
      this.altitude,
      this.groundSpeed,
      this.track,
      this.latitude,
      this.longitude,
      this.verticalRate,
      this.squawk,
      this.alert,
      this.emergency,
      this.spi,
      this.onGround,
      this.extraField
    )
    return copy
  }
}
