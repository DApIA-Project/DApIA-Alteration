import assert from 'assert'
import { parseScenario } from '../../parser/parser'
import { ASTScenario } from '../../language-server/generated/ast'

describe('parser', () => {
  let fileContent = ''
  beforeEach(() => {
    fileContent =
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,'
  })

  context('when scenario is no valid', () => {
    it('returns json with no action when content is false', async () => {
      const value = 'hide all_planes from seconds until 90 seconds'
      const parseResult = await parseScenario(value)
      assert.deepStrictEqual(parseResult, undefined)
    })
  })

  context('when scenario is valid', () => {
    it('returns json with action when content is hide all_planes from until', async () => {
      const value = 'hide all_planes from 56 seconds until 90 seconds'
      const cmds = await parseScenario(value)
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
})
