import { delay, parse, always } from '../../../src'
import { expect } from 'chai'

const msg = parse(
  'MSG,0,0,0,39AC47,0,2018/02/28,16:04:15.987,2018/02/28,16:04:15.987,,12349,341,12.1,50.2,0.25,4,,1,0,1,0'
)[0]

describe('Delay engine', () => {
  it('should add 15 second to a message', () => {
    let expected = [
      {
        ...msg,
        timestampLogged: msg.timestampLogged + 15000,
        timestampGenerated: msg.timestampGenerated + 15000,
      },
    ]

    const actual = delay({
      scope: always,
      time: 15000,
    }).processing([msg])

    expect(actual).to.be.deep.equals(expected)
  })

  it('should remove 15 second to a message', () => {
    const expected = [
      {
        ...msg,
        timestampLogged: msg.timestampLogged - 15000,
        timestampGenerated: msg.timestampGenerated - 15000,
      },
    ]

    const actual = delay({
      scope: always,
      time: -15000,
    }).processing([msg])

    expect(actual).to.be.deep.equals(expected)
  })
})
