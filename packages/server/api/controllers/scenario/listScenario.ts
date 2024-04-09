import { ListScenarioResponse } from '@smartesting/shared/dist/responses/listScenario'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import listScenario from '../../core/scenario/listScenario'

type Body = Record<string, any>

export default makeRequestHandler<ListScenarioResponse>(
  async (req): Promise<ListScenarioResponse> => {
    const { scenarioManager } = req.adapters
    return await listScenario(scenarioManager)
  }
)
