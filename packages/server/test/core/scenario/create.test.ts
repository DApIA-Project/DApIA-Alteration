import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/scenario/create'
import assert from 'assert'
import { CreateScenarioError } from '@smartesting/shared/dist/responses/createScenario'
import { clearDb } from '../../clearDb'
import IUserManager from '../../../api/adapters/user/IUserManager'
import { User } from '@smartesting/shared/dist/models/User'
describe('core/scenario/create', () => {
  let scenarioManager: IScenarioManager
  let userManager: IUserManager
  let validScenarioAttributes: ScenarioAttributes
  let user: User

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    scenarioManager = adapters.scenarioManager
    userManager = adapters.userManager
    user = await userManager.createUser({
      email: 'bob.dupont@mail.fr',
      password: 's3cret!',
    })

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
      scenarioManager,
      user.id
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
      scenarioManager,
      user.id
    )

    assert.strictEqual(createdScenario?.text, '')
    assert.strictEqual(error, null)
  })

  it('create scenario if all fields are correct', async () => {
    const { scenario: createdScenario, error } = await create(
      {
        ...validScenarioAttributes,
      },
      scenarioManager,
      user.id
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
      scenarioManager,
      user.id
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
      scenarioManager,
      user.id
    )

    assert(createdScenario)
    const existing = await scenarioManager.findScenario(createdScenario.id)
    assert.strictEqual(existing?.text, 'cut all_planes at 6 seconds')
  })
})
