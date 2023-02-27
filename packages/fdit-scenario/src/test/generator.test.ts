import { generateCommands } from "../generator/generator";
import { ASTScenario } from "../language-server/generated/ast";
import { EmptyFileSystem } from "langium";
import { createFditscenarioServices } from "../language-server/fditscenario-module";
import { extractAstNodeFromString } from "../web";


describe('generatorTest', () => {
    
    
  test('callGenerateCommandsEmpty', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("", services);
      expect(generateCommands(await scenario,"")).toStrictEqual({"sensors": {"sensor": [{"action": [], "filter": "", "record": "", "sID": "", "sensorType": "SBS"}]}})
  })

  test('callGenerateCommandsHideAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes from 56 seconds until 90 seconds", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "DELETION",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "56000",
                                      "upperBound": "90000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      },
                                      "parameter": [
                                          {
                                              "mode": "simple",
                                              "frequency": ""
                                          }
                                      ]
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })


  test('callGenerateCommandsAlterAllPlanesValues', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_values ALTITUDE = 90000 and LATITUDE -= 456 and ICAO *= 900 and TRACK ++= 800", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "ALTERATION",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "56000",
                                      "upperBound": "90000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      },
                                      "parameter": [
                                          {
                                              "mode": "simple",
                                              "key": "altitude",
                                              "value": "90000"
                                          },
                                          {
                                              "mode": "offset",
                                              "key": "latitude",
                                              "value": "456"
                                          },
                                          {
                                              "mode": "noise",
                                              "key": "icao",
                                              "value": "900"
                                          },
                                          {
                                              "mode": "drift",
                                              "key": "track",
                                              "value": "800"
                                          }
                                      ]
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })


  test('callGenerateCommandsAlterAllPlanesValuesOther', async () => {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_values CALLSIGN = 90000 and EMERGENCY -= 456 and GROUNDSPEED *= 900 and LONGITUDE ++= 800 and SPI = 67 and SQUAWK = 78", services);
    expect(generateCommands(await scenario,"")).toStrictEqual(
        {
            "sensors": {
                "sensor": [
                    {
                        "sensorType": "SBS",
                        "sID": "",
                        "record": "",
                        "filter": "",
                        "action": [
                            {
                                "alterationType": "ALTERATION",
                                "scope": {
                                    "type": "timeWindow",
                                    "lowerBound": "56000",
                                    "upperBound": "90000"
                                },
                                "parameters": {
                                    "target": {
                                        "identifier": "hexIdent",
                                        "value": "ALL"
                                    },
                                    "parameter": [
                                        {
                                            "mode": "simple",
                                            "key": "callsign",
                                            "value": "90000"
                                        },
                                        {
                                            "mode": "offset",
                                            "key": "emergency",
                                            "value": "456"
                                        },
                                        {
                                            "mode": "noise",
                                            "key": "groundSpeed",
                                            "value": "900"
                                        },
                                        {
                                            "mode": "drift",
                                            "key": "longitude",
                                            "value": "800"
                                        },
                                        {
                                            "mode": "simple",
                                            "key": "SPI",
                                            "value": "67"
                                        },
                                        {
                                            "mode": "simple",
                                            "key": "squawk",
                                            "value": "78"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    )
})


  test('callGenerateCommandsCreateAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds, (45,78) with_altitude 90000 at 78 seconds] with_values ICAO=6777", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "CREATION",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "56000",
                                      "upperBound": "89000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": ""
                                      },
                                      "trajectory": {
                                          "waypoint": [
                                              {
                                                  "vertex": {
                                                      "lat": {
                                                          "value": 45,
                                                          "offset": false
                                                      },
                                                      "lon": {
                                                          "value": 78,
                                                          "offset": false
                                                      }
                                                  },
                                                  "altitude": {
                                                      "value": 90000,
                                                      "offset": false
                                                  },
                                                  "time": 78000
                                              },
                                              {
                                                  "vertex": {
                                                      "lat": {
                                                          "value": 12,
                                                          "offset": false
                                                      },
                                                      "lon": {
                                                          "value": 70,
                                                          "offset": false
                                                      }
                                                  },
                                                  "altitude": {
                                                      "value": 7000,
                                                      "offset": false
                                                  },
                                                  "time": 99000
                                              },
                                              {
                                                  "vertex": {
                                                      "lat": {
                                                          "value": 45,
                                                          "offset": false
                                                      },
                                                      "lon": {
                                                          "value": 78,
                                                          "offset": false
                                                      }
                                                  },
                                                  "altitude": {
                                                      "value": 90000,
                                                      "offset": false
                                                  },
                                                  "time": 78000
                                              }
                                          ]
                                      },
                                      "parameter": [
                                          {
                                              "mode": "simple",
                                              "key": "icao",
                                              "value": "6777"
                                          }
                                      ]
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })

  test('callGenerateCommandsAlterAllPlanesWaypoints', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds]", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "TRAJECTORY",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "56000",
                                      "upperBound": "90000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      },
                                      "trajectory": {
                                          "waypoint": [
                                              {
                                                  "vertex": {
                                                      "lat": {
                                                          "value": 45,
                                                          "offset": false
                                                      },
                                                      "lon": {
                                                          "value": 78,
                                                          "offset": false
                                                      }
                                                  },
                                                  "altitude": {
                                                      "value": 90000,
                                                      "offset": false
                                                  },
                                                  "time": 78000
                                              },
                                              {
                                                  "vertex": {
                                                      "lat": {
                                                          "value": 12,
                                                          "offset": false
                                                      },
                                                      "lon": {
                                                          "value": 70,
                                                          "offset": false
                                                      }
                                                  },
                                                  "altitude": {
                                                      "value": 7000,
                                                      "offset": false
                                                  },
                                                  "time": 99000
                                              }
                                          ]
                                      }
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })

  test('callGenerateCommandsAlterSpeedAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("alter_speed all_planes from 56 seconds until 90 seconds with_values EAST_WEST_VELOCITY = 78 and NORTH_SOUTH_VELOCITY = 45", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "ALTERATIONSPEED",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "56000",
                                      "upperBound": "90000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      },
                                      "parameter": [
                                          {
                                              "mode": "simple",
                                              "key": "EAST_WEST_VELOCITY",
                                              "value": "78"
                                          },
                                          {
                                              "mode": "simple",
                                              "key": "NORTH_SOUTH_VELOCITY",
                                              "value": "45"
                                          }
                                      ]
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })

  test('callGenerateCommandsSaturateAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("saturate all_planes from 56 seconds until 90 seconds with_values ICAO = 78 and NUMBER = 45", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "SATURATION",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "56000",
                                      "upperBound": "90000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      },
                                      "parameter": [
                                          {
                                              "mode": "simple",
                                              "number": "ICAO",
                                              "value": "78"
                                          },
                                          {
                                              "mode": "simple",
                                              "number": "AIRCRAFT_NUMBER",
                                              "value": "45"
                                          }
                                      ]
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })



test('callGenerateCommandsReplayAllPlaneWithoutFilter', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("replay all_planes from_recording 34 from 56 seconds until 90 seconds", services);
  expect(generateCommands(await scenario,"")).toStrictEqual(
      {
          "sensors": {
              "sensor": [
                  {
                      "sensorType": "SBS",
                      "sID": "",
                      "record": "",
                      "filter": "",
                      "action": [
                          {
                              "alterationType": "REPLAY",
                              "scope": {
                                  "type": "timeWindow",
                                  "lowerBound": "56000",
                                  "upperBound": "90000"
                              },
                              "parameters": {
                                  "target": {
                                      "identifier": "hexIdent",
                                      "value": "ALL"
                                  }
                              }
                          }
                      ]
                  }
              ]
          }
      }
  )
})


  test('callGenerateCommandsDelayAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("delay all_planes from 56 seconds until 90 seconds with_delay 55 seconds", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "ALTERATIONTIMESTAMP",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "56000",
                                      "upperBound": "90000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      },
                                      "parameter": [
                                          {
                                              "mode": "simple",
                                              "value": "55000"
                                          }
                                      ]
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })

  test('callGenerateCommandsRotateAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("rotate all_planes from 67 seconds until 99 seconds with_angle 90", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "ROTATION",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "67000",
                                      "upperBound": "99000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      },
                                      "parameter": [
                                          {
                                              "mode": "simple",
                                              "angle": "angle",
                                              "value": "90"
                                          }
                                      ]
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })


  test('callGenerateCommandsCutAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("cut all_planes from 13 seconds until 88 seconds", services);
      expect(generateCommands(await scenario,"")).toStrictEqual(
          {
              "sensors": {
                  "sensor": [
                      {
                          "sensorType": "SBS",
                          "sID": "",
                          "record": "",
                          "filter": "",
                          "action": [
                              {
                                  "alterationType": "CUT",
                                  "scope": {
                                      "type": "timeWindow",
                                      "lowerBound": "13000",
                                      "upperBound": "88000"
                                  },
                                  "parameters": {
                                      "target": {
                                          "identifier": "hexIdent",
                                          "value": "ALL"
                                      }
                                  }
                              }
                          ]
                      }
                  ]
              }
          }
      )
  })


  test('callGenerateCommandsDeclarationRange', async () => {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = extractAstNodeFromString<ASTScenario>("let $test = [2,8], cut all_planes from 13 seconds until 88 seconds", services);
    expect(generateCommands(await scenario,"")).toStrictEqual(
        {
            "sensors": {
                "sensor": [
                    {
                        "sensorType": "SBS",
                        "sID": "",
                        "record": "",
                        "filter": "",
                        "action": [
                            {
                                "alterationType": "CUT",
                                "scope": {
                                    "type": "timeWindow",
                                    "lowerBound": "13000",
                                    "upperBound": "88000"
                                },
                                "parameters": {
                                    "target": {
                                        "identifier": "hexIdent",
                                        "value": "ALL"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    )
})

test('callGenerateCommandsDeclarationList', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("let $test = {\"salut\",\"ola\"}, cut all_planes from 13 seconds until 88 seconds", services);
  expect(generateCommands(await scenario,"")).toStrictEqual(
      {
          "sensors": {
              "sensor": [
                  {
                      "sensorType": "SBS",
                      "sID": "",
                      "record": "",
                      "filter": "",
                      "action": [
                          {
                              "alterationType": "CUT",
                              "scope": {
                                  "type": "timeWindow",
                                  "lowerBound": "13000",
                                  "upperBound": "88000"
                              },
                              "parameters": {
                                  "target": {
                                      "identifier": "hexIdent",
                                      "value": "ALL"
                                  }
                              }
                          }
                      ]
                  }
              ]
          }
      }
  )
})


test('callGenerateCommandsTimescopeAt', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes at 67 seconds", services);
  expect(generateCommands(await scenario,"")).toStrictEqual(
      {
          "sensors": {
              "sensor": [
                  {
                      "sensorType": "SBS",
                      "sID": "",
                      "record": "",
                      "filter": "",
                      "action": [
                          {
                              "alterationType": "DELETION",
                              "scope": {
                                  "type": "timeWindow",
                                  "lowerBound": "67000",
                                  "upperBound": "89000"
                              },
                              "parameters": {
                                  "target": {
                                      "identifier": "hexIdent",
                                      "value": "ALL"
                                  }
                              }
                          }
                      ]
                  }
              ]
          }
      }
  )
})


test('callGenerateCommandsTimescopeAtFor', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes at 67 seconds for 89 seconds", services);
  expect(generateCommands(await scenario,"")).toStrictEqual(
      {
          "sensors": {
              "sensor": [
                  {
                      "sensorType": "SBS",
                      "sID": "",
                      "record": "zigzag.sbs",
                      "filter": "",
                      "action": [
                          {
                              "alterationType": "DELETION",
                              "scope": {
                                  "type": "timeWindow",
                                  "lowerBound": "67000",
                                  "upperBound": "156000"
                              },
                              "parameters": {
                                  "target": {
                                      "identifier": "hexIdent",
                                      "value": "ALL"
                                  }
                              }
                          }
                      ]
                  }
              ]
          }
      }
  )
})

test('callGenerateCommandsHideWithFrequency', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes from 56 seconds until 89 seconds with_frequency 89", services);
  expect(generateCommands(await scenario,"")).toStrictEqual(
      {
          "sensors": {
              "sensor": [
                  {
                      "sensorType": "SBS",
                      "sID": "",
                      "record": "",
                      "filter": "",
                      "action": [
                          {
                              "alterationType": "DELETION",
                              "scope": {
                                  "type": "timeWindow",
                                  "lowerBound": "56000",
                                  "upperBound": "89000"
                              },
                              "parameters": {
                                  "target": {
                                      "identifier": "hexIdent",
                                      "value": "ALL"
                                  },
                                  "parameter": [
                                      {
                                          "mode": "simple",
                                          "frequency": "89"
                                      }
                                  ]
                              }
                          }
                      ]
                  }
              ]
          }
      }
  )
})

test('callGenerateCommandsCreateWithParameters', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds] with_values ICAO = 8 and CALLSIGN = 44 and SQUAWK = 900 and EMERGENCY = 786 and ALERT = 56 and SPI = 1234", services);
  expect(generateCommands(await scenario,"")).toStrictEqual(
      {
          "sensors": {
              "sensor": [
                  {
                      "sensorType": "SBS",
                      "sID": "",
                      "record": "",
                      "filter": "",
                      "action": [
                          {
                              "alterationType": "CREATION",
                              "scope": {
                                  "type": "timeWindow",
                                  "lowerBound": "56000",
                                  "upperBound": "89000"
                              },
                              "parameters": {
                                  "target": {
                                      "identifier": "hexIdent",
                                      "value": ""
                                  },
                                  "trajectory": {
                                      "waypoint": [
                                          {
                                              "vertex": {
                                                  "lat": {
                                                      "value": 45,
                                                      "offset": false
                                                  },
                                                  "lon": {
                                                      "value": 78,
                                                      "offset": false
                                                  }
                                              },
                                              "altitude": {
                                                  "value": 90000,
                                                  "offset": false
                                              },
                                              "time": 78000
                                          },
                                          {
                                              "vertex": {
                                                  "lat": {
                                                      "value": 12,
                                                      "offset": false
                                                  },
                                                  "lon": {
                                                      "value": 70,
                                                      "offset": false
                                                  }
                                              },
                                              "altitude": {
                                                  "value": 7000,
                                                  "offset": false
                                              },
                                              "time": 99000
                                          }
                                      ]
                                  },
                                  "parameter": [
                                      {
                                          "mode": "simple",
                                          "key": "icao",
                                          "value": "8"
                                      },
                                      {
                                          "mode": "simple",
                                          "key": "callsign",
                                          "value": "44"
                                      },
                                      {
                                          "mode": "simple",
                                          "key": "squawk",
                                          "value": "900"
                                      },
                                      {
                                          "mode": "simple",
                                          "key": "emergency",
                                          "value": "786"
                                      },
                                      {
                                          "mode": "simple",
                                          "key": "alert",
                                          "value": "56"
                                      },
                                      {
                                          "mode": "simple",
                                          "key": "SPI",
                                          "value": "1234"
                                      }
                                  ]
                              }
                          }
                      ]
                  }
              ]
          }
      }
  )
})

test('callGenerateCommandsReplayPlaneWithParameters', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("replay all_planes from_recording 34 from 56 seconds until 90 seconds with_values ALTITUDE = 90000 and LATITUDE -= 456 and ICAO *= 900 and TRACK ++= 800 and CALLSIGN --= 90000 and EMERGENCY += 456 and GROUNDSPEED *= 900 and LONGITUDE ++= 800 and SPI = 67 and SQUAWK = 78", services);
  expect(generateCommands(await scenario,"")).toStrictEqual(
      {
          "sensors": {
              "sensor": [
                  {
                      "sensorType": "SBS",
                      "sID": "",
                      "record": "",
                      "filter": "",
                      "action": [
                          {
                              "alterationType": "REPLAY",
                              "scope": {
                                  "type": "timeWindow",
                                  "lowerBound": "56000",
                                  "upperBound": "90000"
                              },
                              "parameters": {
                                  "target": {
                                      "identifier": "hexIdent",
                                      "value": "ALL"
                                  },
                                  "parameter": [
                                      {
                                          "mode": "simple",
                                          "key": "altitude",
                                          "value": "90000"
                                      },
                                      {
                                          "mode": "offset",
                                          "key": "latitude",
                                          "value": "-456"
                                      },
                                      {
                                          "mode": "noise",
                                          "key": "icao",
                                          "value": "900"
                                      },
                                      {
                                          "mode": "drift",
                                          "key": "track",
                                          "value": "+800"
                                      },
                                      {
                                          "mode": "drift",
                                          "key": "callsign",
                                          "value": "-90000"
                                      },
                                      {
                                          "mode": "offset",
                                          "key": "emergency",
                                          "value": "+456"
                                      },
                                      {
                                          "mode": "noise",
                                          "key": "groundspeed",
                                          "value": "900"
                                      },
                                      {
                                          "mode": "drift",
                                          "key": "longitude",
                                          "value": "+800"
                                      },
                                      {
                                          "mode": "simple",
                                          "key": "spi",
                                          "value": "67"
                                      },
                                      {
                                          "mode": "simple",
                                          "key": "squawk",
                                          "value": "78"
                                      }
                                  ]
                              }
                          }
                      ]
                  }
              ]
          }
      }
  )
})

})

