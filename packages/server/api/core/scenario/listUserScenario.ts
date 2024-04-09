import {
  ListUserScenarioError,
  ListUserScenarioResponse,
} from '@smartesting/shared/dist/responses/listUserScenario'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'
import { OptionsAlteration, Sort } from '@smartesting/shared/dist/index'

export default async function listUserScenario(
  scenarioManager: IScenarioManager,
  user_id: number,
  searchBar?: string,
  startDate?: string,
  endDate?: string,
  optionAlteration?: OptionsAlteration,
  sort?: string
): Promise<ListUserScenarioResponse> {
  const listUserScenario = await scenarioManager.listUserScenario(
    user_id,
    searchBar,
    startDate,
    endDate,
    optionAlteration,
    sort
  )
  if (listUserScenario.length === 0) {
    return { scenarios: null, error: ListUserScenarioError.emptyListScenario }
  } else {
    return { scenarios: listUserScenario, error: null }
  }
}
