import {
  DeleteUserError,
  DeleteUserResponse,
} from '@smartesting/shared/dist/responses/deleteUser'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import deleteUser from '../../core/user/delete'

type Body = Record<string, any>

export default makeRequestHandler<DeleteUserResponse>(
  async (req): Promise<DeleteUserResponse> => {
    const { userManager } = req.adapters
    const { error, id } = validateId(req.body)
    if (error || !id) return { error }
    return await deleteUser(id, userManager)
  }
)

function validateId(body: Body): {
  error: DeleteUserError | null
  id: number | null
} {
  if (typeof body.id !== 'number') {
    return {
      error: DeleteUserError.idBadType,
      id: null,
    }
  }

  return {
    id: body.id,
    error: null,
  }
}
