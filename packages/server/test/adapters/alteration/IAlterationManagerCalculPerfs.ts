import IContractTest from '../../IContractTest'
import {
  makeMemoryAdapters,
  makeProductionAdapters,
} from '../../makeTestAdapters'
import { clearMemoryDb, clearProductionDb } from '../../clearDb'
import { readFile } from 'fs'
import { basename } from 'path'

const IAlterationContractTest: IContractTest = (
  implementationName,
  makeAdapters
) => {
  let content = ''
  let namefile = ''
  const filePath = 'test/adapters/alteration/zigzag.sbs'
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err)
      return
    }
    namefile = basename(filePath)
    content = data
  })

  describe(implementationName, async () => {
    it('hide all_planes from until calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: namefile,
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '2000',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('hide all_planes at with 15 variables calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 5; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '5000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '15000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '20000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '21000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '22000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '23000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '24000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '30000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '35000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '100000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '105000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '150000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '500000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '598000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'DELETION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '621000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 5
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('alter waypoints calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record:
                      'modified__modified__2022-03-16_17-30-19_FHZAM_39e40c_0_afterHide_0.sbs',
                    firstDate: 1647451819000,
                    filter: '',
                    action: [
                      {
                        alterationType: 'TRAJECTORY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '187000',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          trajectory: {
                            waypoint: [
                              {
                                vertex: {
                                  lat: {
                                    value: '43.613366',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.404111',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 750,
                                  offset: false,
                                },
                                time: 10000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.611997',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.408006',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 875,
                                  offset: false,
                                },
                                time: 20000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.609231',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.411383',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 1000,
                                  offset: false,
                                },
                                time: 30000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.607503',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.414276',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 1150,
                                  offset: false,
                                },
                                time: 40000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.604151',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.423374',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 1325,
                                  offset: false,
                                },
                                time: 60000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.602608',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.431892',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 1550,
                                  offset: false,
                                },
                                time: 80000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.600291',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.438329',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 1725,
                                  offset: false,
                                },
                                time: 100000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.595901',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.438782',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 1950,
                                  offset: false,
                                },
                                time: 120000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.589918',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.438749',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 2175,
                                  offset: false,
                                },
                                time: 140000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.583188',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.438295',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 2325,
                                  offset: false,
                                },
                                time: 160000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.577723',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.434903',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 2525,
                                  offset: false,
                                },
                                time: 180000,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '43.576212',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '1.434953',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 2425,
                                  offset: false,
                                },
                                time: 187000,
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('delay calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'ALTERATIONTIMESTAMP',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '10000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'timestamp',
                              value: '15000',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it(' 8 replay calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '15000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'AAAAAA',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU39',
                            },
                          ],
                        },
                      },
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '20000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'BBBBBB',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU40',
                            },
                          ],
                        },
                      },
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '25000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'CCCCCC',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU41',
                            },
                          ],
                        },
                      },
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '30000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'DDDDDD',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU42',
                            },
                          ],
                        },
                      },
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '35000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'EEEEEE',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU43',
                            },
                          ],
                        },
                      },
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '40000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'FFFFFF',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU44',
                            },
                          ],
                        },
                      },
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '45000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'ABABAB',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU45',
                            },
                          ],
                        },
                      },
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '50000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'ACACAC',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU46',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          { name: namefile, content: content }
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('1 replay calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 5; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'REPLAY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '15000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          recordPath: 'temp/zigzag.sbs',
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'AAAAAA',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU39',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          { name: namefile, content: content }
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 5
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('rotate calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543145448179,
                    filter: '',
                    action: [
                      {
                        alterationType: 'ROTATION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '60000',
                          upperBound: '3551544',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'angle',
                              angle: '90',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('cut calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'CUT',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '30000',
                          upperBound: '463484',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('alter values calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'ALTERATION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '10000',
                          upperBound: '463484',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'hexIdent',
                              value: 'AAAAAA',
                            },
                            {
                              mode: 'simple',
                              key: 'callsign',
                              value: 'SAMU39',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    it('saturate with 25 plane calcul perf', async () => {
      const adapters = makeAdapters()
      let alterationManager = adapters.alterationManager
      let total: number = 0
      for (let i: number = 0; i < 50; i++) {
        const startTime = new Date().getTime()
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'SATURATION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '5000',
                          upperBound: '463484',
                        },
                        parameters: {
                          target: {
                            identifier: 'hexIdent',
                            value: 'ALL',
                          },
                          parameter: [
                            {
                              mode: 'simple',
                              key: 'ICAO',
                              value: 'AAAAAA',
                            },
                            {
                              mode: 'simple',
                              key: 'AIRCRAFT_NUMBER',
                              number: '25',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: namefile, content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          undefined
        )
        const endTime = new Date().getTime()
        total = total + (endTime - startTime)
      }

      let moyenne = total / 50
      console.log("Moyenne de temps d'alteration: " + moyenne + 'ms')
    })

    /*it('alter waypoints calcul perf', async () => {

            const adapters = makeAdapters()
            let alterationManager = adapters.alterationManager
            let total : number = 0
            for(let i : number = 0; i<50; i++){
                const startTime = new Date().getTime()
                await alterationManager.runAlterations(
                    [

                    ],
                    { name: namefile, content: content },
                    {
                        haveLabel: false,
                        haveRealism: false,
                        haveNoise: false,
                        haveDisableLatitude: false,
                        haveDisableLongitude: false,
                        haveDisableAltitude: false,
                    },
                    undefined
                )
                const endTime = new Date().getTime()
                total = total + (endTime-startTime)
            }

            let moyenne = total/50
            console.log("Moyenne de temps d'alteration: " + moyenne + "ms")
        })*/
  })
}
describe('IAlterationManagerCalculPerf', () => {
  IAlterationContractTest(
    'JavaAlterationManager',
    makeMemoryAdapters,
    clearMemoryDb
  )

  IAlterationContractTest(
    'TypescriptAlterationManager',
    makeProductionAdapters,
    clearProductionDb
  )
})
