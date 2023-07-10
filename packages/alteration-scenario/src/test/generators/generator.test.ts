import { EmptyFileSystem, LangiumServices } from 'langium'
import { createAlterationscenarioServices } from '../../language-server/alterationscenario-module'
import { generateStatements, parseScenario } from '../../web'
import assert from 'assert'

describe('generator', () => {
  let services: LangiumServices | null = null
  let fileContent = ''
  beforeEach(() => {
    fileContent =
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n' +
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:50:48.789,2018/11/25,11:50:48.789,,,474.53,295.86,,,0.0,,,,,'
    services =
      createAlterationscenarioServices(EmptyFileSystem).Alterationscenario
  })
  context('when scenario is no valid', () => {
    it('returns json with no action when content is empty', async () => {
      const scenario = await parseScenario('')
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
        {
          sensors: {
            sensor: [
              {
                action: [],
                filter: '',
                record: 'zigzag.sbs',
                firstDate: 1543145448179,
                sID: '',
                sensorType: 'SBS',
              },
            ],
          },
        }
      )
    })

    it('returns json with no action when content is false', async () => {
      const scenario = await parseScenario('edzvffd')
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
        {
          sensors: {
            sensor: [
              {
                action: [],
                filter: '',
                record: 'zigzag.sbs',
                firstDate: 1543145448179,
                sID: '',
                sensorType: 'SBS',
              },
            ],
          },
        }
      )
    })
  })

  context('when scenario is valid', () => {
    it('returns json with action when content is hide all_planes from until', async () => {
      const scenario = await parseScenario(
        'hide all_planes from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                      lowerBound: '56000',
                      upperBound: '90000',
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
        }
      )
    })

    it('returns json with action when content is hide all_planes at ', async () => {
      const scenario = await parseScenario('hide all_planes at 67 seconds')
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                      lowerBound: '67000',
                      upperBound: '1133610',
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
        }
      )
    })

    it('returns json with action when content is hide all_planes at for ', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 67 seconds for 89 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                      lowerBound: '67000',
                      upperBound: '156000',
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
        }
      )
    })

    it('returns json with action when content is alter all_planes with_values 1', async () => {
      const scenario = await parseScenario(
        'alter all_planes from 56 seconds until 90 seconds with_values ALTITUDE = 90000 and LATITUDE -= 456 and ICAO *= 900 and TRACK ++= 800'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'ALTERATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      parameter: [
                        {
                          mode: 'simple',
                          key: 'altitude',
                          value: '90000',
                        },
                        {
                          mode: 'offset',
                          key: 'latitude',
                          value: '-456',
                        },
                        {
                          mode: 'noise',
                          key: 'hexIdent',
                          value: '900',
                        },
                        {
                          mode: 'drift',
                          key: 'track',
                          value: '+800',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is alter all_planes with_values 2', async () => {
      const scenario = await parseScenario(
        'alter all_planes from 56 seconds until 90 seconds with_values CALLSIGN = 90000 and EMERGENCY -= 456 and GROUNDSPEED *= 900 and LONGITUDE ++= 800 and SPI = 67 and SQUAWK = 78'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'ALTERATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      parameter: [
                        {
                          mode: 'simple',
                          key: 'callsign',
                          value: '90000',
                        },
                        {
                          mode: 'offset',
                          key: 'emergency',
                          value: '-456',
                        },
                        {
                          mode: 'noise',
                          key: 'groundSpeed',
                          value: '900',
                        },
                        {
                          mode: 'drift',
                          key: 'longitude',
                          value: '+800',
                        },
                        {
                          mode: 'simple',
                          key: 'SPI',
                          value: '67',
                        },
                        {
                          mode: 'simple',
                          key: 'squawk',
                          value: '78',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is create with_waypoints with_values 1', async () => {
      const scenario = await parseScenario(
        'create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds, (45,78) with_altitude 90000 at 78 seconds] with_values ICAO=6777'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'CREATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '89000',
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
                                value: '45',
                                offset: false,
                              },
                              lon: {
                                value: '78',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 90000,
                              offset: false,
                            },
                            time: 78000,
                          },
                          {
                            vertex: {
                              lat: {
                                value: '12',
                                offset: false,
                              },
                              lon: {
                                value: '70',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 7000,
                              offset: false,
                            },
                            time: 99000,
                          },
                          {
                            vertex: {
                              lat: {
                                value: '45',
                                offset: false,
                              },
                              lon: {
                                value: '78',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 90000,
                              offset: false,
                            },
                            time: 78000,
                          },
                        ],
                      },
                      parameter: [
                        {
                          mode: 'simple',
                          key: 'hexIdent',
                          value: '6777',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is create with_waypoints with_values 2 ', async () => {
      const scenario = await parseScenario(
        'create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds] with_values ICAO = 8 and CALLSIGN = 44 and SQUAWK = 900 and EMERGENCY = 786 and ALERT = 56 and SPI = 1234'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'CREATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '89000',
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
                                value: '45',
                                offset: false,
                              },
                              lon: {
                                value: '78',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 90000,
                              offset: false,
                            },
                            time: 78000,
                          },
                          {
                            vertex: {
                              lat: {
                                value: '12',
                                offset: false,
                              },
                              lon: {
                                value: '70',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 7000,
                              offset: false,
                            },
                            time: 99000,
                          },
                        ],
                      },
                      parameter: [
                        {
                          mode: 'simple',
                          key: 'hexIdent',
                          value: '8',
                        },
                        {
                          mode: 'simple',
                          key: 'callsign',
                          value: '44',
                        },
                        {
                          mode: 'simple',
                          key: 'squawk',
                          value: '900',
                        },
                        {
                          mode: 'simple',
                          key: 'emergency',
                          value: '786',
                        },
                        {
                          mode: 'simple',
                          key: 'alert',
                          value: '56',
                        },
                        {
                          mode: 'simple',
                          key: 'SPI',
                          value: '1234',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is alter all_planes with_waypoints with_values ', async () => {
      const scenario = await parseScenario(
        'alter all_planes from 56 seconds until 90 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds]'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'TRAJECTORY',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '90000',
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
                                value: '45',
                                offset: false,
                              },
                              lon: {
                                value: '78',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 90000,
                              offset: false,
                            },
                            time: 78000,
                          },
                          {
                            vertex: {
                              lat: {
                                value: '12',
                                offset: false,
                              },
                              lon: {
                                value: '70',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 7000,
                              offset: false,
                            },
                            time: 99000,
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is saturate all_planes with_values ', async () => {
      const scenario = await parseScenario(
        'saturate all_planes from 56 seconds until 90 seconds with_values ICAO = 78 and NUMBER = 45'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'SATURATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '90000',
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
                          value: '78',
                        },
                        {
                          mode: 'simple',
                          key: 'AIRCRAFT_NUMBER',
                          number: '45',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is replay all_planes from until ', async () => {
      const scenario = await parseScenario(
        'replay all_planes from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, '34.sbs'),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      recordPath: 'temp/34.sbs',
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is delay all_planes from until with_delay ', async () => {
      const scenario = await parseScenario(
        'delay all_planes from 56 seconds until 90 seconds with_delay 55 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                      lowerBound: '56000',
                      upperBound: '90000',
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
                          value: '55000',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is rotate all_planes from until with_angle ', async () => {
      const scenario = await parseScenario(
        'rotate all_planes from 67 seconds until 99 seconds with_angle 90'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                      lowerBound: '67000',
                      upperBound: '99000',
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
        }
      )
    })

    it('returns json with action when content is cut all_planes from until ', async () => {
      const scenario = await parseScenario(
        'cut all_planes from 13 seconds until 88 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'CUT',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '13000',
                      upperBound: '88000',
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
        }
      )
    })

    it('returns json with action when content is with declaration and cut all_planes from until ', async () => {
      const scenario = await parseScenario(
        'let $test = [2,8], cut all_planes from 13 seconds until 88 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'CUT',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '13000',
                      upperBound: '88000',
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
        }
      )
    })

    it('returns json with action when content is hide all_planes from until with_frequency ', async () => {
      const scenario = await parseScenario(
        'hide all_planes from 56 seconds until 89 seconds with_frequency 89'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                      lowerBound: '56000',
                      upperBound: '89000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      parameter: [
                        {
                          mode: 'simple',
                          frequency: '89',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is replay with_values offset, simple, noise and drift ', async () => {
      const scenario = await parseScenario(
        'replay all_planes from 56 seconds until 90 seconds with_values ALTITUDE = 90000 and LATITUDE -= 456 and ICAO *= 900 and TRACK ++= 800 and CALLSIGN --= 90000 and EMERGENCY += 456 and GROUNDSPEED *= 900 and LONGITUDE ++= 800 and SPI = 67 and SQUAWK = 78'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, '34.sbs'),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      recordPath: 'temp/34.sbs',
                      parameter: [
                        {
                          mode: 'simple',
                          key: 'altitude',
                          value: '90000',
                        },
                        {
                          mode: 'offset',
                          key: 'latitude',
                          value: '-456',
                        },
                        {
                          mode: 'noise',
                          key: 'hexIdent',
                          value: '900',
                        },
                        {
                          mode: 'drift',
                          key: 'track',
                          value: '+800',
                        },
                        {
                          mode: 'drift',
                          key: 'callsign',
                          value: '-90000',
                        },
                        {
                          mode: 'offset',
                          key: 'emergency',
                          value: '+456',
                        },
                        {
                          mode: 'noise',
                          key: 'groundSpeed',
                          value: '900',
                        },
                        {
                          mode: 'drift',
                          key: 'longitude',
                          value: '+800',
                        },
                        {
                          mode: 'simple',
                          key: 'SPI',
                          value: '67',
                        },
                        {
                          mode: 'simple',
                          key: 'squawk',
                          value: '78',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is create without parameter ', async () => {
      const scenario = await parseScenario(
        'create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds]'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'CREATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '89000',
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
                                value: '45',
                                offset: false,
                              },
                              lon: {
                                value: '78',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 90000,
                              offset: false,
                            },
                            time: 78000,
                          },
                          {
                            vertex: {
                              lat: {
                                value: '12',
                                offset: false,
                              },
                              lon: {
                                value: '70',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 7000,
                              offset: false,
                            },
                            time: 99000,
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is with declaration and alter with_values constant ', async () => {
      const scenario = await parseScenario(
        'let $test = [2,8], alter all_planes from 13 seconds until 88 seconds with_values ALTITUDE = $test'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'ALTERATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '13000',
                      upperBound: '88000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      parameter: [
                        {
                          key: 'altitude',
                          mode: 'simple',
                          value: '$test',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is with declaration and alter with_values variable ', async () => {
      const scenario = await parseScenario(
        'let $test = [2,8], alter all_planes from 13 seconds until 88 seconds with_values ALTITUDE = #test'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'ALTERATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '13000',
                      upperBound: '88000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      parameter: [
                        {
                          key: 'altitude',
                          mode: 'simple',
                          value: '#test',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is create with_waypoints with_values and leftshift and rightshift ', async () => {
      const scenario = await parseScenario(
        'create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds] with_values ICAO = 8 and CALLSIGN = 44 and SQUAWK = << 900 and EMERGENCY = 786 and ALERT = 56 and SPI = >> 1234'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                    alterationType: 'CREATION',
                    scope: {
                      type: 'timeWindow',
                      lowerBound: '56000',
                      upperBound: '89000',
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
                                value: '45',
                                offset: false,
                              },
                              lon: {
                                value: '78',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 90000,
                              offset: false,
                            },
                            time: 78000,
                          },
                          {
                            vertex: {
                              lat: {
                                value: '12',
                                offset: false,
                              },
                              lon: {
                                value: '70',
                                offset: false,
                              },
                            },
                            altitude: {
                              value: 7000,
                              offset: false,
                            },
                            time: 99000,
                          },
                        ],
                      },
                      parameter: [
                        {
                          mode: 'simple',
                          key: 'hexIdent',
                          value: '8',
                        },
                        {
                          mode: 'simple',
                          key: 'callsign',
                          value: '44',
                        },
                        {
                          mode: 'simple',
                          key: 'squawk',
                          value: '900',
                        },
                        {
                          mode: 'simple',
                          key: 'emergency',
                          value: '786',
                        },
                        {
                          mode: 'simple',
                          key: 'alert',
                          value: '56',
                        },
                        {
                          mode: 'simple',
                          key: 'SPI',
                          value: '1234',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is replay all_planes from until REC_DURATION ', async () => {
      const scenario = await parseScenario(
        'replay all_planes from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(
          scenario.value,
          'zigzag.sbs',
          fileContent,
          'test.sbs'
        ),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      recordPath: 'temp/test.sbs',
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is replay all_planes from until REC_NBR_AIRCRAFT ', async () => {
      const scenario = await parseScenario(
        'replay all_planes from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(
          scenario.value,
          'zigzag.sbs',
          fileContent,
          '56.8REC_NBR_AIRCRAFT'
        ),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      recordPath: 'temp/56.8REC_NBR_AIRCRAFT',
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is replay all_planes from until ALT_DURATION ', async () => {
      const scenario = await parseScenario(
        'replay all_planes from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(
          scenario.value,
          'zigzag.sbs',
          fileContent,
          '56.8ALT_DURATION'
        ),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      recordPath: 'temp/56.8ALT_DURATION',
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is replay all_planes from until double ', async () => {
      const scenario = await parseScenario(
        'replay all_planes from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, '56.8'),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'ALL',
                      },
                      recordPath: 'temp/56.8',
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is hide planes from until', async () => {
      const scenario = await parseScenario(
        'hide plane satisfying "TESTES" from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, ''),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'random',
                      },
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })

    it('returns json with action when content is replay planes from until ', async () => {
      const scenario = await parseScenario(
        'replay planes satisfying "TESTE" from 56 seconds until 90 seconds'
      )
      assert.deepStrictEqual(
        generateStatements(scenario.value, 'zigzag.sbs', fileContent, '34.sbs'),
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
                      lowerBound: '56000',
                      upperBound: '90000',
                    },
                    parameters: {
                      target: {
                        identifier: 'hexIdent',
                        value: 'random',
                      },
                      recordPath: 'temp/34.sbs',
                    },
                  },
                ],
              },
            ],
          },
        }
      )
    })
  })
})
