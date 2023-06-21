import { isRangeConstant } from '../../../generators/Memory/isRangeConstant'
import assert from 'assert'
import { RangeConstant } from '../../../generators/Memory/RangeConstant'
import { ListConstant } from '../../../generators/Memory/ListConstant'

describe('isRangeConstant', () => {
  it('returns true if the constant is a range', () => {
    assert(isRangeConstant(new RangeConstant('var', 0, 1)))
  })

  it('returns false if the constant is not a range', () => {
    assert(!isRangeConstant(new ListConstant('var', [1, 2, 3])))
  })
})
