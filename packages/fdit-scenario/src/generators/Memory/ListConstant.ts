import { Constant } from './Constant'
import {
  isASTNumberOffset,
  isASTRecordingValue,
} from '../../language-server/generated/ast'
import { ConstantTypes } from './ConstantTypes'

export class ListConstant extends Constant<ConstantTypes> {
  constructor(name: string, private readonly values: ConstantTypes[]) {
    super(name)
    if (values.length === 0) {
      throw new Error('Constant list cannot be empty')
    }
    /*if(values.every((t) => typeof t === "string") ||
            values.every((t) => typeof t === "number") ||
            values.every((t) => isASTNumberOffset(t)) ||
            values.every((t) => isASTRecordingValue(t)) ||
            values.every((t) => typeof t === "object" && t !== null && t !== undefined)
        ){
            this.values = values;
        } else {
            throw new Error("Unauthorized type for a constant list");
        }*/
    this.values = values
  }

  getValues(): ConstantTypes[] {
    return this.values
  }
}
