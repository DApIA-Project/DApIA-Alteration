export class Recording {
  private filePath: string
  private firstDate: number = -1

  constructor(filePath: string, firstDate?: number) {
    this.filePath = filePath
    if (firstDate !== undefined) {
      this.firstDate = firstDate
    }
  }

  public getFile(): string {
    return this.filePath
  }

  public setFile(filePath: string): void {
    this.filePath = filePath
  }

  public getFirstDate(): number {
    return this.firstDate
  }
}
