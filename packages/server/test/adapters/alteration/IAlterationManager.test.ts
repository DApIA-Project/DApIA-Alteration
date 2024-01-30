import IContractTest from '../../IContractTest'
import { makeProductionAdapters } from '../../makeTestAdapters'
import IAlterationManager from '../../../api/adapters/IAlterationManager'
import { Recording } from '@smartesting/shared/dist/models/index'
import assert from 'assert'

/**
 * Format a ADS-B message to prepare it for comparaison
 * The function remove whitespace, empty line, non significant number (.0) 
 * The function truncate float with only n significant digit
 * @param str: the recording
 * @param n : the number of significant digit in float
 */ 
function prepare_string(str: string, n: number) : string {
	if(!n) n = '';

	return str.replace(/ +/g ,'')
						.split("\n").filter((s) => s.length > 0).join("\n")
						.replace(/\.0+([,\n])/g, '$1')
						.replace(new RegExp(`([0-9]+)\.([0-9]{1,${n}})[0-9]*,`, "g"), '$1.$2,')
}


const IAlterationContractTest: IContractTest = (
  implementationName,
  makeAdapters
) => {
  describe(implementationName, () => {
    let alterationManager: IAlterationManager
    let content = ''
    let contentReplay = ''

    beforeEach(async () => {
      const adapters = makeAdapters()
      alterationManager = adapters.alterationManager
      content =
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000.0,,,48.2206,3.557,,,0,0,0,0\n' +
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.63,336.31,,,0.0,,,,,\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000.0,,,48.2219,3.5562,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000.0,,,48.226,3.5534,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n' +
        'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n' +
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.63,336.31,,,0,,,,,\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000.0,,,48.2293,3.5513,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000.0,,,48.228,3.5522,,,0,0,0,0\n' +
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000.0,,,48.2306,3.5505,,,0,0,0,0\n'

      contentReplay =
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:34.120,2016/12/09,09:13:35.077,,7250,,,,,,,0,,0,0\n' +
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:34.173,2016/12/09,09:13:35.077,,7250,,,,,,,0,,0,0\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:34.285,2016/12/09,09:13:35.077,,7325,,,49.01944,2.26868,,,0,0,0,0\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:34.285,2016/12/09,09:13:35.077,,7325,,,49.01944,2.26868,,,0,0,0,0\n' +
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:34.943,2016/12/09,09:13:35.077,,7325,,,,,,,0,,0,0\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:35.377,2016/12/09,09:13:36.092,,7375,,,49.01997,2.26694,,,0,0,0,0\n' +
        'MSG,4,1,4837,A4A445,18147,2016/12/09,09:13:35.813,2016/12/09,09:13:36.092,,,265.4,291.4,,,2816,,,,,\n' +
        'MSG,4,1,4837,A4A445,18147,2016/12/09,09:13:35.813,2016/12/09,09:13:36.092,,,265.4,291.4,,,2816,,,,,\n' +
        'MSG,8,1,4837,A4A445,18147,2016/12/09,09:13:35.816,2016/12/09,09:13:36.092,,,,,,,,,,,,0\n' +
        'MSG,8,1,4837,A4A445,18147,2016/12/09,09:13:35.926,2016/12/09,09:13:36.092,,,,,,,,,,,,0\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:35.926,2016/12/09,09:13:36.092,,7400,,,49.02013,2.26593,,,0,0,0,0\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:36.363,2016/12/09,09:13:37.106,,7425,,,49.02049,2.26523,,,0,0,0,0\n' +
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:37.019,2016/12/09,09:13:37.106,,7425,,,,,,,0,,0,0\n' +
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:37.019,2016/12/09,09:13:37.106,,7425,,,,,,,0,,0,0\n' +
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:37.019,2016/12/09,09:13:37.106,,7425,,,,,,,0,,0,0\n' +
        'MSG,4,1,4837,A4A445,18147,2016/12/09,09:13:37.234,2016/12/09,09:13:38.121,,,266.5,290.9,,,2688,,,,,\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:37.450,2016/12/09,09:13:38.121,,7475,,,49.02081,2.26333,,,0,0,0,0\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:37.450,2016/12/09,09:13:38.121,,7475,,,49.02081,2.26333,,,0,0,0,0\n' +
        'MSG,4,1,4837,A4A445,18147,2016/12/09,09:13:37.776,2016/12/09,09:13:38.121,,,269.6,292.0,,,2624,,,,,\n' +
        'MSG,4,1,4837,A4A445,18147,2016/12/09,09:13:37.777,2016/12/09,09:13:38.121,,,269.6,292.0,,,2624,,,,,\n' +
        'MSG,1,1,4837,A4A445,18147,2016/12/09,09:13:38.110,2016/12/09,09:13:38.121,AAL45,,,,,,,,,,,\n' +
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:38.215,2016/12/09,09:13:39.135,,7475,,,,,,,0,,0,0\n' +
        'MSG,3,1,4837,A4A445,18147,2016/12/09,09:13:38.435,2016/12/09,09:13:39.135,,7525,,,49.02136,2.26163,,,0,0,0,0\n' +
        'MSG,5,1,4837,A4A445,18147,2016/12/09,09:13:38.761,2016/12/09,09:13:39.135,,7525,,,,,,,0,,0,0\n' +
        'MSG,8,1,4837,A4A445,18147,2016/12/09,09:13:38.981,2016/12/09,09:13:39.135,,,,,,,,,,,,0\n'
    })

    it('No modification', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    action: [],
                    filter: '',
                    record: 'zigzag.sbs',
                    firstDate: 1543148536239,
                    sID: '',
                    sensorType: 'SBS',
                  },
                ],
              },
            },
          ],
          { name: 'zigzag.sbs', content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag_0.sbs'
      )

      assert.deepStrictEqual(prepare_string(recordingsAltered[0].content), prepare_string(content));
    })

    it('valid hide all-planes from until', async () => {
      let recordingsAltered: Recording[] =
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
          { name: 'zigzag.sbs', content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag_0.sbs'
      )
      assert.deepStrictEqual(
        prepare_string(recordingsAltered[0].content, 1),
        prepare_string('MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000,,,48.226,3.5534,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000,,,48.2293,3.5513,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000,,,48.228,3.5522,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.2306,3.5505,,,0,0,0,0\n' +
          '\n', 1)
      )
    })

    it('valid alter all-planes at', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'ALTERATION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '46484',
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
                              value: 'B2B2B2',
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
          { name: 'zigzag2.sbs', content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        prepare_string(recordingsAltered[0].content, 1),
        prepare_string('MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          'MSG,4,3,5022202,B2B2B2,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000,,,48.2219,3.5562,,,0,0,0,0\n' +
          'MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000,,,48.226,3.5534,,,0,0,0,0\n' +
          'MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,1,3,5022202,B2B2B2,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
          'MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,4,3,5022202,B2B2B2,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000,,,48.2293,3.5513,,,0,0,0,0\n' +
          'MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000,,,48.228,3.5522,,,0,0,0,0\n' +
          'MSG,3,3,5022202,B2B2B2,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.2306,3.5505,,,0,0,0,0\n' +
          '\n', 1)
      )
    })

    it('valid alter trajectory at', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'TRAJECTORY',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '4484',
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
                                    value: '48.2207',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '3.558',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 9000,
                                  offset: false,
                                },
                                time: 222,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '48.2209',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '3.56',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 9000,
                                  offset: false,
                                },
                                time: 444,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '48.221',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '3.562',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 9000,
                                  offset: false,
                                },
                                time: 666,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '48.223',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '3.564',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 9000,
                                  offset: false,
                                },
                                time: 888,
                              },
                              {
                                vertex: {
                                  lat: {
                                    value: '48.225',
                                    offset: false,
                                  },
                                  lon: {
                                    value: '3.566',
                                    offset: false,
                                  },
                                },
                                altitude: {
                                  value: 9000,
                                  offset: false,
                                },
                                time: 1000,
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
          { name: 'zigzag2.sbs', content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[0].content,
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,11050,517.6,336.3,48.22068,3.55776,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,9000,,,48.22096,3.56143,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,12975,,,48.24114,3.57814,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,15675,,,48.24199,3.5763,,,0,0,0,0\n' +
          'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,17625,,,48.24158,3.57392,,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,19125,,,48.24089,3.57172,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,20350,517.6,336.3,48.24014,3.56973,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,23325,,,48.23779,3.56439,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,23400,,,48.23772,3.56424,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.2306,3.5505,,,0,0,0,0\n' +
          '\n'
      )
    })

    it('valid saturate', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'SATURATION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '4000',
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
                              value: '1',
                            },
                            {
                              mode: 'simple',
                              key: 'AIRCRAFT_NUMBER',
                              number: '1',
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
          { name: 'zigzag2.sbs', content: content },
          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[0].content.split('\n').length,
        23
      )
    })

    it('valid replay', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'REPLAY',
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
                          recordPath: 'temp/testReplay.sbs',
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          { name: 'zigzag2.sbs', content: content },

          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          },
          { name: 'testReplay.sbs', content: contentReplay }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[0].content,
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          'MSG,5,1,4837,A4A445,18147,2018/11/25,12:22:16.239,2018/11/25,12:22:17.196,,7250,,,,,,,0,,0,0\n' +
          'MSG,5,1,4837,A4A445,18147,2018/11/25,12:22:16.292,2018/11/25,12:22:17.196,,7250,,,,,,,0,,0,0\n' +
          'MSG,3,1,4837,A4A445,18147,2018/11/25,12:22:16.404,2018/11/25,12:22:17.196,,7325,,,49.01944,2.26868,,,0,0,0,0\n' +
          'MSG,3,1,4837,A4A445,18147,2018/11/25,12:22:16.404,2018/11/25,12:22:17.196,,7325,,,49.01944,2.26868,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000,,,48.2219,3.5562,,,0,0,0,0\n' +
          'MSG,5,1,4837,A4A445,18147,2018/11/25,12:22:17.062,2018/11/25,12:22:17.196,,7325,,,,,,,0,,0,0\n' +
          'MSG,3,1,4837,A4A445,18147,2018/11/25,12:22:17.496,2018/11/25,12:22:18.211,,7375,,,49.01997,2.26694,,,0,0,0,0\n' +
          'MSG,4,1,4837,A4A445,18147,2018/11/25,12:22:17.932,2018/11/25,12:22:18.211,,,265.4,291.4,,,2816,,,,,\n' +
          'MSG,4,1,4837,A4A445,18147,2018/11/25,12:22:17.932,2018/11/25,12:22:18.211,,,265.4,291.4,,,2816,,,,,\n' +
          'MSG,8,1,4837,A4A445,18147,2018/11/25,12:22:17.935,2018/11/25,12:22:18.211,,,,,,,,,,,,0\n' +
          'MSG,8,1,4837,A4A445,18147,2018/11/25,12:22:18.045,2018/11/25,12:22:18.211,,,,,,,,,,,,0\n' +
          'MSG,3,1,4837,A4A445,18147,2018/11/25,12:22:18.045,2018/11/25,12:22:18.211,,7400,,,49.02013,2.26593,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000,,,48.226,3.5534,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000,,,48.2293,3.5513,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000,,,48.228,3.5522,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.2306,3.5505,,,0,0,0,0\n' +
          '\n'
      )
    })

    it('valid delay', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'ALTERATIONTIMESTAMP',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '4000',
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
                              value: '6000',
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
          { name: 'zigzag2.sbs', content: content },

          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[0].content,
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:22.239,2018/11/25,12:22:22.239,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:22.424,2018/11/25,12:22:22.424,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:22.842,2018/11/25,12:22:22.842,,30000,,,48.2219,3.5562,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:24.758,2018/11/25,12:22:24.758,,30000,,,48.226,3.5534,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:25.221,2018/11/25,12:22:25.221,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:25.501,2018/11/25,12:22:25.501,AZA676,,,,,,,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:25.695,2018/11/25,12:22:25.695,,29975,,,48.2271,3.5527,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:25.843,2018/11/25,12:22:25.843,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:26.171,2018/11/25,12:22:26.171,,30000,,,48.2293,3.5513,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:26.179,2018/11/25,12:22:26.179,,30000,,,48.228,3.5522,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.2306,3.5505,,,0,0,0,0\n' +
          '\n'
      )
    })

    it('valid rotate', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'ROTATION',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '5000',
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
          { name: 'zigzag2.sbs', content: content },

          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[0].content,
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000,,,48.22113,3.55895,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000,,,48.223,3.56511,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975,,,48.22346,3.56676,,,0,0,0,0\n' +
          'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975,,,48.22346,3.56676,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000,,,48.2244,3.57006,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000,,,48.2238,3.56811,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.22493,3.57201,,,0,0,0,0\n' +
          '\n'
      )
    })

    it('valid cut', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'CUT',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '2000',
                          upperBound: '4000',
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
          { name: 'zigzag2.sbs', content: content },

          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[0].content,
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000,,,48.2219,3.5562,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.800,2018/11/25,12:22:20.800,,30000,,,48.226,3.5534,,,0,0,0,0\n' +
          '\n'
      )
    })

    it('valid declaration variable', async () => {
      let recordingsAltered: Recording[] =
        await alterationManager.runAlterations(
          [
            {
              sensors: {
                sensor: [
                  {
                    sensorType: 'SBS',
                    sID: '',
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'CUT',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '1000',
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
                    record: 'zigzag2.sbs',
                    firstDate: 1543148536239,
                    filter: '',
                    action: [
                      {
                        alterationType: 'CUT',
                        scope: {
                          type: 'timeWindow',
                          lowerBound: '0',
                          upperBound: '4000',
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
          { name: 'zigzag2.sbs', content: content },

          {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLatitude: false,
            haveDisableLongitude: false,
            haveDisableAltitude: false,
          }
        )

      assert.deepStrictEqual(
        recordingsAltered[0].name,
        'modified__zigzag2_0.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[0].content,
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:17.758,2018/11/25,12:22:18.758,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.221,2018/11/25,12:22:19.221,,29975,,,48.2217,3.5563,,,0,0,0,0\n' +
          'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.695,2018/11/25,12:22:19.695,,29975,,,48.2217,3.5563,,,0,0,0,0\n' +
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.843,2018/11/25,12:22:19.843,,,517.6,336.3,,,0,,,,,\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.171,2018/11/25,12:22:20.171,,30000,,,48.2239,3.5549,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.179,2018/11/25,12:22:20.179,,30000,,,48.2226,3.5558,,,0,0,0,0\n' +
          'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.800,2018/11/25,12:22:20.800,,30000,,,48.2252,3.5541,,,0,0,0,0\n' +
          '\n'
      )
      assert.deepStrictEqual(
        recordingsAltered[1].name,
        'modified__zigzag2_1.sbs'
      )
      assert.deepStrictEqual(
        recordingsAltered[1].content,
        'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.800,2018/11/25,12:22:20.800,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
          '\n'
      )
    })
  })
}

IAlterationContractTest('JavaAlterationManager', makeProductionAdapters)
