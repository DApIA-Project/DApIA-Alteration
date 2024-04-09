import IContractTest from '../../IContractTest'
import { AlterationAdapters } from '../../../api/AlterationAdapters'
import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import {
  ScenarioAttributes,
  Scenario,
} from '@smartesting/shared/dist/models/Scenario'
import { UserAttributes, User } from '@smartesting/shared/dist/models/User'
import assert from 'assert'
import {
  makeMemoryAdapters,
  makeProductionAdapters,
} from '../../makeTestAdapters'
import { clearMemoryDb, clearProductionDb } from '../../clearDb'
import IUserManager from '../../../api/adapters/user/IUserManager'
import { Sort } from '@smartesting/shared/src'

const IScenarioContractTest: IContractTest = (
  implementationName,
  makeAdapters,
  clearDb
) => {
  describe(implementationName, () => {
    let adapters: AlterationAdapters
    let scenarioManager: IScenarioManager
    let userManager: IUserManager

    let user: User
    let user2: User

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
      userManager = adapters.userManager
      user = await userManager.createUser({
        firstname: 'Bob',
        lastname: 'Dupont',
        email: 'bob.dupont@mail.fr',
        password: 's3cret!',
        isAdmin: false,
      })
      user2 = await userManager.createUser({
        firstname: 'Charlie',
        lastname: 'Stone',
        email: 'charlie.stone@mail.fr',
        password: 's3cret!',
        isAdmin: false,
      })
    })

    afterEach(async () => {
      await clearDb()
    })

    describe('createScenario', () => {
      it('returns the created scenario', async () => {
        const created = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
        )

        assert.deepStrictEqual(created.name, validScenarioAttributes.name)
        assert.deepStrictEqual(created.text, validScenarioAttributes.text)
        assert.deepStrictEqual(created.options, validScenarioAttributes.options)
      })
    })

    describe('updateScenario', () => {
      it('returns the updated scenario', async () => {
        const created = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
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
        assert.strictEqual(await scenarioManager.findScenario(2345), null)
      })

      it('returns a scenario', async () => {
        await scenarioManager.createScenario(validScenarioAttributes, user.id)
        const secondScenario = await scenarioManager.createScenario(
          secondScenarioAttributes,
          user2.id
        )

        const found = await scenarioManager.findScenario(secondScenario.id)
        assert.deepStrictEqual(found, secondScenario)
      })
    })

    describe('deleteScenario', () => {
      it('remove a specific scenario', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes,
          user.id
        )

        assert.deepEqual(await scenarioManager.listUserScenario(user.id), [
          scenario1,
          scenario2,
        ])

        await scenarioManager.deleteScenario(scenario1.id)

        assert.deepEqual(await scenarioManager.listUserScenario(user.id), [
          scenario2,
        ])
      })
    })

    describe('listUserScenario', () => {
      it('returns all scenarios of user', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes,
          user.id
        )

        assert.deepEqual(await scenarioManager.listUserScenario(user.id), [
          scenario1,
          scenario2,
        ])
      })

      it('returns all scenarios of user with filter searchbar', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes,
          user.id
        )

        assert.deepEqual(
          await scenarioManager.listUserScenario(user.id, 'cut'),
          [scenario2]
        )
      })

      it('returns all scenarios of user with filter dates', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes,
          user.id
        )

        assert.deepEqual(
          await scenarioManager.listUserScenario(
            user.id,
            undefined,
            scenario1.updatedAt.toISOString(),
            scenario2.updatedAt.toISOString()
          ),
          [scenario1, scenario2]
        )
      })

      it('returns all scenarios of user with filter options alteration', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes,
          user.id
        )

        assert.deepEqual(
          await scenarioManager.listUserScenario(
            user.id,
            undefined,
            undefined,
            undefined,
            secondScenarioAttributes.options
          ),
          [scenario2]
        )
      })

      it('returns all scenarios of user with sort', async () => {
        const scenario1 = await scenarioManager.createScenario(
          validScenarioAttributes,
          user.id
        )
        const scenario2 = await scenarioManager.createScenario(
          secondScenarioAttributes,
          user.id
        )

        assert.deepEqual(
          await scenarioManager.listUserScenario(
            user.id,
            undefined,
            undefined,
            undefined,
            undefined,
            Sort.antialphabeticalOrder
          ),
          [scenario2, scenario1]
        )
      })
    })
  })
}

describe('IProjectManager', () => {
  IScenarioContractTest(
    'MemoryScenarioManager',
    makeMemoryAdapters,
    clearMemoryDb
  )

  IScenarioContractTest(
    'PsqlScenarioManager',
    makeProductionAdapters,
    clearProductionDb
  )
})
