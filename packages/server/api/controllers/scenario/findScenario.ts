import { FindScenarioResponse } from '@smartesting/shared/dist/responses/findScenario'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import findScenario from '../../core/scenario/findScenario'

type Body = Record<string, any>

export default makeRequestHandler<FindScenarioResponse>(
  async (req): Promise<FindScenarioResponse> => {
    const { scenarioManager } = req.adapters
    const id: number = req.body.id
    return await findScenario(id, scenarioManager)
  }
)
