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

    context('when scenario is invalid', () => {
        it('returns 422 if the scenario content is blank', async () => {
            await assertBlankScenario(' ')
        })

        it('returns 422 if the scenario content is empty', async () => {
            await assertBlankScenario('')
        })

        it('returns 422 if the scenario content is not set', async () => {
            await assertBlankScenario()
        })

        async function assertBlankScenario(scenario?: string) {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario, fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName : 'myfile.sbs'})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidFormat)
        }
    })


    context('when file content is invalid', () => {
        it('returns 422 if the file content is blank', async () => {
            await assertBlankFileContent(' ')
        })

        it('returns 422 if the file content is empty', async () => {
            await assertBlankFileContent('')
        })

        it('returns 422 if the file content is not set', async () => {
            await assertBlankFileContent()
        })

        async function assertBlankFileContent(fileContent?: string) {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario: 'hide all_planes at 0 seconds', fileContent,fileName : 'myfile.sbs'})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidFormat)
        }
    })

    context('when file name is invalid', () => {
        it('returns 422 if the file name is blank', async () => {
            await assertBlankFileName(' ')
        })

        it('returns 422 if the file name is empty', async () => {
            await assertBlankFileName('')
        })

        it('returns 422 if the file name is not set', async () => {
            await assertBlankFileName()
        })

        it('returns 422 if the file extension not exist', async () => {
            await assertNoValidExtensionFile('myfile')
        })

        it('returns 422 if the file extension is not valid', async () => {
            await assertNoValidExtensionFile('myfile.txt')
        })

        async function assertBlankFileName(fileName?: string) {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario: 'hide all_planes at 0 seconds', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidFormat)
        }

        async function assertNoValidExtensionFile(fileName: string) {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({scenario: 'hide all_planes at 0 seconds', fileContent: 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',fileName})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidFormat)
        }
    })

})