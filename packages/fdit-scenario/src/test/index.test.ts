import {
  countScenarioNumber,
  createAllScenario,
  get_variables,
  parseAndGenerate,
} from '../web'
import assert from 'assert'

describe('indexTestMocha', () => {
  let fileContent = ''
  beforeEach(() => {
    fileContent =
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,'
  })

  context('when scenario is no valid', () => {
    it('returns json with no action when content is false', async () => {
      const value = 'hide all_planes from seconds until 90 sconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await parseAndGenerate(value, 'zigzag.sbs', fileContent)
      assert.deepStrictEqual(cmds, undefined)
    })
  })

  context('when scenario is valid', () => {
    it('returns json with action when content is hide all_planes from until', async () => {
      const value = 'hide all_planes from 56 seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await parseAndGenerate(value, 'zigzag.sbs', fileContent)
      const resJSONString = JSON.stringify(cmds, undefined, 2)

      const resJson = JSON.parse(resJSONString)
      assert.deepStrictEqual(resJson, {
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
      })
    })
  })

  context('get variables', () => {
    it('returns json with variables when content is hide all_planes from until with variables', async () => {
      const value =
        'let $test = {3,5,9}, hide all_planes from $test seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)
      const resJSONString = JSON.stringify(cmds, undefined, 2)

      const resJson = JSON.parse(resJSONString)
      assert.deepStrictEqual(resJson, {
        declarations: [
          {
            variable: '$test',
            values_list: [3, 5, 9],
          },
        ],
      })
    })

    it('returns undefined when content is hide all_planes from until without variables', async () => {
      const value = 'hide all_planes from $test seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)
      const resJSONString = JSON.stringify(cmds, undefined, 2)

      const resJson = JSON.parse(resJSONString)
      assert.deepStrictEqual(resJson, {
        declarations: [],
      })
    })

    it('returns undefined when content is hide all_planes from until when scenario is false', async () => {
      const value = 'hide all_planes $test seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)
      const resJSONString = JSON.stringify(cmds, undefined, 2)

      assert.deepStrictEqual(resJSONString, undefined)
    })
  })

  context('count scenario Number', () => {
    it('returns number of scenario when content is hide all_planes from until with 1 list variable 3 values', async () => {
      const value =
        'let $test = {3,5,9}, hide all_planes from $test seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)

      let nb_scenario: number = 1
      for (let i = 0; i < cmds!.declarations.length; i++) {
        nb_scenario =
          nb_scenario *
          (await countScenarioNumber(value, cmds!.declarations[i]))
      }
      assert.deepStrictEqual(nb_scenario, 3)
    })

    it('returns number of scenario when content is hide all_planes from until with 1 range variable 2 values', async () => {
      const value =
        'let $test = [3,5], hide all_planes from $test seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)

      let nb_scenario: number = 1
      for (let i = 0; i < cmds!.declarations.length; i++) {
        nb_scenario =
          nb_scenario *
          (await countScenarioNumber(value, cmds!.declarations[i]))
      }
      assert.deepStrictEqual(nb_scenario, 2)
    })

    it('returns number of scenario when content is hide all_planes from until with 1 list variable 3 values but not use', async () => {
      const value =
        'let $test = {3,5,9}, hide all_planes from 5 seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)

      let nb_scenario: number = 1
      for (let i = 0; i < cmds!.declarations.length; i++) {
        nb_scenario =
          nb_scenario *
          (await countScenarioNumber(value, cmds!.declarations[i]))
      }
      assert.deepStrictEqual(nb_scenario, 0)
    })

    it('returns number of scenario when content is hide all_planes from until with 1 range variable 2 values but not use', async () => {
      const value =
        'let $test = [3,5], hide all_planes from 5 seconds until 90 seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)

      let nb_scenario: number = 1
      for (let i = 0; i < cmds!.declarations.length; i++) {
        nb_scenario =
          nb_scenario *
          (await countScenarioNumber(value, cmds!.declarations[i]))
      }
      assert.deepStrictEqual(nb_scenario, 0)
    })
  })

  context('create all scenario', () => {
    it('returns list of scenario when content is hide all_planes from until with 1 list variable 2 values and 1 range 2 values', async () => {
      const value =
        'let $test = {3,5}, let $foo = [4,9], hide all_planes from $test seconds until $foo seconds'
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds = await get_variables(value)

      let nb_scenario: number = 1
      for (let i = 0; i < cmds!.declarations.length; i++) {
        nb_scenario =
          nb_scenario *
          (await countScenarioNumber(value, cmds!.declarations[i]))
      }

      let list_scenario: string[] = createAllScenario(value, cmds!, nb_scenario)
      assert.deepStrictEqual(list_scenario.length, 4)
    })
  })
})
