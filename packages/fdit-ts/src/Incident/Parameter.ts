export class Parameter {
  public static readonly CHARAC_ICAO = 'icao'
  public static readonly CHARAC_HEX_IDENT = 'hexIdent'
  public static readonly CHARAC_CALLSIGN = 'callsign'
  public static readonly CHARAC_SQUAWK = 'squawk'
  public static readonly CHARAC_ALTITUDE = 'altitude'
  public static readonly CHARAC_GROUNDSPEED = 'groundSpeed'
  public static readonly CHARAC_TRACK = 'track'
  public static readonly CHARAC_LATITUDE = 'latitude'
  public static readonly CHARAC_LONGITUDE = 'longitude'
  public static readonly CHARAC_VERTICALRATE = 'verticalRate'
  public static readonly CHARAC_ALERT = 'alert'
  public static readonly CHARAC_TIMESTAMP = 'timestamp'
  public static readonly CHARAC_EMERGENCY = 'emergency'
  public static readonly CHARAC_SPI = 'SPI'
  public static readonly CHARAC_ISONGROUND = 'isOnGround'
  public static readonly MODE_DRIFT = 'drift'
  public static readonly MODE_NOISE = 'noise'
  public static readonly MODE_OFFSET = 'offset'
  public static readonly MODE_SIMPLE = 'simple'

  private mode: string
  private characteristic: string
  private value: string
  private number: number = 0
  private frequency: number = 0
  private angle: number = 0.0

  public getMode(): string {
    return this.mode
  }

  public setMode(mode: string): void {
    this.mode = mode
  }

  public getCharacteristic(): string {
    return this.characteristic
  }

  public setCharacteristic(characteristic: string): void {
    this.characteristic = characteristic
  }

  public getValue(): string {
    return this.value
  }

  public setValue(value: string): void {
    this.value = value
  }

  public getNumber(): number {
    return this.number
  }

  public setNumber(number: number): void {
    this.number = number
  }

  public getFrequency(): number {
    return this.frequency
  }

  public setFrequency(frequency: number): void {
    this.frequency = frequency
  }

  public getAngle(): number {
    return this.angle
  }

  public setAngle(angle: number): void {
    this.angle = angle
  }

  public doModeSwitch<T>(mode: string, modeSwitch: ModeSwitch<T>): T {
    switch (mode.toLowerCase()) {
      case Parameter.MODE_DRIFT:
        return modeSwitch.visitDrift()
      case Parameter.MODE_NOISE:
        return modeSwitch.visitNoise()
      case Parameter.MODE_OFFSET:
        return modeSwitch.visitOffset()
      default:
        return modeSwitch.visitSimple()
    }
  }

  public doCharacteristicSwitch<T>(
    characteristic: string,
    characteristicSwitch: CharacteristicSwitch<T>
  ): T {
    switch (characteristic.toLowerCase()) {
      case Parameter.CHARAC_ICAO:
      case Parameter.CHARAC_HEX_IDENT:
        return characteristicSwitch.visitIcao()
      case Parameter.CHARAC_CALLSIGN:
        return characteristicSwitch.visitCallSign()
      case Parameter.CHARAC_SQUAWK:
        return characteristicSwitch.visitSquawk()
      case Parameter.CHARAC_ALTITUDE:
        return characteristicSwitch.visitAltitude()
      case Parameter.CHARAC_GROUNDSPEED:
        return characteristicSwitch.visitGroundSpeed()
      case Parameter.CHARAC_TRACK:
        return characteristicSwitch.visitTrack()
      case Parameter.CHARAC_LATITUDE:
        return characteristicSwitch.visitLatitude()
      case Parameter.CHARAC_LONGITUDE:
        return characteristicSwitch.visitLongitude()
      case Parameter.CHARAC_VERTICALRATE:
        return characteristicSwitch.visitVerticalRate()
      case Parameter.CHARAC_ALERT:
        return characteristicSwitch.visitAlert()
      case Parameter.CHARAC_EMERGENCY:
        return characteristicSwitch.visitEmergency()
      case Parameter.CHARAC_SPI:
        return characteristicSwitch.visitSpi()
      case Parameter.CHARAC_ISONGROUND:
        return characteristicSwitch.visitIsOnGround()
      default:
        return characteristicSwitch.visitDefault()
    }
  }
}
// a enlever
export interface ModeSwitch<T> {
  visitNoise(): T
  visitDrift(): T
  visitOffset(): T
  visitSimple(): T
}

export interface CharacteristicSwitch<T> {
  visitIcao(): T
  visitCallSign(): T
  visitSquawk(): T
  visitAltitude(): T
  visitGroundSpeed(): T
  visitTrack(): T
  visitLatitude(): T
  visitLongitude(): T
  visitVerticalRate(): T
  visitAlert(): T
  visitEmergency(): T
  visitSpi(): T
  visitIsOnGround(): T
  visitDefault(): T
}
