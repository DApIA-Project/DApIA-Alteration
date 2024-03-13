import {
  FindScenarioError,
  FindScenarioResponse,
} from '@smartesting/shared/dist/responses/findScenario'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'

export default async function findScenario(
  id: number,
  scenarioManager: IScenarioManager
): Promise<FindScenarioResponse> {
  const scenario = await scenarioManager.findScenario(id)
  if (scenario === null) {
    return { scenario: null, error: FindScenarioError.scenarioNotFound }
  } else {
    return { scenario: scenario, error: null }
  }
}
