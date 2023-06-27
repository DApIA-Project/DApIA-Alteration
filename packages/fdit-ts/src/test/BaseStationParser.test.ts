import "mocha";
const assert = require('assert');
const { BaseStationParser, BaseStationMessageFull } = require('./BaseStationParser');

describe('BaseStationParser', () => {
    describe('createBstMessage', () => {
        it('null', () => {
            const message = '';
            const result = BaseStationParser.createBstMessage(message);
            assert.strictEqual(result, null);
        });

        it('no fields', () => {
            const message = 'MSG,,';
            const result = BaseStationParser.createBstMessage(message);
            assert.strictEqual(result, null);
        });

        it('valid message', () => {
            const message = 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0';
            const result = BaseStationParser.createBstMessage(message);
            assert.ok(result instanceof BaseStationMessageFull);
            assert.strictEqual(result.transmissionType, 0);
            assert.strictEqual(result.sessionID, 3);
            assert.strictEqual(result.aircraftID, ,10610299);
            assert.strictEqual(result.icao, 'A1E67B');
            assert.strictEqual(result.flightID,10610299);
            assert.strictEqual(result.timestampGenerated,'2019/04/19,17:30:00.140');
            assert.strictEqual(result.timestampLogged,'2019/04/19,17:30:00.140');
        });
    });
});

describe('BaseStationMessageFull', () => {
    describe('toString', () => {
        it('valid string', () => {
            const message = new BaseStationMessageFull( 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
            const result = message.toString();
            assert.strictEqual(result, 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
        });
    });

    describe('equals', () => {
        it('two equals', () => {
            const message1 = new BaseStationMessageFull( 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
            const message2 = new BaseStationMessageFull( 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
            const result = message1.equals(message2);
            assert.strictEqual(result, true);
        });

        it('not equals', () => {
            const message1 = new BaseStationMessageFull( 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
            // TransmissionType modified
            const message2 = new BaseStationMessageFull( 'MSG,1,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
            const result = message1.equals(message2);
            assert.strictEqual(result, false);
        });
    });

    describe('compareTo', () => {
        it('', () => {
            //timestamp modified
const message1 = new BaseStationMessageFull( 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
const message2 = new BaseStationMessageFull( 'MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:20:00.140,2019/04/19,17:20:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0');
const result = message1.compareTo(message2);
assert.strictEqual(result < 0, true);
