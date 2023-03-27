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
                .send({scenario : 'hide all_planes 8 seconds', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName : 'myfile.sbs',fileContent2 : '', fileName2 :''})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidSyntax)
        })

        it('returns 422 if the scenario syntax is invalid with variables', async () => {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario : 'let $alt = [12000, 30000], let $call = {"SAMU23","SAMU89"}, alter all_planes 0 seconds with_values ALTITUDE=$alt and CALLSIGN=$call', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName : 'myfile.sbs',fileContent2 : '', fileName2 :''})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidSyntax)
        })

    })

    context('when syntax scenario is valid', () => {
        it('returns 200 if the scenario syntax is valid', async () => {

            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario : 'hide all_planes at 8 seconds', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName : 'myfile.sbs',fileContent2 : '', fileName2 :''})
                .expect(200)

            const {reponse, name_file, altered_content} = response.body

            assert(reponse, '');
            assert(name_file, 'modified__myfile.sbs');
            assert.equal(altered_content.length, 1);
        }).timeout(10000);

        it('returns 200 if the scenario syntax is valid with variables', async () => {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario : 'let $call = {4}, alter all_planes at $call seconds with_values CALLSIGN="SAMU88"', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName : 'myfile.sbs',fileContent2 : '', fileName2 :''})
                .expect(200)

            const {reponse, name_file, altered_content} = response.body
            console.log(reponse)
            assert(name_file, 'modified__myfile.sbs');
            assert.equal(altered_content.length, 1);
        })

        it('returns 200 if the scenario syntax is valid with variables and replay', async () => {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario : 'let $call = {0, 10}, replay all_planes from_recording "myfile2.sbs" from $call seconds until 1000 seconds ', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName : 'myfile.sbs',fileContent2 : 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,', fileName2 :'myfile2.sbs'})
                .expect(200)

            const {reponse, name_file, altered_content} = response.body
            console.log(reponse)
            assert(name_file, 'modified__myfile.sbs');
            assert.equal(altered_content.length, 2);
        })

    })

})