/*import { assert } from 'chai';
import "mocha";
import * as fs from 'fs';
import {
    BaseStationParser,
    writeBaseStationMessageToFile
} from './BaseStationParser';
import {BaseStationMessage} from "./BaseStationMessage";


describe('BaseStationParser', () => {
    describe('createBstMessage', () => {
        it('should create BaseStationMessage object from valid line', () => {
            const line = 'MSG,1,123,456,ABC123,789,2023/07/03,12:00:00.000,2023/07/03,12:00:00.000,"CallSign",123,456.789,123.456,1.234,5,1,0,1,0,{}';
            const message = BaseStationParser.createBstMessage(line);
            assert.instanceOf(message, BaseStationMessage);
            assert.equal(message.transmissionType, 1);
            assert.equal(message.sessionID, 123);
            assert.equal(message.aircraftID, 456);
            assert.equal(message.icao, 'ABC123');
            assert.equal(message.flightID, 789);
            assert.equal(message.callSign, 'CallSign');
            assert.equal(message.altitude, 123);
            assert.equal(message.groundSpeed, 456.789);
            assert.equal(message.track, 123.456);
            assert.equal(message.latitude, 1.234);
            assert.equal(message.longitude, 5);
            assert.equal(message.verticalRate, 1);
            assert.equal(message.squawk, 0);
            assert.isTrue(message.alert);
            assert.isFalse(message.emergency);
            assert.isTrue(message.spi);
            assert.isFalse(message.onGround);
            assert.deepEqual(message.extraField, {});
            assert.equal(message.mask, 0);
        });

        it('should return null for invalid line', () => {
            const line = 'INVALID_LINE';
            const message = BaseStationParser.createBstMessage(line);
            assert.isNull(message);
        });
    });

    describe('strDateToTimestamp', () => {
        it('should convert BST date string to timestamp', () => {
            const date = '2023/07/03,12:00:00.000';
            const timestamp = BaseStationParser.strDateToTimestamp(date);
            assert.equal(timestamp, 1688385600000);
        });
    });

    describe('timestampToStrDate', () => {
        it('should convert timestamp to BST date string', () => {
            const timestamp = 1688385600000;
            const date = BaseStationParser.timestampToStrDate(timestamp);
            assert.equal(date, '2023/07/03,12:00:00.000');
        });
    });
});
/*
describe('alterBaseStationMessage', () => {
    it('should alter BaseStationMessage based on alteration type', () => {
        const message = new BaseStationMessage(1, 123, 456, 'ABC123', 789, 1688385600000, 1688385600000, 'CallSign', 1000, 200, 45, 1.23, 4.56, 10, 1234, true, false, true, false, {}, 0);
        const alteredMessage = alterBaseStationMessage(message, 'ALTERATION');
        assert.deepEqual(alteredMessage, message);
    });
});*/
/**
 * describe('writeBaseStationMessageToFile', () => {
 *     it('should write BaseStationMessage to file', () => {
 *         const filePath = 'output.txt';
 *         const message = new BaseStationMessage(1, 123, 456, 'ABC123', 789, 1688385600000, 1688385600000, 'CallSign', 1000, 200, 45, 1.23, 4.56, 10, 1234, true, false, true, false, {}, 0);
 *         writeBaseStationMessageToFile(message, filePath);
 *         const fileContent = fs.readFileSync(filePath, 'utf-8');
 *         assert.equal(fileContent.trim(), 'MSG,1,123,456,ABC123,789,2023-07-03T12:00:00.000Z,2023-07-03T12:00:00.000Z,CallSign,1000,200,45,1.23,4.56,10,1234,1,0,1,0,{}');
 *       //  fs.unlinkSync(filePath);
 *     });
 * });
 */
