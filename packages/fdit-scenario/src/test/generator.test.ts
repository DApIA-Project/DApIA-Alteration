import { generateCommands } from "../generator/generator";
import { ASTScenario } from "../language-server/generated/ast";
import { EmptyFileSystem } from "langium";
import { createFditscenarioServices } from "../language-server/fditscenario-module";
import { extractAstNodeFromString } from "../web";


describe('generatorTest', () => {
    
    
  test('callGenerateCommandsEmpty', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("", services);
      expect(generateCommands(await scenario)).toStrictEqual([{ "instructions" : [],},])
  })

  test('callGenerateCommandsHideAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes from 56 seconds until 90 seconds", services);
      expect(generateCommands(await scenario)).toStrictEqual(
          [
              {
                  "instructions": [
                      {
                      "action": "DELETION",
                      "target": [
                        {
                          "identifier" : "ALL",
                          "filters" : []
                        }
                      ],
                      "scope": [
                          {
                          "type": "timeWindow",
                          "lowerBound": 56,
                          "upperBound": 90
                          }
                      ],
                      "trigger": [],
                      "frequency" : undefined,
                      "assertions" : []
                      }
                  ]
              }
        ]
      )
  })


  test('callGenerateCommandsAlterAllPlanesValues', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_values ALTITUDE = 90000 and LATITUDE -= 456 and ICAO *= 900 and TRACK ++= 800", services);
      expect(generateCommands(await scenario)).toStrictEqual(
          [
              {
                "instructions": [
                  {
                    "action": "ALTERATION",
                    "target": [
                      {
                        "identifier" : "ALL",
                        "filters" : []
                      }
                    ],
                    "scope": [
                      {
                        "type": "timeWindow",
                        "lowerBound": 56,
                        "upperBound": 90
                      }
                    ],
                    "trigger": [],
                    "parameters": [
                      {
                        "parameter": {
                          "name": "ALTITUDE",
                          "value": 90000
                        }
                      },
                      [
                        {
                          "parameter": {
                            "name": "LATITUDE",
                            "operation": "-=",
                            "value": 456
                          }
                        }
                      ],
                      [
                        {
                          "parameter": {
                            "name": "ICAO",
                            "value": 900
                          }
                        }
                      ],
                      [
                        {
                          "parameter": {
                            "name": "TRACK",
                            "operation": "++=",
                            "value": 800
                          }
                        }
                      ]
                    ],
                    "assertions" : []
                  }
                ]
              }
            ]
      )
  })


  test('callGenerateCommandsAlterAllPlanesValuesOther', async () => {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_values CALLSIGN = 90000 and EMERGENCY -= 456 and GROUNDSPEED *= 900 and LONGITUDE ++= 800 and SPI = 67 and SQUAWK = 78", services);
    expect(generateCommands(await scenario)).toStrictEqual(
        [
            {
              "instructions": [
                {
                  "action": "ALTERATION",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
                    }
                  ],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 56,
                      "upperBound": 90
                    }
                  ],
                  "trigger": [],
                  "parameters": [
                    {
                      "parameter": {
                        "name": "CALLSIGN",
                        "value": 90000
                      }
                    },
                    [
                      {
                        "parameter": {
                          "name": "EMERGENCY",
                          "operation": "-=",
                          "value": 456
                        }
                      }
                    ],
                    [
                      {
                        "parameter": {
                          "name": "GROUNDSPEED",
                          "value": 900
                        }
                      }
                    ],
                    [
                      {
                        "parameter": {
                          "name": "LONGITUDE",
                          "operation": "++=",
                          "value": 800
                        }
                      }
                    ],
                    [
                      {
                        "parameter": {
                          "name": "SPI",
                          "value": 67
                        }
                      }
                    ],
                    [
                      {
                        "parameter": {
                          "name": "SQUAWK",
                          "value": 78
                        }
                      }
                    ]
                  ],
                  "assertions" : []
                }
              ]
            }
          ]
    )
})


  test('callGenerateCommandsCreateAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds]", services);
      expect(generateCommands(await scenario)).toStrictEqual(
          [
              {
                "instructions": [
                  {
                    "action": "CREATION",
                    "scope": [
                      {
                        "type": "timeWindow",
                        "lowerBound": 56,
                        "upperBound": 89
                      }
                    ],
                    "trajectory": [
                      {
                        "latitude": 45,
                        "longitude": 78,
                        "altitude": 90000,
                        "time": 78
                      },
                      [
                        {
                          "latitude": 12,
                          "longitude": 70,
                          "altitude": 7000,
                          "time": 99
                        }
                      ]
                    ],
                    "parameters" : [],
                    "assertions" : []
                  }
                ]
              }
            ]
      )
  })

  test('callGenerateCommandsAlterAllPlanesWaypoints', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds]", services);
      expect(generateCommands(await scenario)).toStrictEqual(
          [
              {
                  "instructions": [
                    {
                      "action": "TRAJECTORY_MODIFICATION",
                      "target": [
                        {
                          "identifier" : "ALL",
                          "filters" : []
                        }
                      ],
                      "scope": [
                        {
                          "type": "timeWindow",
                          "lowerBound": 56,
                          "upperBound": 90
                        }
                      ],
                      "trajectory": [
                          {
                              "latitude" : 45,
                              "longitude" : 78,
                              "altitude" : 90000,
                              "time": 78 
                              
                          },
                          [
                              {
                                  "latitude" : 12,
                                  "longitude" : 70,
                                  "altitude" : 7000,
                                  "time": 99  
                              }
                          ]
                      ],
                      "trigger": [],
                      "assertions" : []
                    }
                  ]
                }
          ]
      )
  })

  test('callGenerateCommandsAlterSpeedAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("alter_speed all_planes from 56 seconds until 90 seconds with_values EAST_WEST_VELOCITY = 78 and NORTH_SOUTH_VELOCITY = 45", services);
      expect(generateCommands(await scenario)).toStrictEqual(
        [
          {
              "instructions": [
                {
                  "action": "SPEED_ALTERATION",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
                    }
                  ],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 56,
                      "upperBound": 90
                    }
                  ],
                  "parameters": [
                      {
                        "parameter" : 
                            {
                              "name" : "EAST_WEST_VELOCITY",
                              "value" : 78
                            }
                        
                      },
                      [{
                        "parameter" : 
                          {
                            "name" : "NORTH_SOUTH_VELOCITY",
                            "value" : 45
                          }
                        
                      }]
                  ],
                  "trigger": [],
                  "assertions" : []
                }
              ]
            }
      ]
      )
  })

  test('callGenerateCommandsSaturateAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("saturate all_planes from 56 seconds until 90 seconds with_values ICAO = 78 and NUMBER = 45", services);
      expect(generateCommands(await scenario)).toStrictEqual(
        [
          {
              "instructions": [
                {
                  "action": "SATURATION",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
                    }
                  ],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 56,
                      "upperBound": 90
                    }
                  ],
                  "parameters": [
                      {
                        "parameter" : 
                            {
                              "name" : "ICAO",
                              "value" : 78
                            }
                        
                      },
                      [{
                        "parameter" : 
                          {
                            "name" : "NUMBER",
                            "value" : 45
                          }
                        
                      }]
                  ],
                  "trigger": [],
                  "assertions" : []
                }
              ]
            }
      ]
      )
  })

  test('callGenerateCommandsReplayPlane', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("replay plane satisfying 6 and 78 from_recording 34 from 56 seconds until 90 seconds", services);
      expect(generateCommands(await scenario)).toStrictEqual(
        [
          {
              "instructions": [
                {
                  "action": "REPLAY",
                  "target": [{
                    "filters" : [6, 78],
                    "recording" : 34
                  }],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 56,
                      "upperBound": 90
                    }
                  ],
                  "parameters" : [],
                  "assertions" : []
                }
              ]
            }
      ]
      )
  })


  test('callGenerateCommandsReplayAllPlaneWithFilter', async () => {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = extractAstNodeFromString<ASTScenario>("replay all_planes satisfying 6 and 78 from_recording 34 from 56 seconds until 90 seconds", services);
    expect(generateCommands(await scenario)).toStrictEqual(
      [
        {
            "instructions": [
              {
                "action": "REPLAY",
                "target": [{
                  "filters" : [6, 78],
                  "recording" : 34
                }],
                "scope": [
                  {
                    "type": "timeWindow",
                    "lowerBound": 56,
                    "upperBound": 90
                  }
                ],
                "parameters" : [],
                "assertions" : []
              }
            ]
          }
    ]
    )
})


