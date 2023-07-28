//import {writeFileSync} from "fs";

import { Action } from './Action'

export class ActionLogger {
  private actions: Action[] = []
  private icaos: Set<string> = new Set()
  private alteredMessageNumber = 0
  private modifiedMessageNumber = 0
  private deletedMessageNumber = 0
  private createdMessageNumber = 0
  private minDate = Number.MAX_SAFE_INTEGER
  private maxDate = Number.MIN_SAFE_INTEGER

  public getAlteredMessageNumber(): number {
    return this.alteredMessageNumber
  }

  public getAlteredAircraftNumber(): number {
    return this.icaos.size
  }

  public getModifiedMessageNumber(): number {
    return this.modifiedMessageNumber
  }

  public getDeletedMessageNumber(): number {
    return this.deletedMessageNumber
  }

  public getCreatedMessageNumber(): number {
    return this.createdMessageNumber
  }

  public getActionNumber(): number {
    return this.actions.length
  }

  public getMinDate(): number {
    return this.minDate
  }

  public getMaxDate(): number {
    return this.maxDate
  }

  public incrementAlteredMessage(): void {
    this.alteredMessageNumber++
  }

  public incrementModifiedMessage(): void {
    this.modifiedMessageNumber++
    this.incrementAlteredMessage()
  }

  public incrementDeletedMessage(): void {
    this.deletedMessageNumber++
    this.incrementAlteredMessage()
  }

  public incrementCreatedMessage(): void {
    this.createdMessageNumber++
    this.incrementAlteredMessage()
  }

  public updateDate(date: number): void {
    this.minDate = Math.min(this.minDate, date)
    this.maxDate = Math.max(this.maxDate, date)
  }

  public getIcaos(): Set<string> {
    return this.icaos
  }

  public getActionDuration(): number {
    return this.maxDate - this.minDate
  }

  public addAllActions(actions: Action[]): void {
    this.actions.push(...actions)
  }

  public addIcao(icao: string): void {
    this.icaos.add(icao)
  }

  public print(outputFile: string): void {
    console.log()
    /*  const logData = `
        Altered Message Number: ${this.alteredMessageNumber}Altered Aircraft Number: ${this.icaos.size}
        Modified Message Number: ${this.modifiedMessageNumber}
        Deleted Message Number: ${this.deletedMessageNumber}
        Created Message Number: ${this.createdMessageNumber}
        Action Number: ${this.actions.length}
        Min Date: ${this.minDate}
        Max Date: ${this.maxDate}
    `   ;
         writeFileSync(outputFile, logData);*/
  }
}
