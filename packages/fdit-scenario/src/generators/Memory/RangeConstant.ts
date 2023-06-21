import { Constant } from './Constant'

export class RangeConstant extends Constant<number> {
  constructor(
    name: string,
    private readonly start: number,
    private readonly end: number
  ) {
    super(name)
    this.start = start
    this.end = end
  }

  getStart(): number {
    return this.start
  }

  getEnd(): number {
    return this.end
  }
}
