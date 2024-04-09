import {
  DeleteScenarioError,
  DeleteScenarioResponse,
} from '@smartesting/shared/dist/responses/deleteScenario'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import deleteScenario from '../../core/scenario/delete'

type Body = Record<string, any>

export default makeRequestHandler<DeleteScenarioResponse>(
  async (req): Promise<DeleteScenarioResponse> => {
    const { scenarioManager } = req.adapters
    const { error, id } = validateId(req.body)
    if (error || !id) return { error }
    return await deleteScenario(id, scenarioManager)
  }
)

function validateId(body: Body): {
  error: DeleteScenarioError | null
  id: number | null
} {
  if (typeof body.id !== 'number') {
    return {
      error: DeleteScenarioError.idBadType,
      id: null,
    }
  }

  return {
    id: body.id,
    error: null,
  }
}
