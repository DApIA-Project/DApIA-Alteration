import {
  ListScenarioError,
  ListScenarioResponse,
} from '@smartesting/shared/dist/responses/listScenario'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'

export default async function listScenario(
  scenarioManager: IScenarioManager
): Promise<ListScenarioResponse> {
  const listScenario = await scenarioManager.listScenarios()
  if (listScenario.length === 0) {
    return { scenarios: null, error: ListScenarioError.emptyListScenario }
  } else {
    return { scenarios: listScenario, error: null }
  }
}
