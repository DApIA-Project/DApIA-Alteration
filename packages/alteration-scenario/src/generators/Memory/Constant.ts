export abstract class Constant<T> {
  protected constructor(protected readonly name: string) {}

  getName(): string {
    return this.name
  }
}
