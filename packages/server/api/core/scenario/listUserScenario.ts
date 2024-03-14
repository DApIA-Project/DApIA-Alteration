import {
  ListUserScenarioError,
  ListUserScenarioResponse,
} from '@smartesting/shared/dist/responses/listUserScenario'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'

export default async function listUserScenario(
  scenarioManager: IScenarioManager,
  user_id: number,
  searchBar?: string
): Promise<ListUserScenarioResponse> {
  const listUserScenario = await scenarioManager.listUserScenario(
    user_id,
    searchBar
  )
  if (listUserScenario.length === 0) {
    return { scenarios: null, error: ListUserScenarioError.emptyListScenario }
  } else {
    return { scenarios: listUserScenario, error: null }
  }
}
