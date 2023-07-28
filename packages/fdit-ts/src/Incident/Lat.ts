export class Lat {
  private offset?: boolean
  private content?: number

  public getOffset(): boolean {
    return this.offset ?? false
  }

  public setOffset(offset: boolean): void {
    this.offset = offset
  }

  public getContent(): number {
    return this.content ?? 0.0
  }

  public setContent(content: number): void {
    this.content = content
  }
}
