import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import assert from 'assert'
import alterRecording from '../../../api/core/recording/alterRecording'
import makeTestAdapters from '../../makeTestAdapters'
import IAlterationManager from '../../../api/adapters/IAlterationManager'

describe(`core/alterRecording`, () => {
  let server: express.Express
  let alterationManager: IAlterationManager

  beforeEach(() => {
    alterationManager = makeTestAdapters().alterationManager
    server = setupExpress()
  })

  context('when syntax scenario is invalid', () => {
    it('return an error', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes 8 seconds',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          name: 'myfile.sbs',
        },
        undefined,
        { haveLabel: false, haveRealism: false },
        alterationManager
      )

      assert.equal(alteredRecordings.length, 0)
      assert.equal(!error, false)
    })

    it('returns an error when scenario have variables', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'let $alt = [12000, 30000], let $call = {"SAMU23","SAMU89"}, alter all_planes 0 seconds with_values ALTITUDE=$alt and CALLSIGN=$call',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          name: 'myfile.sbs',
        },
        undefined,
        { haveLabel: false, haveRealism: false },
        alterationManager
      )

      assert.equal(alteredRecordings.length, 0)
      assert.equal(!error, false)
    })
  })

  context('when syntax scenario is valid', () => {
    it('returns an altered recording', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes at 8 seconds',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          name: 'myfile.sbs',
        },
        undefined,
        { haveLabel: false, haveRealism: false },
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 1)
    })

    it('returns 2 altered recording if variables are defined', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'let $call = {"SAMU77", "SAMU90"}, alter all_planes at 0 seconds with_values CALLSIGN=$call',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          name: 'myfile.sbs',
        },
        undefined,
        { haveLabel: false, haveRealism: false },
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 2)
    })

    it('returns 2 altered recording if variables are defined and the scenario is a replay', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'let $call = {0, 10}, replay all_planes from $call seconds until 1000 seconds ',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          name: 'myfile.sbs',
        },
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
          name: 'myfile2.sbs',
        },
        { haveLabel: false, haveRealism: false },
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 2)
    })
  })
})
