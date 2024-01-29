import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/scenario/create'
import assert from 'assert'
import { UpdateScenarioError } from '@smartesting/shared/dist/responses/updateScenario'
import updateScenario from '../../../api/core/scenario/update'
import { clearDb } from '../../clearDb'
import { OptionsAlteration } from '@smartesting/shared/dist/models'
describe('core/scenario/update', () => {
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

  afterEach(async () => {
    await clearDb()
  })

  it('requires a non-blank name for the scenario', async () => {
    const { scenario: createdScenario } = await create(
      {
        ...validScenarioAttributes,
      },
      scenarioManager
    )

    assert(createdScenario)
    let options: OptionsAlteration = {
      haveDisableAltitude: false,
      haveDisableLongitude: false,
      haveDisableLatitude: false,
      haveNoise: false,
      haveRealism: false,
      haveLabel: false,
    }
    const { scenario: updatedScenario, error: updatedError } =
      await updateScenario(
        createdScenario.id,
        '  ',
        createdScenario.text,
        options,
        scenarioManager
      )

    assert.strictEqual(updatedScenario, null)
    assert.strictEqual(updatedError, UpdateScenarioError.emptyName)
  })

  it('can have a blank text for the scenario', async () => {
    const { scenario: createdScenario } = await create(
      {
        ...validScenarioAttributes,
      },
      scenarioManager
    )

    assert(createdScenario)
    let options: OptionsAlteration = {
      haveDisableAltitude: false,
      haveDisableLongitude: false,
      haveDisableLatitude: false,
      haveNoise: false,
      haveRealism: false,
      haveLabel: false,
    }
    const { scenario: updatedScenario, error: updatedError } =
      await updateScenario(
        createdScenario.id,
        createdScenario.name,
        '   ',
        options,
        scenarioManager
      )

    assert.strictEqual(updatedScenario?.text, '')
    assert.strictEqual(updatedError, null)
  })

  it('update scenario if all fields are correct', async () => {
    const { scenario: createdScenario } = await create(
      {
        ...validScenarioAttributes,
      },
      scenarioManager
    )

    assert(createdScenario)

    let options: OptionsAlteration = {
      haveDisableAltitude: false,
      haveDisableLongitude: false,
      haveDisableLatitude: false,
      haveNoise: false,
      haveRealism: false,
      haveLabel: false,
    }
    const { scenario: updatedScenario, error: updatedError } =
      await updateScenario(
        createdScenario.id,
        'Scenario B',
        'cut all_planes at 5 seconds',
        options,
        scenarioManager
      )

    assert.strictEqual(updatedError, null)
    assert(updatedScenario)

    const existing = await scenarioManager.findScenario(updatedScenario.id)
    assert.deepStrictEqual(updatedScenario.name, existing?.name)
    assert.deepStrictEqual(updatedScenario.text, existing?.text)
  })

  it('trims the name and text before saving', async () => {
    const { scenario: createdScenario } = await create(
      {
        ...validScenarioAttributes,
      },
      scenarioManager
    )

    assert(createdScenario)
    let options: OptionsAlteration = {
      haveDisableAltitude: false,
      haveDisableLongitude: false,
      haveDisableLatitude: false,
      haveNoise: false,
      haveRealism: false,
      haveLabel: false,
    }
    const { scenario: updatedScenario, error: updatedError } =
      await updateScenario(
        createdScenario.id,
        '  Scenario B  ',
        '  cut all_planes at 5 seconds  ',
        options,
        scenarioManager
      )

    assert.strictEqual(updatedError, null)
    assert(updatedScenario)

    const existing = await scenarioManager.findScenario(updatedScenario.id)
    assert.strictEqual(existing?.name, 'Scenario B')
    assert.strictEqual(existing?.text, 'cut all_planes at 5 seconds')
  })
})
