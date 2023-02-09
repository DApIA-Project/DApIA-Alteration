import express from 'express'
import {setupExpress} from "../../helpers/setupExpress";
import request from 'supertest'
import {ApiRoutes} from '@smartesting/shared/src/routes';
import assert from "assert";
import {AlterRecordingError} from '@smartesting/shared/dist/responses'

describe(`POST ${ApiRoutes.alteration()}`, () => {
    let server: express.Express

    beforeEach(() => {
        server = setupExpress()
    })

    context('when syntax scenario is invalid', () => {
        it('returns 422 if the scenario syntax is invalid', async () => {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario : 'hide all_planes 8 seconds', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName : 'myfile.sbs'})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidSyntax)
        })

    })

})