test('callGenerateCommandsReplayAllPlaneWithoutFilter', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("replay all_planes from_recording 34 from 56 seconds until 90 seconds", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "REPLAY",
              "target": [{
                "recording" : 34
              }],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound": 90
                }
              ],
              "parameters" : [],
              "assertions" : []
            }
          ]
        }
  ]
  )
})


  test('callGenerateCommandsDelayAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("delay all_planes from 56 seconds until 90 seconds with_delay 55 seconds", services);
      expect(generateCommands(await scenario)).toStrictEqual(
        [
          {
              "instructions": [
                {
                  "action": "TIMESTAMP",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
                    }
                  ],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 56,
                      "upperBound": 90
                    }
                  ],
                  "delay": [
                      {
                        "value" : 55
                        
                      }
                  ],
                  "assertions" : []
                }
              ]
            }
      ]
      )
  })

  test('callGenerateCommandsRotateAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("rotate all_planes from 67 seconds until 99 seconds with_angle 90", services);
      expect(generateCommands(await scenario)).toStrictEqual(
        [
          {
              "instructions": [
                {
                  "action": "ROTATION",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
                    }
                  ],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 67,
                      "upperBound": 99
                    }
                  ],
                  "angle": [
                      {
                        "value" : 90
                            
                      }
                  ],
                  "trigger": [],
                  "assertions" : []
                }
              ]
            }
      ]
      )
  })


  test('callGenerateCommandsCutAllPlanes', async () => {
      const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
      const scenario = extractAstNodeFromString<ASTScenario>("cut all_planes from 13 seconds until 88 seconds", services);
      expect(generateCommands(await scenario)).toStrictEqual(
        [
          {
              "instructions": [
                {
                  "action": "CUT",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
                    }
                  ],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 13,
                      "upperBound": 88
                    }
                  ],
                  "trigger": [],
                  "assertions" : []
                }
              ]
            }
      ]
      )
  })


  test('callGenerateCommandsDeclarationRange', async () => {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = extractAstNodeFromString<ASTScenario>("let $test = [2,8], cut all_planes from 13 seconds until 88 seconds", services);
    expect(generateCommands(await scenario)).toStrictEqual(
      [
        {
            "declarations": [{
              "constant" : "$test",
              "rangeDeclaration" : [
                {
                  "start" : 2,
                  "end" : 8
                }
              ]
            }],
            "instructions": [
              {
                "action": "CUT",
                "target": [
                  {
                    "identifier" : "ALL",
                    "filters" : []
                  }
                ],
                "scope": [
                  {
                    "type": "timeWindow",
                    "lowerBound": 13,
                    "upperBound": 88
                  }
                ],
                "trigger": [],
                "assertions" : []
              }
            ]
          }
    ]
    )
})

