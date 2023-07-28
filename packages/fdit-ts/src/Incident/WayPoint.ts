import { Vertex } from './Vertex'
import { Altitude } from './Altitude'

export class WayPoint {
  private vertex?: Vertex
  private altitude?: Altitude
  private time: number = 0

  public getVertex(): Vertex | undefined {
    return this.vertex
  }

  public setVertex(vertex: Vertex): void {
    this.vertex = vertex
  }

  public getAltitude(): Altitude | undefined {
    return this.altitude
  }

  public getAltitudeValue(): number {
    return this.altitude?.getContent() ?? 0
  }

  public isAltitudeOffset(): boolean {
    return this.altitude?.getOffset() ?? false
  }

  public isTimedAltitude(): boolean {
    return !!this.altitude?.getTime()
  }

  public isTimedPosition(): boolean {
    return !!this.vertex?.getTime()
  }

  public setAltitude(altitude: Altitude): void {
    this.altitude = altitude
  }

  public getTime(): number {
    return this.time
  }

  public setTime(time: number): void {
    this.time = time
  }
}
