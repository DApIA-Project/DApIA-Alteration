import { Constant } from './Constant'
import {
  isASTNumberOffset,
  isASTRecordingValue,
} from '../../language-server/generated/ast'
import { ConstantTypes } from './ConstantTypes'

export class ListConstant extends Constant<ConstantTypes> {
  constructor(name: string, private readonly values: ConstantTypes[]) {
    super(name)
    this.values = values
  }

  getValues(): ConstantTypes[] {
    return this.values
  }
}
