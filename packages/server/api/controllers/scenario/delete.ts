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
    const { error, id } = validateId(req.userId)
    if (error || !id) return { error }
    return await deleteScenario(id, scenarioManager)
  }
)

function validateId(user_id: number): {
  error: DeleteScenarioError | null
  id: number | null
} {
  if (typeof user_id !== 'number') {
    return {
      error: DeleteScenarioError.idBadType,
      id: null,
    }
  }

  return {
    id: user_id,
    error: null,
  }
}
