import { ListUserScenarioResponse } from '@smartesting/shared/dist/responses/listUserScenario'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import listUserScenario from '../../core/scenario/listUserScenario'
import { OptionsAlteration, Sort } from '@smartesting/shared/dist/index'

type Body = Record<string, any>

export default makeRequestHandler<ListUserScenarioResponse>(
  async (req): Promise<ListUserScenarioResponse> => {
    const { scenarioManager } = req.adapters
    const user_id: number = req.body.user_id
    const searchBar: string = req.body.searchBar
    const startDate: string = req.body.startDate
    const endDate: string = req.body.endDate
    const optionsAlteration: OptionsAlteration = req.body.optionsAlteration
    const sort: string = req.body.sort
    return await listUserScenario(
      scenarioManager,
      user_id,
      searchBar,
      startDate,
      endDate,
      optionsAlteration,
      sort
    )
  }
)
