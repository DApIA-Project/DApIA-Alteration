import { Constant } from './Constant'
import { ConstantTypes } from './ConstantTypes'

export class Memory {
  private constantMap: Map<string, Constant<ConstantTypes>> = new Map<
    string,
    Constant<ConstantTypes>
  >()

  private replayAttack = false

  constructor() {}

  addConstant(constant: Constant<ConstantTypes>): void {
    this.constantMap.set(constant.getName(), constant)
  }

  getConstant(key: string): Constant<ConstantTypes> | undefined {
    return this.constantMap.get(key)
  }

  getConstants(): Constant<ConstantTypes>[] {
    return Array.from(this.constantMap.values())
  }

  clear(): void {
    this.constantMap.clear()
    this.replayAttack = false
  }

  isReplayAttack(): boolean {
    return this.replayAttack
  }

  setReplayAttack(replayAttack: boolean): void {
    this.replayAttack = replayAttack
  }
}
