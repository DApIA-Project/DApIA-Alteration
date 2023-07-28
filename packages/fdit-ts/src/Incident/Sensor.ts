import { Action } from './Action'

export class Sensor {
  private sensorType: string
  private sID: string
  private record: string
  private filter: string
  private firstDate: number
  private actions: Action[]

  public getSensorType(): string {
    return this.sensorType
  }

  public setSensorType(sensorType: string): void {
    this.sensorType = sensorType
  }

  public getSID(): string {
    return this.sID
  }

  public setSID(sID: string): void {
    this.sID = sID
  }

  public getRecord(): string {
    return this.record
  }

  public setRecord(record: string): void {
    this.record = record
  }

  public getFilter(): string {
    return this.filter || ''
  }

  public setFilter(filter: string): void {
    this.filter = filter
  }

  public getActions(): Action[] {
    return this.actions
  }

  public setActions(actions: Action[]): void {
    this.actions = actions
  }

  public getFirstDate(): number {
    return this.firstDate
  }

  public setFirstDate(firstDate: number): void {
    this.firstDate = firstDate
  }
}
//import { Sensor } from 'path/vers/la/classe/Sensor';

export class Sensors {
  public sensorList: Sensor[]

  constructor() {
    this.sensorList = []
  }
}
