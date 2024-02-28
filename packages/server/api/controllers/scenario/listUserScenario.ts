import { ListUserScenarioResponse } from '@smartesting/shared/dist/responses/listUserScenario'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import listUserScenario from '../../core/scenario/listUserScenario'

type Body = Record<string, any>

export default makeRequestHandler<ListUserScenarioResponse>(
  async (req): Promise<ListUserScenarioResponse> => {
    const { scenarioManager } = req.adapters
    const user_id: number = req.body.user_id
    return await listUserScenario(scenarioManager, user_id)
  }
)
