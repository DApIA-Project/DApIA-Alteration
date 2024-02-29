import {
  UpdatePasswordUserError,
  UpdatePasswordUserResponse,
} from '@smartesting/shared/dist/responses/updatePasswordUser'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import { User } from '@smartesting/shared/dist/models/User'
import updatePassword from '../../core/user/updatePassword'
import IUserManager from '../../adapters/user/IUserManager'

type Body = Record<string, any>

export default makeRequestHandler<UpdatePasswordUserResponse>(
  async (req): Promise<UpdatePasswordUserResponse> => {
    const { userManager } = req.adapters
    const { error, user } = await validateUser(req.body, userManager)
    if (error || !user) return { error, user: null }
    return await updatePassword(user.id, user.password, userManager)
  }
)

async function validateUser(
  body: Body,
  userManager: IUserManager
): Promise<{
  error: UpdatePasswordUserError | null
  user: User | null
}> {
  if (!body.password || typeof body.password !== 'string')
    return {
      error: UpdatePasswordUserError.emptyPassword,
      user: null,
    }

  const userBefore: User | null = await userManager.findUser(body.id)
  if (!userBefore) {
    return {
      error: UpdatePasswordUserError.userNotFound,
      user: null,
    }
  }

  return {
    user: {
      id: body.id,
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      isAdmin: body.isAdmin,
      createdAt: userBefore.createdAt,
      updatedAt: userBefore.updatedAt,
    },
    error: null,
  }
}
