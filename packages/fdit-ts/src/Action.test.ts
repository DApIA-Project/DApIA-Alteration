import { assert } from 'chai'
import { BaseStationMessage } from './BaseStationMessage'
import { Action, ActionType, ActionParameters } from './Action'
import { SinonMock, SinonSandbox, SinonSpy } from 'sinon'
import sinon = require('sinon')
import { ActionLogger } from './ActionLogger'

describe('Action', () => {
  let action: Action
  let sandbox: SinonSandbox
  let actionLog: ActionLogger

  beforeEach(() => {
    action = new Action(actionLog)
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should apply alteration for callsign', () => {
    const message: BaseStationMessage = new BaseStationMessage(
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

    const parameters: ActionParameters<string> = {
      type: ActionType.ALTERATION,
      data: 'callsign',
    }

    const alterCallsignSpy: SinonSpy = sandbox.spy(message, 'alterCallsign')
    action.doSwitch(ActionType.ALTERATION, message, parameters)

    assert.isTrue(alterCallsignSpy.calledOnceWith(parameters.data))
  })
  /*
    it('should create a new message during alteration', () => {
        const message: BaseStationMessage = new BaseStationMessage(
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
            {}, // extraField


        const parameters: any = {
            type: ActionType.CREATION,
            data: null,
        };

        const applyCreationMock: SinonMock = sandbox.mock(action);
        applyCreationMock.expects('applyCreation').once().withArgs(message, parameters);

        action.doSwitch(ActionType.CREATION, message, parameters);

        applyCreationMock.verify();
    });
*/
})
