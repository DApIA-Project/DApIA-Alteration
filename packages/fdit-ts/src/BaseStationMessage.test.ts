import { assert } from 'chai'
import { BaseStationMessage } from './BaseStationMessage'

describe('BaseStationMessage', () => {
  let baseStationMessage: BaseStationMessage

  beforeEach(() => {
    // Create a new instance of BaseStationMessage before each test case
    baseStationMessage = new BaseStationMessage(
      1, // transmissionType
      2, // sessionID
      3, // aircraftID
      'ICAO123', // icao
      4, // flightID
      1631068800, // timestampGenerated
      1631068900, // timestampLogged
      null, // callSign
      null, // altitude
      null, // groundSpeed
      null, // track
      null, // latitude
      null, // longitude
      null, // verticalRate
      null, // squawk
      true, // alert
      false, // emergency
      true, // spi
      false, // onGround
      {} // extraField
    )
  })

  it('should set and get flight ID', () => {
    const flightID = 100
    baseStationMessage.setFlightID(flightID)
    assert.equal(baseStationMessage.getFlightID(), flightID)
  })

  it('should set and get session ID', () => {
    const sessionID = 200
    baseStationMessage.setSessionID(sessionID)
    assert.equal(baseStationMessage.getSessionID(), sessionID)
  })

  it('should set and get ICAO', () => {
    const icao = 'ICAO456'
    baseStationMessage.setIcao(icao)
    assert.equal(baseStationMessage.getIcao(), icao)
  })

  it('should alter ICAO with random offset', () => {
    const initialIcao = baseStationMessage.getIcao()
    baseStationMessage.alterIcao('random')
    assert.notEqual(baseStationMessage.getIcao(), initialIcao)
  })

  it('should convert to string representation', () => {
    const expectedString =
      'MSG,1,2,3,ICAO123,4,2021-09-08T00:00:00.000,2021-09-08T00:01:30.000,,,,,,,1,0,1,0,0,0,{"test": "data"}'
    baseStationMessage.setExtraField({ test: 'data' })
    const actualString = baseStationMessage.toString()
    assert.equal(actualString, expectedString)
  })
})
