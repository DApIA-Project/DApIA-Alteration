import { RangeConstant } from './RangeConstant'
import { Constant } from './Constant'

export function isRangeConstant(
  constant: Constant<number>
): constant is RangeConstant {
  return (
    typeof (constant as any).getStart === 'function' &&
    typeof (constant as any).getEnd === 'function'
  )
}
