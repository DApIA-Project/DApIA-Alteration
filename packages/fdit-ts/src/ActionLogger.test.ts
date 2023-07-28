import { expect } from 'chai'
import { ActionLogger } from './ActionLogger'

describe('ActionLogger', () => {
  let actionLogger: ActionLogger

  beforeEach(() => {
    actionLogger = new ActionLogger()
  })
  it('should increment altered message number', () => {
    actionLogger.incrementAlteredMessage()
    actionLogger.incrementAlteredMessage()
    expect(actionLogger.getAlteredMessageNumber()).to.equal(2)
  })

  it('should increment modified message number and altered message number', () => {
    actionLogger.incrementModifiedMessage()
    expect(actionLogger.getModifiedMessageNumber()).to.equal(1)
    expect(actionLogger.getAlteredMessageNumber()).to.equal(1)
  })

  it('increment deleted message number and altered message number', () => {
    actionLogger.incrementDeletedMessage()
    expect(actionLogger.getDeletedMessageNumber()).to.equal(1)
    expect(actionLogger.getAlteredMessageNumber()).to.equal(1)
  })
  it('increment created message number and altered message number', () => {
    actionLogger.incrementCreatedMessage()
    expect(actionLogger.getCreatedMessageNumber()).to.equal(1)
    expect(actionLogger.getAlteredMessageNumber()).to.equal(1)
  })

  it(' update min and max date', () => {
    actionLogger.updateDate(100)
    actionLogger.updateDate(200)
    expect(actionLogger.getMinDate()).to.equal(100)
    expect(actionLogger.getMaxDate()).to.equal(200)
  })
  /*
    it(' add actions', () => {

    });*/

  it(' add ICAO', () => {
    actionLogger.addIcao('ICAO1')
    actionLogger.addIcao('ICAO2')
    expect(actionLogger.getAlteredAircraftNumber()).to.equal(2)
    expect(Array.from(actionLogger.getIcaos())).to.deep.equal([
      'ICAO1',
      'ICAO2',
    ])
  })

  it('calculate action duration', () => {
    actionLogger.updateDate(100)
    actionLogger.updateDate(200)
    expect(actionLogger.getActionDuration()).to.equal(100)
  })
})
