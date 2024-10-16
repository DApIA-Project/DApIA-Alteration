import { Template, parse } from '../../../src'
import { expect } from 'chai'

describe('Template Messages', () => {
  it("shouldn't replace undefined values", () => {
    let msg = parse(
      'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n'
    )[0]
    let values = { latitude: 7, longitude: 9 }

    let actual = Template.replace(msg, values)
    expect(actual.latitude).to.be.an('undefined')
    expect(actual.longitude).to.be.an('undefined')
  })

  it('should replace defined values', () => {
    let msg = parse(
      'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n'
    )[0]
    let values = { latitude: 7, longitude: 9 }

    let actual = Template.replace(msg, values)
    expect(actual.latitude).to.not.be.an('undefined')
    expect(actual.longitude).to.not.be.an('undefined')
    expect(actual).to.include(values)
  })

  it('should keep significant number when replacing values', () => {
    let msg = parse(
      'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n'
    )[0]
    let values = { latitude: 1.111111111, longitude: 6.666666666 }

    let actual = Template.replace(msg, values)
    expect(actual.latitude).to.be.equals(1.1111)
    expect(actual.longitude).to.be.equals(6.6667)
  })

  it('should replace zero', () => {
    let msg = parse(
      'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975.0,,,48.2271,0,,,0,0,0,0\n'
    )[0]
    let values = { latitude: 1, longitude: 6 }

    let actual = Template.replace(msg, values)
    expect(actual.longitude).to.be.equals(6)
  })
})
