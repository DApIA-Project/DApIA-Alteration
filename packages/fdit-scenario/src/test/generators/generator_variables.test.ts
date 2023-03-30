import { EmptyFileSystem, LangiumServices } from 'langium'
import { createFditscenarioServices } from '../../language-server/fditscenario-module'
import {
  countScenarioNumber,
  createAllScenario,
  evalDeclarations,
  parseScenario,
} from '../../web'
import assert from 'assert'

describe('generator_variables', () => {
  let services: LangiumServices | null = null
  let fileContent = ''
  beforeEach(() => {
    fileContent =
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n' +
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:50:48.789,2018/11/25,11:50:48.789,,,474.53,295.86,,,0.0,,,,,'
    services = createFditscenarioServices(EmptyFileSystem).Fditscenario
  })
  context('when scenario have variables list', () => {
    it('returns json with variables int for a list', async () => {
      const scenario = await parseScenario(
        'let $test = {5,8,9}, hide all_planes at $test seconds'
      )
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [
          {
            variable: '$test',
            values_list: [5, 8, 9],
          },
        ],
      })
    })

    it('returns json with variables string for a list', async () => {
      const scenario = await parseScenario(
        'let $test = {"az","er","ty"}, hide all_planes at $test seconds'
      )
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [
          {
            variable: '$test',
            values_list: ['az', 'er', 'ty'],
          },
        ],
      })
    })

    it('returns json with variables double for a list', async () => {
      const scenario = await parseScenario(
        'let $test = {12.9,7.8,3.7}, hide all_planes at $test seconds'
      )
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [
          {
            variable: '$test',
            values_list: [12.9, 7.8, 3.7],
          },
        ],
      })
    })

    it('returns json with variables recording parameter for a list', async () => {
      const scenario = await parseScenario(
        'let $test = {12.9 * REC_DURATION,7.8 * ALT_DURATION,3.7 * REC_NBR_AIRCRAFT}, hide all_planes at $test seconds'
      )
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [
          {
            variable: '$test',
            values_list: ['REC_DURATION', 'ALT_DURATION', 'REC_NBR_AIRCRAFT'],
          },
        ],
      })
    })

    it('returns json with variables leftshift and rightshift for a list', async () => {
      const scenario = await parseScenario(
        'let $test = { >> 12,<< 7, << 3}, hide all_planes at $test seconds'
      )
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [
          {
            variable: '$test',
            values_list: [12, 7, 3],
          },
        ],
      })
    })
  })

  context('when scenario have variables range', () => {
    it('returns json with variables int for a range', async () => {
      const scenario = await parseScenario(
        'let $test = [5,8], hide all_planes at $test seconds'
      )
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [
          {
            variable: '$test',
            values_range: [5, 8],
          },
        ],
      })
    })
  })

  context('when scenario have not variables', () => {
    it('returns json with no variables because variable is not good declared', async () => {
      const scenario = await parseScenario(
        'let $test = 12, hide all_planes at $test seconds'
      )
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [],
      })
    })

    it('returns json with no variables because no variable declared', async () => {
      const scenario = await parseScenario('hide all_planes at $test seconds')
      assert.deepStrictEqual(evalDeclarations(scenario.value.declarations), {
        declarations: [],
      })
    })
  })

  context('get variables', () => {
    it('returns json with variables when content is hide all_planes from until with variables', async () => {
      const scenario =
        'let $test = {3,5,9}, hide all_planes from $test seconds until 90 seconds'
      const declarations = await evalDeclarations(
        (
          await parseScenario(scenario)
        ).value.declarations
      )
      assert.deepStrictEqual(declarations, {
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
      const declarations = await evalDeclarations(
        (
          await parseScenario(value)
        ).value.declarations
      )
      assert.deepStrictEqual(declarations, {
        declarations: [],
      })
    })

    it('returns undefined when content is hide all_planes from until when scenario is false', async () => {
      const value = 'hide all_planes $test seconds until 90 seconds'
      const declarations = await evalDeclarations(
        (
          await parseScenario(value)
        ).value.declarations
      )

      assert.deepStrictEqual(declarations, { declarations: [] })
    })
  })

  context('count scenario Number', () => {
    it('returns number of scenario when content is hide all_planes from until with 1 list variable 3 values', async () => {
      const value =
        'let $test = {3,5,9}, hide all_planes from $test seconds until 90 seconds'
      const declarations = await evalDeclarations(
        (
          await parseScenario(value)
        ).value.declarations
      )

      let nb_scenario: number = 1
      for (const declaration of declarations.declarations) {
        nb_scenario = nb_scenario * countScenarioNumber(value, declaration)
      }
      assert.deepStrictEqual(nb_scenario, 3)
    })

    it('returns number of scenario when content is hide all_planes from until with 1 range variable 2 values', async () => {
      const value =
        'let $test = [3,5], hide all_planes from $test seconds until 90 seconds'
      const declarations = await evalDeclarations(
        (
          await parseScenario(value)
        ).value.declarations
      )

      let nb_scenario: number = 1
      for (const declaration of declarations.declarations) {
        nb_scenario = nb_scenario * countScenarioNumber(value, declaration)
      }
      assert.deepStrictEqual(nb_scenario, 2)
    })

    it('returns number of scenario when content is hide all_planes from until with 1 list variable 3 values but not use', async () => {
      const value =
        'let $test = {3,5,9}, hide all_planes from 5 seconds until 90 seconds'
      const declarations = await evalDeclarations(
        (
          await parseScenario(value)
        ).value.declarations
      )

      let nb_scenario: number = 1
      for (const declaration of declarations.declarations) {
        nb_scenario = nb_scenario * countScenarioNumber(value, declaration)
      }
      assert.deepStrictEqual(nb_scenario, 0)
    })

    it('returns number of scenario when content is hide all_planes from until with 1 range variable 2 values but not use', async () => {
      const value =
        'let $test = [3,5], hide all_planes from 5 seconds until 90 seconds'
      const declarations = await evalDeclarations(
        (
          await parseScenario(value)
        ).value.declarations
      )

      let nb_scenario: number = 1
      for (const declaration of declarations.declarations) {
        nb_scenario = nb_scenario * countScenarioNumber(value, declaration)
      }
      assert.deepStrictEqual(nb_scenario, 0)
    })
  })

  context('create all scenario', () => {
    it('returns list of scenario when content is hide all_planes from until with 1 list variable 2 values and 1 range 2 values', async () => {
      const scenario =
        'let $test = {3,5}, let $foo = [4,9], hide all_planes from $test seconds until $foo seconds'
      const declarations = await evalDeclarations(
        (
          await parseScenario(scenario)
        ).value.declarations
      )

      let nb_scenario: number = 1
      for (const declaration of declarations.declarations) {
        nb_scenario = nb_scenario * countScenarioNumber(scenario, declaration)
      }

      let list_scenario: string[] = createAllScenario(
        scenario,
        declarations,
        nb_scenario
      )
      assert.deepStrictEqual(list_scenario.length, 4)
    })
  })
})