test('callGenerateCommandsDeclarationList', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("let $test = {\"salut\",\"ola\"}, cut all_planes from 13 seconds until 88 seconds", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "declarations": [{
            "constant" : "$test",
            "listDeclaration" : [
              {
                "items" : [
                  "\"salut\"",
                  "\"ola\""
                ]
              }
            ]
          }],
          "instructions": [
            {
              "action": "CUT",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 13,
                  "upperBound": 88
                }
              ],
              "trigger": [],
              "assertions" : []
            }
          ]
        }
  ]
  )
})


test('callGenerateCommandsTimescopeAt', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes at 67 seconds", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
              {
              "action": "DELETION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                  {
                  "type": "timeAt",
                  "time": 67
                  }
              ],
              "trigger": [],
              "frequency" : undefined,
              "assertions" : []
              }
          ]
      }
]
  )
})


test('callGenerateCommandsTimescopeAtFor', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes at 67 seconds for 89 seconds", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
              {
              "action": "DELETION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                  {
                  "type": "timeAtFor",
                  "time": 67,
                  "for" : 89
                  }
              ],
              "trigger": [],
              "frequency" : undefined,
              "assertions" : []
              }
          ]
      }
]
  )
})

test('callGenerateCommandsTargetPlane', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide plane at 67 seconds for 89 seconds", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
              {
              "action": "DELETION",
              "target": [
                {
                  "identifier" : "PLANE",
                  "filters" : []
                }
              ],
              "scope": [
                  {
                  "type": "timeAtFor",
                  "time": 67,
                  "for" : 89
                  }
              ],
              "trigger": [],
              "frequency" : undefined,
              "assertions" : []
              }
          ]
      }
  ]
  )
})

