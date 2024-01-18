import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/scenario/create'
import assert from 'assert'
import { DeleteScenarioError } from '@smartesting/shared/dist/responses/deleteScenario'
import deleteScenario from '../../../api/core/scenario/delete'
import { clearDb } from '../../clearDb'
describe('core/scenario/delete', () => {
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

  it('scenario exists', async () => {
    const { scenario: createdScenario } = await create(
      {
        ...validScenarioAttributes,
      },
      scenarioManager
    )

    assert(createdScenario)

    const { error: errorRemoved } = await deleteScenario(
      createdScenario.id,
      scenarioManager
    )
    assert.strictEqual(errorRemoved, null)
  })

  it('scenario not exists', async () => {
    const { error: errorRemoved } = await deleteScenario(
      '1234',
      scenarioManager
    )
    assert.strictEqual(errorRemoved, DeleteScenarioError.scenarioNotFound)
  })
})
