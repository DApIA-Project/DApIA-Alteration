import express from 'express'
import {setupExpress} from "../../helpers/setupExpress";
import request from 'supertest'
import {ApiRoutes} from '@smartesting/shared/src/routes';
import assert from "assert";
import {AlterRecordingError} from '@smartesting/shared/dist'
import alterRecording from "../../../src/api/core/recording/alterRecording";

describe(`POST ${ApiRoutes.alteration()}`, () => {
    let server: express.Express

    beforeEach(() => {
        server = setupExpress()
    })

    context('when syntax scenario is invalid', () => {
        it('returns 422 if the scenario syntax is invalid', async () => {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({
                    scenario: 'hide all_planes 8 seconds',
                    fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
                    fileName: 'myfile.sbs',
                    fileContent2: '',
                    fileName2: ''
                })
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidSyntax)
        })

        it('returns 422 if the scenario syntax is invalid with variables', async () => {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({
                    scenario: 'let $alt = [12000, 30000], let $call = {"SAMU23","SAMU89"}, alter all_planes 0 seconds with_values ALTITUDE=$alt and CALLSIGN=$call',
                    fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
                    fileName: 'myfile.sbs',
                    fileContent2: '',
                    fileName2: ''
                })
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidSyntax)
        })

    })

    context('when syntax scenario is valid', () => {
        it('returns an altered recording', async () => {
            const {error, alteredRecordings} = await alterRecording(
                'hide all_planes at 8 seconds',
                {
                    content: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
                    name: 'myfile.sbs'
                })

            assert(!error, 'Error is defined')
            assert.equal(alteredRecordings.length, 1)
        })

        it('returns 2 altered recording if variables are defined', async () => {
            const {error, alteredRecordings} = await alterRecording(
                'let $call = {"SAMU77", "SAMU90"}, alter all_planes at 0 seconds with_values CALLSIGN=$call',
                {
                    content: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
                    name: 'myfile.sbs'
                })

            assert(!error, 'Error is defined')
            assert.equal(alteredRecordings.length, 2)
        })

        it('returns 2 altered recording if variables are defined and the scenario is a replay', async () => {
            const {error, alteredRecordings} = await alterRecording(
                'let $call = {0, 10}, replay all_planes from_recording "myfile2.sbs" from $call seconds until 1000 seconds ',
                {
                    content: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
                    name: 'myfile.sbs'
                },
                {
                    content: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
                    name: 'myfile2.sbs'
                })

            assert(!error, 'Error is defined')
            assert.equal(alteredRecordings.length, 2)

        })
    })
})