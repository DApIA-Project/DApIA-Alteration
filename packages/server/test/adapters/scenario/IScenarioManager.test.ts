import IContractTest from '../../IContractTest'
import { AlterationAdapters } from '../../../api/AlterationAdapters'
import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import {
  ScenarioAttributes,
  Scenario,
} from '@smartesting/shared/dist/models/Scenario'
import assert from 'assert'
import {
  makeMemoryAdapters,
  makeProductionAdapters,
} from '../../makeTestAdapters'
import { clearMemoryDb } from '../../clearDb'

const IScenarioContractTest: IContractTest = (
  implementationName,
  makeAdapters,
  clearDb
) => {
  describe(implementationName, () => {
    let adapters: AlterationAdapters
    let scenarioManager: IScenarioManager

    const validScenarioAttributes: ScenarioAttributes = {
      name: 'Scenario A',
      text: 'hide all_planes at 6 seconds',
      options: {
        haveRealism: false,
        haveLabel: false,
        haveNoise: false,
        haveDisableLatitude: false,
        haveDisableLongitude: false,
        haveDisableAltitude: false,
      },
    }

    const secondScenarioAttributes: ScenarioAttributes = {
      name: 'Scenario B',
      text: 'cut all_planes at 6 seconds',
      options: {
        haveRealism: true,
        haveLabel: true,
        haveNoise: true,
        haveDisableLatitude: true,
        haveDisableLongitude: true,
        haveDisableAltitude: true,
      },
    }

    beforeEach(async () => {
      await clearDb()
      adapters = makeAdapters()
      scenarioManager = adapters.scenarioManager
    })

    describe('createScenario', () => {
      it('returns the created scenario', async () => {
        const created = await scenarioManager.createScenario(
          validScenarioAttributes
        )

        assert(created.id)
        assert(created.create_at)
        assert(created.update_at)
        assert.deepStrictEqual(created.name, validScenarioAttributes.name)
        assert.deepStrictEqual(created.text, validScenarioAttributes.text)
        assert.deepStrictEqual(created.options, validScenarioAttributes.options)
      })
    })

    describe('updateScenario', () => {
      it('returns the updated scenario', async () => {
        const created = await scenarioManager.createScenario(
          validScenarioAttributes
        )

        const updated = await scenarioManager.updateScenario(created.id, {
          name: 'Scenario B',
        })

        assert(updated)
        assert.deepStrictEqual(updated.name, 'Scenario B')
        assert.deepStrictEqual(updated.text, validScenarioAttributes.text)
        assert.deepStrictEqual(updated.options, validScenarioAttributes.options)
      })
    })

    describe('findScenario', () => {
      it('returns null if the scenario does not exists', async () => {
        assert.strictEqual(await scenarioManager.findScenario('2345'), null)
      })

      it('returns a scenario', async () => {
        await scenarioManager.createScenario(validScenarioAttributes)
        const secondScenario = await scenarioManager.createScenario(
          secondScenarioAttributes
        )

        const found = await scenarioManager.findScenario(secondScenario.id)
        assert.deepStrictEqual(found, secondScenario)
      })
    })

    describe('hasText', () => {
      let created: Scenario
      beforeEach(async () => {
        created = await scenarioManager.createScenario(validScenarioAttributes)
      })

      it('returns false if the text does not exists', async () => {
        assert.strictEqual(
          await scenarioManager.hasText(
            created.id,
            'cut all_planes at 22 seconds'
          ),
          false
        )
      })

      it('returns true if the text is in a scenario', async () => {
        assert.strictEqual(
          await scenarioManager.hasText(
            created.id,
            'hide all_planes at 6 seconds'
          ),
          true
        )
      })
    })

    describe('listScenarios', () => {
      it('returns all scenarios', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes
        )

        assert.deepEqual(await scenarioManager.listScenarios(), [
          scenario1,
          scenario2,
        ])
      })
    })

    describe('deleteScenario', () => {
      it('remove a specific scenario', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes
        )

        assert.deepEqual(await scenarioManager.listScenarios(), [
          scenario1,
          scenario2,
        ])

        await scenarioManager.deleteScenario(scenario1.id)

        assert.deepEqual(await scenarioManager.listScenarios(), [scenario2])
      })
    })
  })
}

IScenarioContractTest(
  'MemoryScenarioManager',
  makeMemoryAdapters,
  clearMemoryDb
)
