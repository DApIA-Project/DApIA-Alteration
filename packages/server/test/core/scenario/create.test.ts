import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/scenario/create'
import assert from 'assert'
import { CreateScenarioError } from '@smartesting/shared/dist/responses/createScenario'
describe('core/scenario/create', () => {
  let scenarioManager: IScenarioManager
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

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    scenarioManager = adapters.scenarioManager
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

  it('requires a non-blank text for the scenario', async () => {
    const { scenario: createdScenario, error } = await create(
      {
        ...validScenarioAttributes,
        text: '   ',
      },
      scenarioManager
    )

    assert.strictEqual(createdScenario, null)
    assert.strictEqual(error, CreateScenarioError.emptyTextScenario)
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
