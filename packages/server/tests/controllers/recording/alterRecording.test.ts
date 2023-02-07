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
                .send({scenario, fileContent: 'myFile.sbs'})
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
                .send({scenario: 'hide all_planes at 0 seconds', fileContent})
                .expect(422)

            const {error, alteredRecording} = response.body

            assert(!alteredRecording, 'Altered recording is not returned')
            assert.equal(error, AlterRecordingError.invalidFormat)
        }
    })
})