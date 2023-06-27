/*import {
  AlertParameter,
  AltitudeParameter,
  CallsignParameter,
  EmergencyParameter,
  GroundSpeedParameter,
  LatitudeParameter,
  LongitudeParameter,
  OnGroundParameter,
  SpiParameter,
  SquawkParameter,
  TrackParameter,
  VerticalRateParameter,
} from '../parameter';*/
import BaseStationMessage from './BaseStationMessage'

import { JsonObject } from 'type-fest'

export default class BaseStationMessageFull extends BaseStationMessage /* implements
  AlertParameter,
  AltitudeParameter,
  CallsignParameter,
  EmergencyParameter,
  GroundSpeedParameter,
  LatitudeParameter,
  LongitudeParameter,
  OnGroundParameter,
  SpiParameter,
  SquawkParameter,
  TrackParameter,
  VerticalRateParameter*/ {
  private alert: boolean | null
  private verticalRate: number | null
  private track: number | null
  private squawk: number | null
  private spi: boolean | null
  private onGround: boolean | null
  private longitude: number | null
  private latitude: number | null
  private groundSpeed: number | null
  private emergency: boolean | null
  private callsign: string | null
  private altitude: number | null

  private extraField: JsonObject | null

  constructor(
    transmissionType: number,
    sessionID: number,
    aircraftID: number,
    icao: string,
    flightID: number,
    timestampGenerated: number,
    timestampLogged: number,
    callsign: string | null,
    altitude: number | null,
    groundSpeed: number | null,
    track: number | null,
    latitude: number | null,
    longitude: number | null,
    verticalRate: number | null,
    squawk: number | null,
    alert: boolean | null,
    emergency: boolean | null,
    spi: boolean | null,
    onGround: boolean | null,
    extraField: JsonObject | null
  ) {
    super(
      transmissionType,
      sessionID,
      aircraftID,
      icao,
      flightID,
      timestampGenerated,
      timestampLogged,
      0
    )
    this.alert = alert
    this.verticalRate = verticalRate
    this.track = track
    this.squawk = squawk
    this.spi = spi
    this.onGround = onGround
    this.longitude = longitude
    this.latitude = latitude
    this.groundSpeed = groundSpeed
    this.emergency = emergency
    this.callsign = callsign
    this.altitude = altitude
    this.extraField = extraField
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

  public setAltitude(altitude: number): void {
    this.altitude = altitude
  }

  public getCallsign(): string | null {
    return this.callsign
  }
  public setCallsign(callsign: string): void {
    this.callsign = callsign
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

  public setGroundSpeed(groundSpeed: number): void {
    this.groundSpeed = groundSpeed
  }

  public getLatitude(): number | null {
    return this.latitude
  }
  public setLatitude(latitude: number): void {
    this.latitude = latitude
  }

  public getLongitude(): number | null {
    return this.longitude
  }

  public setLongitude(longitude: number): void {
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

  public setSquawk(squawk: number): void {
    this.squawk = squawk
  }

  public getTrack(): number | null {
    return this.track
  }

  public setTrack(track: number): void {
    this.track = track
  }

  public getVerticalRate(): number | null {
    return this.verticalRate
  }
  public setVerticalRate(verticalRate: number): void {
    this.verticalRate = verticalRate
  }

  public getExtraField(): JsonObject | null {
    return this.extraField
  }

  public setExtraField(extraField: JsonObject): void {
    this.extraField = extraField
  }

  public toString(): string {
    return (
      super.toString() +
      (this.callsign !== null ? this.callsign : '') +
      ',' +
      BaseStationMessageFull.integerToString(this.altitude) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.groundSpeed,
        BaseStationMessageFull.DECIMAL_FORMAT_1
      ) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.track,
        BaseStationMessageFull.DECIMAL_FORMAT_1
      ) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.latitude,
        BaseStationMessageFull.DECIMAL_FORMAT_5
      ) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.longitude,
        BaseStationMessageFull.DECIMAL_FORMAT_5
      ) +
      ',' +
      BaseStationMessageFull.integerToString(this.verticalRate) +
      ',' +
      BaseStationMessageFull.integerToString(this.squawk) +
      ',' +
      BaseStationMessageFull.booleanToString(this.alert) +
      ',' +
      BaseStationMessageFull.booleanToString(this.emergency) +
      ',' +
      BaseStationMessageFull.booleanToString(this.spi) +
      ',' +
      BaseStationMessageFull.booleanToString(this.onGround) +
      BaseStationMessageFull.jsonObjectToString(this.extraField)
    )
  }

  public toStringWithMask(): string {
    return (
      super.toString() +
      (this.callsign !== null ? this.callsign : '') +
      ',' +
      BaseStationMessageFull.integerToString(this.altitude) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.groundSpeed,
        BaseStationMessageFull.DECIMAL_FORMAT_1
      ) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.track,
        BaseStationMessageFull.DECIMAL_FORMAT_1
      ) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.latitude,
        BaseStationMessageFull.DECIMAL_FORMAT_5
      ) +
      ',' +
      BaseStationMessageFull.doubleToString(
        this.longitude,
        BaseStationMessageFull.DECIMAL_FORMAT_5
      ) +
      ',' +
      BaseStationMessageFull.integerToString(this.verticalRate) +
      ',' +
      BaseStationMessageFull.integerToString(this.squawk) +
      ',' +
      BaseStationMessageFull.booleanToString(this.alert) +
      ',' +
      BaseStationMessageFull.booleanToString(this.emergency) +
      ',' +
      BaseStationMessageFull.booleanToString(this.spi) +
      ',' +
      BaseStationMessageFull.booleanToString(this.onGround) +
      ',' +
      BaseStationMessageFull.booleanToString(this.getMask() > 0) +
      ',' +
      BaseStationMessageFull.integerToString(this.getMask()) +
      BaseStationMessageFull.jsonObjectToString(this.extraField)
    )
  }
  // voir si get ou pas
  public copy(): BaseStationMessageFull {
    return new BaseStationMessageFull(
      this.transmissionType,
      this.sessionID,
      this.aircraftID,
      this.icao,
      this.flightID,
      this.timestampGenerated,
      this.timestampLogged,
      this.callsign,
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
      this.extraField != null
        ? JSON.parse(JSON.stringify(this.extraField))
        : null // a voir
      //this.getMask()
    )
  }
}
