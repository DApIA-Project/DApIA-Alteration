export class Target {
  public static readonly TARGET_ALL = 'ALL'
  private identifier?: string
  private content?: string

  public getIdentifier(): string | undefined {
    return this.identifier
  }

  public setIdentifier(identifier: string): void {
    this.identifier = identifier
  }

  public getContent(): string | undefined {
    return this.content
  }
  public setContent(content: string): void {
    this.content = content
  }
}
