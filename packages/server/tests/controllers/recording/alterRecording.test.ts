import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { AlterRecordingError } from '@smartesting/shared/dist'
import { renderIntoDocument } from 'react-dom/test-utils'

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

    it('returns 422 if the scenario content is not a good scenario', async () => {
      await assertNoValidScenario('hide all_planes 0 seconds')
    })

    async function assertBlankScenario(scenario?: string) {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario,
          recording: {
            name: 'myfile.sbs',
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
          recordingToReplay: undefined,
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
      assert.equal(error, AlterRecordingError.invalidFormat)
    }

    async function assertNoValidScenario(scenario: string) {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario: scenario,
          recording: {
            name: 'myfile.sbs',
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
          recordingToReplay: undefined,
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
      assert.equal(error.includes(AlterRecordingError.invalidSyntax), true)
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
        .send({
          scenario: 'hide all_planes at 0 seconds',
          recording: {
            name: 'myfile.sbs',
            content: fileContent,
          },
          recordingToReplay: undefined,
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
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
        .send({
          scenario: 'hide all_planes at 0 seconds',
          recording: {
            name: fileName,
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
          recordingToReplay: undefined,
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
      assert.equal(error, AlterRecordingError.invalidFormat)
    }

    async function assertNoValidExtensionFile(fileName: string) {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario: 'hide all_planes at 0 seconds',
          recording: {
            name: fileName,
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
          recordingToReplay: undefined,
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
      assert.equal(error, AlterRecordingError.invalidFormat)
    }
  })

  context('when file2 content is invalid', () => {
    it('returns 422 if the file2 content is blank', async () => {
      await assertBlankFileContent(' ')
    })

    it('returns 422 if the file2 content is empty', async () => {
      await assertBlankFileContent('')
    })

    it('returns 422 if the file2 content is not set', async () => {
      await assertBlankFileContent()
    })

    async function assertBlankFileContent(fileContent2?: string) {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario:
            'replay all_planes from_recording "record_AFR.sbs" from 0 seconds until 1000 seconds ',
          recording: {
            name: 'myfile.sbs',
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
          recordingToReplay: {
            name: 'myfile2.sbs',
            content: fileContent2,
          },
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
      assert.equal(error, AlterRecordingError.invalidFormat)
    }
  })

  context('when file2 name is invalid', () => {
    it('returns 422 if the file2 name is blank', async () => {
      await assertBlankFileName(' ')
    })

    it('returns 422 if the file2 name is empty', async () => {
      await assertBlankFileName('')
    })

    it('returns 422 if the file2 name is not set', async () => {
      await assertBlankFileName()
    })

    it('returns 422 if the file2 extension not exist', async () => {
      await assertNoValidExtensionFile('myfile2')
    })

    it('returns 422 if the file2 extension is not valid', async () => {
      await assertNoValidExtensionFile('myfile2.txt')
    })

    async function assertBlankFileName(fileName2?: string) {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario:
            'replay all_planes from_recording "myfile2.sbs" from 0 seconds until 1000 seconds ',
          recording: {
            name: 'myfile.sbs',
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
          recordingToReplay: {
            name: fileName2,
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
      assert.equal(error, AlterRecordingError.invalidFormat)
    }

    async function assertNoValidExtensionFile(fileName2: string) {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario: 'hide all_planes at 0 seconds',
          recording: {
            name: 'myfile.sbs',
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
          recordingToReplay: {
            name: fileName2,
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          },
        })
        .expect(422)

      const { error, alteredRecordings } = response.body
      assert.deepStrictEqual(alteredRecordings, [])
      assert.equal(error, AlterRecordingError.invalidFormat)
    }
  })

  //TODO modify langage for remove file2 when replay
  /***
     context('when scenario is replay and not have file2', () => {
        it('returns 422 if its replay and not have file2', async () => {
            const response = await request(server)
                .post(ApiRoutes.alteration())
                .send({
                    scenario:
                        'replay all_planes from_recording "myfile2.sbs" from 0 seconds until 1000 seconds',
                    recording: {
                        content:
                            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
                        name: 'myfile.sbs',
                    },
                })
                .expect(422)

            const {error, alteredRecordings} = response.body
            assert.deepStrictEqual(alteredRecordings, [])
            assert.equal(error, AlterRecordingError.invalidFormat)
        })
    })
     ***/

  context('when all is valid', () => {
    it('returns 200 and altered recordings', async () => {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario:
            'let $call = {0, 10}, hide all_planes from $call seconds until 1000 seconds ',
          recording: {
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
            name: 'myfile.sbs',
          },
          optionsAlteration: {
            haveLabel: false,
            haveRealism: false,
          },
        })
        .expect(200)

      const { alteredRecordings, error } = response.body

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 2)
    })

    it('returns 200 and altered recordings with replay', async () => {
      const response = await request(server)
        .post(ApiRoutes.alteration())
        .send({
          scenario:
            'let $call = {0, 10}, replay all_planes from_recording "myfile2.sbs" from $call seconds until 1000 seconds ',
          recording: {
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
            name: 'myfile.sbs',
          },
          recordingToReplay: {
            content:
              'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
            name: 'myfile2.sbs',
          },
          optionsAlteration: {
            haveLabel: false,
            haveRealism: false,
          },
        })
        .expect(200)

      const { alteredRecordings, error } = response.body

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 2)
    })
  })
})
