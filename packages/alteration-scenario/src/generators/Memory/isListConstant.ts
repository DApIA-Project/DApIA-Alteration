import { Constant } from './Constant'
import { ListConstant } from './ListConstant'
import { ConstantTypes } from './ConstantTypes'

export function isListConstant(
  constant: Constant<ConstantTypes>
): constant is ListConstant {
  return typeof (constant as any).getValues === 'function'
}
