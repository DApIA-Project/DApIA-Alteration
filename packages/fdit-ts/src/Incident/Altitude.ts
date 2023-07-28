export class Altitude {
  private offset?: boolean
  private time?: boolean
  private content?: number

  public getOffset(): boolean {
    return this.offset ?? false
  }

  public setOffset(offset: boolean): void {
    this.offset = offset
  }

  public getTime(): boolean {
    return this.time ?? false
  }

  public setTime(time: boolean): void {
    this.time = time
  }

  public getContent(): number {
    return this.content ?? 0
  }

  public setContent(content: number): void {
    this.content = content
  }
}
