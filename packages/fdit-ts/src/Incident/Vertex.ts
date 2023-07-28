import { Lat } from './Lat'
import { Lon } from './Lon'

export class Vertex {
  private lat?: Lat
  private lon?: Lon
  private time?: number

  public getLat(): Lat | undefined {
    return this.lat
  }

  public getLatValue(): number {
    return this.lat?.getContent() ?? 0.0
  }

  public isLatOffset(): boolean {
    return this.lat?.getOffset() ?? false
  }

  public setLat(lat: Lat): void {
    this.lat = lat
  }

  public getLon(): Lon | undefined {
    return this.lon
  }

  public setLon(lon: Lon): void {
    this.lon = lon
  }

  public getLonValue(): number {
    return this.lon?.getContent() ?? 0.0
  }

  public isLonOffset(): boolean {
    return this.lon?.getOffset() ?? false
  }

  public getTime(): number | undefined {
    return this.time
  }

  public setTime(time: number): void {
    this.time = time
  }
}
