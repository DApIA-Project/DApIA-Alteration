import { and, target, timeWindow } from '../../src/scope'
import { assert } from 'chai'

const msg = {
  messageType: 'MSG',
  transmissionType: 0,
  sessionID: 0,
  flightID: 0,
  hexIdent: 'A1B2C3',
  aircraftID: 0,
  timestampGenerated: 1500,
  timestampLogged: 1500,
}

describe('Scopes', () => {
  it('target one icao', () => {
    assert(target('A1B2C3')(msg))
    assert(target('AAAAAA')(msg) == false)
    assert(target("(|['")(msg) == false)
    assert(target('A1B2C3D4')(msg) == false)
  })

  it('target with time windows', () => {
    assert(timeWindow(1000, 2000)(msg))
    assert(timeWindow(1500, 2000)(msg))
    assert(timeWindow(1000, 1500)(msg))
    assert(timeWindow(1500, 1500)(msg))

    assert(timeWindow(0, 1000)(msg) == false)
    assert(timeWindow(1501, 2000)(msg) == false)
  })

  it('target only if all scopes are true [and]', () => {
    assert(and(target('A1B2C3'), timeWindow(1000, 2000))(msg))

    assert(and(target('A1B2C3'), timeWindow(0, 1000))(msg) == false)
    assert(and(target('AAAAAA'), timeWindow(1000, 1500))(msg) == false)

    assert(and()(msg) == false)
  })
})
