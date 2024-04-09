import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import assert from 'assert'
import alterRecording from '../../../api/core/recording/alterRecording'
import makeTestAdapters from '../../makeTestAdapters'
import IAlterationManager from '../../../api/adapters/IAlterationManager'
import { FileFormat } from '@smartesting/shared/dist'

describe(`core/alterRecording`, () => {
  let server: express.Express
  let alterationManager: IAlterationManager

  beforeEach(() => {
    alterationManager = makeTestAdapters().alterationManager
    server = setupExpress(makeTestAdapters())
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
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.sbs,
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
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.sbs,
        alterationManager
      )

      assert.equal(alteredRecordings.length, 0)
      assert.equal(!error, false)
    })
  })

  context('when syntax scenario is valid', () => {
    it('returns an altered recording', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes at 2 seconds',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:49.179,2018/11/25,11:30:49.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:50.179,2018/11/25,11:30:50.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:51.179,2018/11/25,11:30:51.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:52.179,2018/11/25,11:30:52.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:53.179,2018/11/25,11:30:53.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:54.179,2018/11/25,11:30:54.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:55.179,2018/11/25,11:30:55.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:56.179,2018/11/25,11:30:56.179,,,474.53,295.86,,,0.0,,,,,\n',
          name: 'myfile.sbs',
        },
        undefined,
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.auto,
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
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.sbs,
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
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.sbs,
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 2)
    })

    it('returns altered recording if end of file have double \\n', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'replay all_planes from 0 seconds until 1000 seconds ',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n\n\n\n',
          name: 'myfile.sbs',
        },
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n\n\n\n',
          name: 'myfile2.sbs',
        },
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.sbs,
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 1)
    })

    it('returns an altered recording with output opensky csv', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes at 2 seconds',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:49.179,2018/11/25,11:30:49.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:50.179,2018/11/25,11:30:50.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:51.179,2018/11/25,11:30:51.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:52.179,2018/11/25,11:30:52.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:53.179,2018/11/25,11:30:53.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:54.179,2018/11/25,11:30:54.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:55.179,2018/11/25,11:30:55.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:56.179,2018/11/25,11:30:56.179,,,474.53,295.86,,,0.0,,,,,\n',
          name: 'myfile.sbs',
        },
        undefined,
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.openskyCsv,
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 1)
    })

    it('returns an altered recording with output drone csv', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes at 2 seconds',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:49.179,2018/11/25,11:30:49.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:50.179,2018/11/25,11:30:50.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:51.179,2018/11/25,11:30:51.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:52.179,2018/11/25,11:30:52.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:53.179,2018/11/25,11:30:53.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:54.179,2018/11/25,11:30:54.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:55.179,2018/11/25,11:30:55.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:56.179,2018/11/25,11:30:56.179,,,474.53,295.86,,,0.0,,,,,\n',
          name: 'myfile.sbs',
        },
        undefined,
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.droneCsv,
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 1)
    })

    it('returns an altered recording with output json', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes at 2 seconds',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:49.179,2018/11/25,11:30:49.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:50.179,2018/11/25,11:30:50.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:51.179,2018/11/25,11:30:51.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:52.179,2018/11/25,11:30:52.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:53.179,2018/11/25,11:30:53.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:54.179,2018/11/25,11:30:54.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:55.179,2018/11/25,11:30:55.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:56.179,2018/11/25,11:30:56.179,,,474.53,295.86,,,0.0,,,,,\n',
          name: 'myfile.sbs',
        },
        undefined,
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.json,
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 1)
    })

    it('returns an altered recording with output ndjson', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes at 2 seconds',
        {
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:49.179,2018/11/25,11:30:49.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:50.179,2018/11/25,11:30:50.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:51.179,2018/11/25,11:30:51.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:52.179,2018/11/25,11:30:52.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:53.179,2018/11/25,11:30:53.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:54.179,2018/11/25,11:30:54.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:55.179,2018/11/25,11:30:55.179,,,474.53,295.86,,,0.0,,,,,\n' +
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:56.179,2018/11/25,11:30:56.179,,,474.53,295.86,,,0.0,,,,,\n',
          name: 'myfile.sbs',
        },
        undefined,
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.ndjson,
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 1)
    })

    it('returns an altered recording with output opensky csv and input csv', async () => {
      const { error, alteredRecordings } = await alterRecording(
        'hide all_planes at 2 seconds',
        {
          content:
            'timestamp,icao24,latitude,longitude,groundspeed,track,vertical_rate,callsign,onground,alert,spi,squawk,altitude,geoaltitude\n' +
            '1647451819,39e40c,43.5889892578125,1.4977814430414245,54.0,154.85521436932106,0.0,FHZAM,False,False,False,7000,300.0,625.0\n' +
            '1647451820,39e40c,43.58872235831568,1.4979989188058036,58.0,154.3231843181618,0.0,FHZAM,False,False,False,7000,300.0,625.0\n' +
            '1647451821,39e40c,43.58830338817532,1.498260498046875,59.0,153.0041616059134,64.0,FHZAM,False,False,False,7000,300.0,625.0\n' +
            '1647451822,39e40c,43.58830338817532,1.498260498046875,61.0,152.5924245621816,320.0,FHZAM,False,False,False,7000,300.0,625.0\n' +
            '1647451823,39e40c,43.58830338817532,1.498260498046875,62.0,153.01976928177714,576.0,FHZAM,False,False,False,7000,300.0,650.0\n' +
            '1647451824,39e40c,43.58830338817532,1.498260498046875,62.0,153.01976928177714,576.0,FHZAM,False,False,False,7000,300.0,650.0\n' +
            '1647451825,39e40c,43.58734130859375,1.498931175054506,61.0,154.69862137458028,1024.0,FHZAM,False,False,False,7000,300.0,675.0\n' +
            '1647451826,39e40c,43.58706665039063,1.4990589230559594,60.0,154.29004621918872,960.0,FHZAM,False,False,False,7000,300.0,700.0\n' +
            '1647451827,39e40c,43.58683776855469,1.4992505450581397,59.0,153.8689994550614,960.0,FHZAM,False,False,False,7000,300.0,700.0\n' +
            '1647451828,39e40c,43.58672061208951,1.4993068150111606,59.0,153.8689994550614,960.0,FHZAM,False,False,False,7000,400.0,725.0\n' +
            '1647451829,39e40c,43.586517333984375,1.4995060410610466,59.0,152.56027205180067,832.0,FHZAM,False,False,False,7000,400.0,750.0\n',
          name: 'myfile.csv',
        },
        undefined,
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        FileFormat.auto,
        alterationManager
      )

      assert(!error, 'Error is defined')
      assert.equal(alteredRecordings.length, 1)
    })
  })
})
