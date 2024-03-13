import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import assert from 'assert'
import { FindScenarioError } from '@smartesting/shared/dist/responses/findScenario'
import { clearDb } from '../../clearDb'
import { OptionsAlteration } from '@smartesting/shared/dist/index'
import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import findScenario from '../../../api/core/scenario/findScenario'

describe('core/user/findUser', () => {
  let userManager: IUserManager
  let scenarioManager: IScenarioManager
  const validUserAttributes: UserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont8@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }

  const options: OptionsAlteration = {
    haveLabel: false,
    haveRealism: true,
    haveNoise: false,
    haveDisableAltitude: false,
    haveDisableLatitude: true,
    haveDisableLongitude: false,
  }

  const validScenarioAttributes = {
    name: 'Scenario A',
    text: 'hide all_planes at 6 seconds',
    options: options,
  }

  const validScenarioAttributes2 = {
    name: 'Scenario B',
    text: 'hide all_planes at 77 seconds',
    options: options,
  }

  const validScenarioAttributes3 = {
    name: 'Scenario C',
    text: 'cut all_planes at 77 seconds',
    options: options,
  }

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    userManager = adapters.userManager
    scenarioManager = adapters.scenarioManager
  })

  afterEach(async () => {
    await clearDb()
  })

  it('list scenario is valid with 3 scenarios', async () => {
    const user1 = await userManager.createUser(validUserAttributes)
    await scenarioManager.createScenario(validScenarioAttributes, user1.id)
    const scenario2 = await scenarioManager.createScenario(
      validScenarioAttributes2,
      user1.id
    )
    await scenarioManager.createScenario(validScenarioAttributes3, user1.id)

    const { scenario: scenario, error: errorFindScenario } = await findScenario(
      scenario2.id,
      scenarioManager
    )
    assert(scenario)
    assert.deepStrictEqual(scenario2.name, validScenarioAttributes2.name)
    assert.strictEqual(errorFindScenario, null)
  })

  it('list scenario is empty', async () => {
    const user1 = await userManager.createUser(validUserAttributes)
    const { scenario: scenario, error: errorFindScenario } = await findScenario(
      10,
      scenarioManager
    )
    assert(errorFindScenario)
    assert.strictEqual(errorFindScenario, FindScenarioError.scenarioNotFound)
    assert.strictEqual(scenario, null)
  })

  it('list scenario is empty after create et delete', async () => {
    let createdUser = await userManager.createUser(validUserAttributes)
    assert(createdUser)
    const scenario2 = await scenarioManager.createScenario(
      validScenarioAttributes2,
      createdUser.id
    )
    await scenarioManager.deleteScenario(scenario2.id)
    const { scenario: scenario, error: errorFindScenario } = await findScenario(
      scenario2.id,
      scenarioManager
    )
    assert(errorFindScenario)
    assert.strictEqual(errorFindScenario, FindScenarioError.scenarioNotFound)
    assert.strictEqual(scenario, null)
  })
})
