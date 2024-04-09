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
    const { error, id, password } = validateId(req.body)
    if (error || !id || !password) return { error }
    return await deleteUser(id, password, userManager)
  }
)

function validateId(body: Body): {
  error: DeleteUserError | null
  id: number | null
  password: string | null
} {
  if (typeof body.id !== 'number' || typeof body.password !== 'string') {
    return {
      error: DeleteUserError.idBadType,
      id: null,
      password: null,
    }
  }

  return {
    id: body.id,
    password: body.password,
    error: null,
  }
}
