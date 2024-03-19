import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/src/models/Scenario'
import { User, UserAttributes } from '@smartesting/shared/src/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import listScenario from '../../../api/core/scenario/listScenario'
import assert from 'assert'
import { ListUserScenarioError } from '@smartesting/shared/src/responses/listUserScenario'
import { clearDb } from '../../clearDb'
import IUserManager from '../../../api/adapters/user/IUserManager'
import listUserScenario from '../../../api/core/scenario/listUserScenario'

describe('core/scenario/listUserScenario', () => {
  let scenarioManager: IScenarioManager
  let userManager: IUserManager

  const validUserAttributes: UserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }
  const validScenarioAttributes: ScenarioAttributes = {
    name: 'Scenario A',
    text: 'hide all_planes at 10 seconds',
    options: {
      haveLabel: false,
      haveNoise: false,
      haveRealism: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
      haveDisableAltitude: false,
    },
  }
  const validScenarioAttributes2: ScenarioAttributes = {
    name: 'Scenario B',
    text: 'hide all_planes at 5 seconds',
    options: {
      haveLabel: false,
      haveNoise: false,
      haveRealism: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
      haveDisableAltitude: false,
    },
  }
  const validScenarioAttributes3: ScenarioAttributes = {
    name: 'Scenario C',
    text: 'hide all_planes at 1 seconds',
    options: {
      haveLabel: false,
      haveNoise: false,
      haveRealism: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
      haveDisableAltitude: false,
    },
  }

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    scenarioManager = adapters.scenarioManager
    userManager = adapters.userManager
  })

  afterEach(async () => {
    await clearDb()
  })

  it('list user scenario is valid with 2 scenarios', async () => {
    let user: User = await userManager.createUser(validUserAttributes)
    await scenarioManager.createScenario(validScenarioAttributes, user.id)
    await scenarioManager.createScenario(validScenarioAttributes2, user.id)
    await scenarioManager.createScenario(validScenarioAttributes3, user.id + 1)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listUserScenario(scenarioManager, user.id)
    assert(listedScenario)
    assert.equal(listedScenario.length, 2)
    assert.strictEqual(errorListScenario, null)
  })

  it('list user scenario is valid with 2 scenarios but filter searchbar', async () => {
    let user: User = await userManager.createUser(validUserAttributes)
    await scenarioManager.createScenario(validScenarioAttributes, user.id)
    await scenarioManager.createScenario(validScenarioAttributes2, user.id)
    await scenarioManager.createScenario(validScenarioAttributes3, user.id + 1)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listUserScenario(scenarioManager, user.id, 'B')
    assert(listedScenario)
    assert.equal(listedScenario.length, 1)
    assert.strictEqual(errorListScenario, null)
  })

  it('list user scenario is valid with 2 scenarios but filter dates', async () => {
    let user: User = await userManager.createUser(validUserAttributes)
    let scenario1: Scenario = await scenarioManager.createScenario(
      validScenarioAttributes,
      user.id
    )
    let scenario2: Scenario = await scenarioManager.createScenario(
      validScenarioAttributes2,
      user.id
    )
    await scenarioManager.createScenario(validScenarioAttributes3, user.id + 1)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listUserScenario(
        scenarioManager,
        user.id,
        undefined,
        scenario1.updatedAt.toISOString(),
        scenario2.updatedAt.toISOString()
      )
    assert(listedScenario)
    assert.equal(listedScenario.length, 2)
    assert.strictEqual(errorListScenario, null)
  })

  it('list user scenario is valid with 2 scenarios but filter options alteration', async () => {
    let user: User = await userManager.createUser(validUserAttributes)
    await scenarioManager.createScenario(validScenarioAttributes, user.id)
    await scenarioManager.createScenario(validScenarioAttributes2, user.id)
    await scenarioManager.createScenario(validScenarioAttributes3, user.id + 1)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listUserScenario(
        scenarioManager,
        user.id,
        undefined,
        undefined,
        undefined,
        validScenarioAttributes.options
      )
    assert(listedScenario)
    assert.equal(listedScenario.length, 2)
    assert.strictEqual(errorListScenario, null)
  })

  it('list scenario is empty', async () => {
    let user: User = await userManager.createUser(validUserAttributes)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listUserScenario(scenarioManager, user.id)
    assert(errorListScenario)
    assert.strictEqual(
      errorListScenario,
      ListUserScenarioError.emptyListScenario
    )
    assert.strictEqual(listedScenario, null)
  })

  it('list scenario is empty after create et delete', async () => {
    let user: User = await userManager.createUser(validUserAttributes)
    let createdScenario = await scenarioManager.createScenario(
      validScenarioAttributes,
      user.id
    )
    assert(createdScenario)
    await scenarioManager.deleteScenario(createdScenario.id)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listUserScenario(scenarioManager, user.id)
    assert(errorListScenario)
    assert.strictEqual(
      errorListScenario,
      ListUserScenarioError.emptyListScenario
    )
    assert.strictEqual(listedScenario, null)
  })
})
