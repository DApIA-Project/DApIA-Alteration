import IScenarioManager from '../../../api/adapters/scenario/IScenarioManager'
import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import makeTestAdapters from '../../makeTestAdapters'
import listScenario from '../../../api/core/scenario/listScenario'
import assert from 'assert'
import { ListScenarioError } from '@smartesting/shared/dist/responses/listScenario'
import { clearDb } from '../../clearDb'

describe('core/scenario/listScenario', () => {
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
  })

  afterEach(async () => {
    await clearDb()
  })

  it('list scenario is valid with 3 scenarios', async () => {
    await scenarioManager.createScenario(validScenarioAttributes)
    await scenarioManager.createScenario(validScenarioAttributes2)
    await scenarioManager.createScenario(validScenarioAttributes3)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listScenario(scenarioManager)
    assert(listedScenario)
    assert.equal(listedScenario.length, 3)
    assert.strictEqual(errorListScenario, null)
  })

  it('list scenario is empty', async () => {
    const { scenarios: listedScenario, error: errorListScenario } =
      await listScenario(scenarioManager)
    assert(errorListScenario)
    assert.strictEqual(errorListScenario, ListScenarioError.emptyListScenario)
    assert.strictEqual(listedScenario, null)
  })

  it('list scenario is empty after create et delete', async () => {
    let createdScenario = await scenarioManager.createScenario(
      validScenarioAttributes
    )
    assert(createdScenario)
    await scenarioManager.deleteScenario(createdScenario.id)
    const { scenarios: listedScenario, error: errorListScenario } =
      await listScenario(scenarioManager)
    assert(errorListScenario)
    assert.strictEqual(errorListScenario, ListScenarioError.emptyListScenario)
    assert.strictEqual(listedScenario, null)
  })
})
