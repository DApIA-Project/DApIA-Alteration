import {
  always,
  and,
  parse,
  saturation,
  target,
  timeWindow,
} from '../../../src'
import { expect } from 'chai'
import messages from '../../recordings/messages.json'
import messages2 from '../../recordings/messages2.json'

describe('Saturation engine', () => {
  it('should add 1 ghost aircraft per message', () => {
    let start_date = 1543148536239
    let source = parse(
      'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000.0,,,48.2206,3.557,,,0,0,0,0\n' +
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.63,336.31,,,0.0,,,,,\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000.0,,,48.2219,3.5562,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000.0,,,48.226,3.5534,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n' +
        'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n' +
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.63,336.31,,,0,,,,,\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000.0,,,48.2293,3.5513,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000.0,,,48.228,3.5522,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000.0,,,48.2306,3.5505,,,0,0,0,0'
    )

    let actual = saturation({
      scope: timeWindow(start_date, start_date + 4000),
      aircrafts: 1,
      angleMax: 15,
    }).processing(source)

    expect(actual).to.have.lengthOf(21)
  })

  it('should add 15 ghost aircraft', () => {
    let start_date = 1555695000000
    let source = parse(
      'MSG,3,0,0,4B1613,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n' +
        'MSG,3,0,0,4B1613,0,2019/04/19,17:30:01.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n' +
        'MSG,3,0,0,4B1613,0,2019/04/19,17:30:02.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n' +
        'MSG,3,0,0,4B1613,0,2019/04/19,17:30:03.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n' +
        'MSG,3,0,0,4B1613,0,2019/04/19,17:30:04.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0'
    )

    let actual = saturation({
      scope: timeWindow(start_date, start_date + 10000),
      aircrafts: 15,
      angleMax: 15,
    }).processing(source)

    expect(actual).to.have.lengthOf(5 * 15 + 5)
  })

  it.skip('[utils] should generate aircraft with realist tracks', () => {
    // time = 1481271510
    const altered = saturation({
      scope: and(always, target('392AF4')),
      aircrafts: 1,
      angleMax: 45,
    }).processing(messages)
    console.log(altered.map((message) => message.track))
  })

  it.skip('[utils] should generate tracks on helicopter flight', () => {
    // time = 1481271510
    const altered = saturation({
      scope: and(always, target('39ac45')),
      aircrafts: 1,
      angleMax: 45,
    }).processing(messages2)
    const tracks = altered.map((message) => message.track)
    const deltas = []
    for (let i = 1; i < tracks.length; i = i + 2) {
      deltas.push(tracks[i - 1] - tracks[i])
    }
    console.log(deltas)
    // console.log(tracks)
  })
})