test('callGenerateCommandsTrigger', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes at 67 seconds for 89 seconds triggered_by 78", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
              {
              "action": "DELETION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                  {
                  "type": "timeAtFor",
                  "time": 67,
                  "for" : 89
                  }
              ],
              "trigger": [
                78
              ],
              "frequency" : undefined,
              "assertions" : []
              }
          ]
      }
  ]
  )
})

test('callGenerateCommandsHideWithFrequency', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes from 56 seconds until 89 seconds with_frequency 89", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
              {
              "action": "DELETION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                  {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound" : 89
                  }
              ],
              "trigger": [],
              "frequency" : 89,
              "assertions" : []
              }
          ]
      }
  ]
  )
})

test('callGenerateCommandsCreateWithParameters', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds] with_values ICAO = 8 and CALLSIGN = 44 and SQUAWK = 900 and EMERGENCY = 786 and ALERT = 56 and SPI = 1234", services);
  expect(generateCommands(await scenario)).toStrictEqual(
      [
          {
            "instructions": [
              {
                "action": "CREATION",
                "scope": [
                  {
                    "type": "timeWindow",
                    "lowerBound": 56,
                    "upperBound": 89
                  }
                ],
                "trajectory": [
                  {
                    "latitude": 45,
                    "longitude": 78,
                    "altitude": 90000,
                    "time": 78
                  },
                  [
                    {
                      "latitude": 12,
                      "longitude": 70,
                      "altitude": 7000,
                      "time": 99
                    }
                  ]
                ],
                "parameters" : [
                  {
                    "parameter" : {
                      "name" : "ICAO",
                      "value" : 8
                    }
                  },
                  [{
                    "parameter" : {
                      "name" : "CALLSIGN",
                      "value" : 44
                    }
                  }],
                  [{
                    "parameter" : {
                      "name" : "SQUAWK",
                      "value" : 900
                    }
                  }],
                  [{
                    "parameter" : {
                      "name" : "EMERGENCY",
                      "value" : 786
                    }
                  }],
                  [{
                    "parameter" : {
                      "name" : "ALERT",
                      "value" : 56
                    }
                  }],
                  [{
                    "parameter" : {
                      "name" : "SPI",
                      "value" : 1234
                    }
                  }],
                ],
                "assertions" : []
              }
            ]
          }
        ]
  )
})

