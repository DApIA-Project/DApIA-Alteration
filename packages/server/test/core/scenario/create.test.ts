import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/scenario/create'
import assert from 'assert'
import { CreateScenarioError } from '@smartesting/shared/dist/responses/createScenario'
import { clearDb } from '../../clearDb'
import IUserManager from '../../../api/adapters/user/IUserManager'
describe('core/scenario/create', () => {
  let scenarioManager: IScenarioManager
  let userManager: IUserManager
  let validScenarioAttributes: ScenarioAttributes

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    scenarioManager = adapters.scenarioManager
    userManager = adapters.userManager
    await userManager.createUser({
      firstname: 'Bob',
      lastname: 'Dupont',
      email: 'bob.dupont@mail.fr',
      password: 's3cret!',
      isAdmin: false,
    })

    let user = await userManager.findUserByEmail('bob.dupont@mail.fr')
    if (user) {
      validScenarioAttributes = {
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
        user_id: user.id,
      }
    }
  })
  afterEach(async () => {
    await clearDb()
  })

  it('requires a non-blank name for the scenario', async () => {
    const { scenario: createdScenario, error } = await create(
      {
        ...validScenarioAttributes,
        name: '   ',
      },
      scenarioManager
    )

    assert.strictEqual(createdScenario, null)
    assert.strictEqual(error, CreateScenarioError.emptyName)
  })

  it('can have a blank text for the scenario', async () => {
    const { scenario: createdScenario, error } = await create(
      {
        ...validScenarioAttributes,
        text: '   ',
      },
      scenarioManager
    )

    assert.strictEqual(createdScenario?.text, '')
    assert.strictEqual(error, null)
  })

  it('create scenario if all fields are correct', async () => {
    const { scenario: createdScenario, error } = await create(
      {
        ...validScenarioAttributes,
      },
      scenarioManager
    )

    assert.strictEqual(error, null)
    assert(createdScenario)

    const existing = await scenarioManager.findScenario(createdScenario.id)
    assert.deepStrictEqual(createdScenario, existing)
  })

  it('trims the name before saving', async () => {
    const { scenario: createdScenario } = await create(
      {
        ...validScenarioAttributes,
        name: '  Scenario B  ',
      },
      scenarioManager
    )

    assert(createdScenario)
    const existing = await scenarioManager.findScenario(createdScenario.id)
    assert.strictEqual(existing?.name, 'Scenario B')
  })

  it('trims the text before saving', async () => {
    const { scenario: createdScenario } = await create(
      {
        ...validScenarioAttributes,
        text: '  cut all_planes at 6 seconds  ',
      },
      scenarioManager
    )

    assert(createdScenario)
    const existing = await scenarioManager.findScenario(createdScenario.id)
    assert.strictEqual(existing?.text, 'cut all_planes at 6 seconds')
  })
})
