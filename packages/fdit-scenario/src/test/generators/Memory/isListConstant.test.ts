import { isListConstant } from '../../../generators/Memory/isListConstant'
import assert from 'assert'
import { RangeConstant } from '../../../generators/Memory/RangeConstant'
import { ListConstant } from '../../../generators/Memory/ListConstant'

describe('isListConstant', () => {
  it('returns true if the constant is a list', () => {
    assert(isListConstant(new ListConstant('var', [1, 2, 3])))
  })

  it('returns false if the constant is not a list', () => {
    assert(!isListConstant(new RangeConstant('var', 0, 1)))
  })
})