test('callGenerateCommandsReplayPlaneWithParameters', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("replay plane satisfying 6 and 78 from_recording 34 from 56 seconds until 90 seconds with_values ALTITUDE = 90000 and LATITUDE -= 456 and ICAO *= 900 and TRACK ++= 800 and CALLSIGN = 90000 and EMERGENCY -= 456 and GROUNDSPEED *= 900 and LONGITUDE ++= 800 and SPI = 67 and SQUAWK = 78", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "REPLAY",
              "target": [{
                "filters" : [6, 78],
                "recording" : 34
              }],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound": 90
                }
              ],
              "parameters" : [
                {
                  "parameter": {
                    "name": "ALTITUDE",
                    "value": 90000
                  }
                },
                [
                  {
                    "parameter": {
                      "name": "LATITUDE",
                      "operation": "-=",
                      "value": 456
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "ICAO",
                      "value": 900
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "TRACK",
                      "operation": "++=",
                      "value": 800
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "CALLSIGN",
                      "value": 90000
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "EMERGENCY",
                      "operation": "-=",
                      "value": 456
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "GROUNDSPEED",
                      "value": 900
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "LONGITUDE",
                      "operation": "++=",
                      "value": 800
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "SPI",
                      "value": 67
                    }
                  }
                ],
                [
                  {
                    "parameter": {
                      "name": "SQUAWK",
                      "value": 78
                    }
                  }
                ]
              ],
              "assertions" : []
            }
          ]
        }
  ]
  )
})

test('callGenerateCommandsHideWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes from 56 seconds until 89 seconds assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
              {
              "action": "DELETION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                  {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound" : 89
                  }
              ],
              "trigger": [],
              "frequency" : undefined,
              "assertions" : [
                {
                  "scope" : [
                    {
                      "type" : "timeWindow",
                      "lowerBound": 78,
                      "upperBound" : 90
                    }
                  ],
                  "file" : "\"test\"",
                  "filter" : "\"monFiltre\""
                },
                [
                  {
                    "scope" : [
                      {
                        "type" : "timeAt",
                        "time": 67
                      }
                    ],
                    "file" : "\"test2\"",
                    "filter" : undefined
                  },
                ]
              ]
              }
          ]
      }
  ]
  )
})

test('callGenerateCommandsAlterAllPlanesValuesWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_values ALTITUDE = 90000 assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
      [
          {
            "instructions": [
              {
                "action": "ALTERATION",
                "target": [
                  {
                    "identifier" : "ALL",
                    "filters" : []
                  }
                ],
                "scope": [
                  {
                    "type": "timeWindow",
                    "lowerBound": 56,
                    "upperBound": 90
                  }
                ],
                "trigger": [],
                "parameters": [
                  {
                    "parameter": {
                      "name": "ALTITUDE",
                      "value": 90000
                    }
                  },
                ],
                "assertions" : [
                  {
                    "scope" : [
                      {
                        "type" : "timeWindow",
                        "lowerBound": 78,
                        "upperBound" : 90
                      }
                    ],
                    "file" : "\"test\"",
                    "filter" : "\"monFiltre\""
                  },
                  [
                    {
                      "scope" : [
                        {
                          "type" : "timeAt",
                          "time": 67
                        }
                      ],
                      "file" : "\"test2\"",
                      "filter" : undefined
                    },
                  ]
                ]
              }
            ]
          }
        ]
  )
})

test('callGenerateCommandsCreateAllPlanesWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("create from 56 seconds until 89 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds] assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
      [
          {
            "instructions": [
              {
                "action": "CREATION",
                "scope": [
                  {
                    "type": "timeWindow",
                    "lowerBound": 56,
                    "upperBound": 89
                  }
                ],
                "trajectory": [
                  {
                    "latitude": 45,
                    "longitude": 78,
                    "altitude": 90000,
                    "time": 78
                  },
                  [
                    {
                      "latitude": 12,
                      "longitude": 70,
                      "altitude": 7000,
                      "time": 99
                    }
                  ]
                ],
                "parameters" : [],
                "assertions" : [
                  {
                    "scope" : [
                      {
                        "type" : "timeWindow",
                        "lowerBound": 78,
                        "upperBound" : 90
                      }
                    ],
                    "file" : "\"test\"",
                    "filter" : "\"monFiltre\""
                  },
                  [
                    {
                      "scope" : [
                        {
                          "type" : "timeAt",
                          "time": 67
                        }
                      ],
                      "file" : "\"test2\"",
                      "filter" : undefined
                    },
                  ]
                ]
              }
            ]
          }
        ]
  )
})


