// All parameter in this class instead of using interfaces
export class FlightParameter {
  private alert: boolean | null = null
  private altitude: number | null = null
  private callsign: string = ''
  private emergency: boolean | null = null
  private groundSpeed: number | null = null
  private latitude: number | null = null
  private longitude: number | null = null
  private onGround: boolean | null = null
  private spi: boolean | null = null
  private squawk: number | null = null
  private track: number | null = null
  private verticalRate: number | null = null

  isAlert(): boolean | null {
    return this.alert
  }

  setAlert(alert: boolean): void {
    this.alert = alert
  }

  isAltitude(): number | null {
    return this.altitude
  }

  setAltitude(altitude: number): void {
    this.altitude = altitude
  }

  getCallsign(): string {
    return this.callsign
  }

  setCallsign(callsign: string): void {
    this.callsign = callsign
  }

  isEmergency(): boolean | null {
    return this.emergency
  }

  setEmergency(emergency: boolean): void {
    this.emergency = emergency
  }

  getGroundSpeed(): number | null {
    return this.groundSpeed
  }

  setGroundSpeed(groundSpeed: number): void {
    this.groundSpeed = groundSpeed
  }

  getLatitude(): number | null {
    return this.latitude
  }

  setLatitude(latitude: number): void {
    this.latitude = latitude
  }

  getLongitude(): number | null {
    return this.longitude
  }

  setLongitude(longitude: number): void {
    this.longitude = longitude
  }

  isOnGround(): boolean | null {
    return this.onGround
  }

  setOnGround(onGround: boolean): void {
    this.onGround = onGround
  }

  isSpi(): boolean | null {
    return this.spi
  }

  setSpi(spi: boolean): void {
    this.spi = spi
  }

  getSquawk(): number | null {
    return this.squawk
  }

  setSquawk(squawk: number): void {
    this.squawk = squawk
  }

  getTrack(): number | null {
    return this.track
  }

  setTrack(track: number): void {
    this.track = track
  }

  getVerticalRate(): number | null {
    return this.verticalRate
  }

  setVerticalRate(verticalRate: number): void {
    this.verticalRate = verticalRate
  }
} //
