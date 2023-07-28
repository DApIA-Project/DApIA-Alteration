class UnknownScopeException extends Error {
  constructor(type: string) {
    super(`Unknown scope type: ${type}`)
    this.name = 'UnknownScopeException'
  }
}

export class Scope {
  public static readonly SCOPE_TYPE_TRIGGER = 'trigger'
  public static readonly SCOPE_TYPE_TIME_WINDOW = 'timeWindow'
  public static readonly SCOPE_TYPE_GEO_AREA = 'geoArea'
  public static readonly SCOPE_TYPE_GEO_THRESHOLD = 'geoThreshold'
  public static readonly SCOPE_TYPE_GEO_TIME = 'geoTime'
  public static readonly SCOPE_TYPE_GEO_TIME_WINDOW = 'geoTimeWindow'

  private type: string
  private lowerAlt: number
  private upperAlt: number
  private lowerBound: number
  private upperBound: number
  private threshold: string
  private thresholdType: string
  private boundType: string
  private time: string
  //private polygon: Polygon;

  public getType(): string {
    return this.type || ''
  }

  public setType(type: string): void {
    this.type = type
  }

  public getLowerAlt(): number {
    return this.lowerAlt
  }

  public setLowerAlt(lowerAlt: number): void {
    this.lowerAlt = lowerAlt
  }

  public getUpperAlt(): number {
    return this.upperAlt
  }

  public setUpperAlt(upperAlt: number): void {
    this.upperAlt = upperAlt
  }

  public getLowerBound(): number {
    return this.lowerBound
  }

  public setLowerBound(lowerBound: number): void {
    this.lowerBound = lowerBound
  }

  public getUpperBound(): number {
    return this.upperBound
  }

  public setUpperBound(upperBound: number): void {
    this.upperBound = upperBound
  }

  public getThreshold(): string {
    return this.threshold || ''
  }

  public setThreshold(threshold: string): void {
    this.threshold = threshold
  }

  public getThresholdType(): string {
    return this.thresholdType || ''
  }

  public setThresholdType(thresholdType: string): void {
    this.thresholdType = thresholdType
  }

  public getBoundType(): string {
    return this.boundType || ''
  }

  public setBoundType(boundType: string): void {
    this.boundType = boundType
  }

  public getTime(): string {
    return this.time || ''
  }

  public setTime(time: string): void {
    this.time = time
  }
  /*
    public getPolygon(): Polygon {
        return this.polygon;
    }

    public setPolygon(polygon: Polygon): void {
        this.polygon = polygon;
    }
*/
  public doSwitch(type: string): void {
    switch (type) {
      case Scope.SCOPE_TYPE_GEO_AREA:
        return this.visitGeoArea()
      case Scope.SCOPE_TYPE_GEO_THRESHOLD:
        return this.visitGeoThreshold()
      case Scope.SCOPE_TYPE_GEO_TIME:
        return this.visitGeoTime()
      case Scope.SCOPE_TYPE_GEO_TIME_WINDOW:
        return this.visitGeoTimeWindow()
      case Scope.SCOPE_TYPE_TIME_WINDOW:
        return this.visitTimeWindow()
      case Scope.SCOPE_TYPE_TRIGGER:
        return this.visitTrigger()
      default:
        throw new UnknownScopeException(type)
    }
  }
  // a enlever
  private visitGeoArea(): void {
    // Implementation for visitGeoArea
  }

  private visitGeoThreshold(): void {}

  private visitGeoTime(): void {}

  private visitGeoTimeWindow(): void {}

  private visitTimeWindow(): void {}

  private visitTrigger(): void {}
}
