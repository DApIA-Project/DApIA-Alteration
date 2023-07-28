import { WayPoint } from './WayPoint'

export class Trajectory {
  private wayPoints: WayPoint[] = []

  public getWayPoints(): WayPoint[] {
    return this.wayPoints
  }

  public setWayPoints(wayPoints: WayPoint[]): void {
    this.wayPoints = wayPoints
  }
}