test('callGenerateCommandsAlterAllPlanesWaypointsWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("alter all_planes from 56 seconds until 90 seconds with_waypoints [(45,78) with_altitude 90000 at 78 seconds, (12,70) with_altitude 7000 at 99 seconds] assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
      [
          {
              "instructions": [
                {
                  "action": "TRAJECTORY_MODIFICATION",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
                    }
                  ],
                  "scope": [
                    {
                      "type": "timeWindow",
                      "lowerBound": 56,
                      "upperBound": 90
                    }
                  ],
                  "trajectory": [
                      {
                          "latitude" : 45,
                          "longitude" : 78,
                          "altitude" : 90000,
                          "time": 78 
                          
                      },
                      [
                          {
                              "latitude" : 12,
                              "longitude" : 70,
                              "altitude" : 7000,
                              "time": 99  
                          }
                      ]
                  ],
                  "trigger": [],
                  "assertions" : [
                    {
                      "scope" : [
                        {
                          "type" : "timeWindow",
                          "lowerBound": 78,
                          "upperBound" : 90
                        }
                      ],
                      "file" : "\"test\"",
                      "filter" : "\"monFiltre\""
                    },
                    [
                      {
                        "scope" : [
                          {
                            "type" : "timeAt",
                            "time": 67
                          }
                        ],
                        "file" : "\"test2\"",
                        "filter" : undefined
                      },
                    ]
                  ]
                }
              ]
            }
      ]
  )
})

test('callGenerateCommandsAlterSpeedAllPlanesWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("alter_speed all_planes from 56 seconds until 90 seconds with_values EAST_WEST_VELOCITY = 78 and NORTH_SOUTH_VELOCITY = 45 assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "SPEED_ALTERATION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound": 90
                }
              ],
              "parameters": [
                  {
                    "parameter" : 
                        {
                          "name" : "EAST_WEST_VELOCITY",
                          "value" : 78
                        }
                    
                  },
                  [{
                    "parameter" : 
                      {
                        "name" : "NORTH_SOUTH_VELOCITY",
                        "value" : 45
                      }
                    
                  }]
              ],
              "trigger": [],
              "assertions" : [
                {
                  "scope" : [
                    {
                      "type" : "timeWindow",
                      "lowerBound": 78,
                      "upperBound" : 90
                    }
                  ],
                  "file" : "\"test\"",
                  "filter" : "\"monFiltre\""
                },
                [
                  {
                    "scope" : [
                      {
                        "type" : "timeAt",
                        "time": 67
                      }
                    ],
                    "file" : "\"test2\"",
                    "filter" : undefined
                  },
                ]
              ]
            }
          ]
        }
  ]
  )
})

test('callGenerateCommandsSaturateAllPlanesWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("saturate all_planes from 56 seconds until 90 seconds with_values ICAO = 78 and NUMBER = 45 assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "SATURATION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound": 90
                }
              ],
              "parameters": [
                  {
                    "parameter" : 
                        {
                          "name" : "ICAO",
                          "value" : 78
                        }
                    
                  },
                  [{
                    "parameter" : 
                      {
                        "name" : "NUMBER",
                        "value" : 45
                      }
                    
                  }]
              ],
              "trigger": [],
              "assertions" : [
                {
                  "scope" : [
                    {
                      "type" : "timeWindow",
                      "lowerBound": 78,
                      "upperBound" : 90
                    }
                  ],
                  "file" : "\"test\"",
                  "filter" : "\"monFiltre\""
                },
                [
                  {
                    "scope" : [
                      {
                        "type" : "timeAt",
                        "time": 67
                      }
                    ],
                    "file" : "\"test2\"",
                    "filter" : undefined
                  },
                ]
              ]
            }
          ]
        }
  ]
  )
})

test('callGenerateCommandsReplayPlaneWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("replay plane satisfying 6 and 78 from_recording 34 from 56 seconds until 90 seconds assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "REPLAY",
              "target": [{
                "filters" : [6, 78],
                "recording" : 34
              }],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound": 90
                }
              ],
              "parameters" : [],
              "assertions" : [
                {
                  "scope" : [
                    {
                      "type" : "timeWindow",
                      "lowerBound": 78,
                      "upperBound" : 90
                    }
                  ],
                  "file" : "\"test\"",
                  "filter" : "\"monFiltre\""
                },
                [
                  {
                    "scope" : [
                      {
                        "type" : "timeAt",
                        "time": 67
                      }
                    ],
                    "file" : "\"test2\"",
                    "filter" : undefined
                  },
                ]
              ]
            }
          ]
        }
  ]
  )
})

test('callGenerateCommandsDelayAllPlanesWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("delay all_planes from 56 seconds until 90 seconds with_delay 55 seconds assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "TIMESTAMP",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 56,
                  "upperBound": 90
                }
              ],
              "delay": [
                  {
                    "value" : 55
                    
                  }
              ],
              "assertions" : [
                {
                  "scope" : [
                    {
                      "type" : "timeWindow",
                      "lowerBound": 78,
                      "upperBound" : 90
                    }
                  ],
                  "file" : "\"test\"",
                  "filter" : "\"monFiltre\""
                },
                [
                  {
                    "scope" : [
                      {
                        "type" : "timeAt",
                        "time": 67
                      }
                    ],
                    "file" : "\"test2\"",
                    "filter" : undefined
                  },
                ]
              ]
            }
          ]
        }
  ]
  )
})

test('callGenerateCommandsRotateAllPlanesWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("rotate all_planes from 67 seconds until 99 seconds with_angle 90 assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "ROTATION",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 67,
                  "upperBound": 99
                }
              ],
              "angle": [
                  {
                    "value" : 90
                        
                  }
              ],
              "trigger": [],
              "assertions" : [
                {
                  "scope" : [
                    {
                      "type" : "timeWindow",
                      "lowerBound": 78,
                      "upperBound" : 90
                    }
                  ],
                  "file" : "\"test\"",
                  "filter" : "\"monFiltre\""
                },
                [
                  {
                    "scope" : [
                      {
                        "type" : "timeAt",
                        "time": 67
                      }
                    ],
                    "file" : "\"test2\"",
                    "filter" : undefined
                  },
                ]
              ]
            }
          ]
        }
  ]
  )
})

test('callGenerateCommandsCutAllPlanesWithAssert', async () => {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
  const scenario = extractAstNodeFromString<ASTScenario>("cut all_planes from 13 seconds until 88 seconds  assert from 78 seconds until 90 seconds groovy_file \"test\" filter \"monFiltre\" and assert at 67 seconds groovy_file \"test2\"", services);
  expect(generateCommands(await scenario)).toStrictEqual(
    [
      {
          "instructions": [
            {
              "action": "CUT",
              "target": [
                {
                  "identifier" : "ALL",
                  "filters" : []
                }
              ],
              "scope": [
                {
                  "type": "timeWindow",
                  "lowerBound": 13,
                  "upperBound": 88
                }
              ],
              "trigger": [],
              "assertions" : [
                {
                  "scope" : [
                    {
                      "type" : "timeWindow",
                      "lowerBound": 78,
                      "upperBound" : 90
                    }
                  ],
                  "file" : "\"test\"",
                  "filter" : "\"monFiltre\""
                },
                [
                  {
                    "scope" : [
                      {
                        "type" : "timeAt",
                        "time": 67
                      }
                    ],
                    "file" : "\"test2\"",
                    "filter" : undefined
                  },
                ]
              ]
            }
          ]
        }
  ]
  )
})




})

