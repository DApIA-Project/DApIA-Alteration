import {
  UpdateUserError,
  UpdateUserResponse,
} from '@smartesting/shared/dist/responses/updateUser'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import { User } from '@smartesting/shared/dist/models/User'
import update from '../../core/user/update'
import IUserManager from '../../adapters/user/IUserManager'

type Body = Record<string, any>

export default makeRequestHandler<UpdateUserResponse>(
  async (req): Promise<UpdateUserResponse> => {
    const { userManager } = req.adapters
    const { error, user } = await validateUser(
      req.body,
      req.userId,
      userManager
    )
    if (error || !user) return { error, user: null }
    return await update(user.id, user.email, userManager)
  }
)

async function validateUser(
  body: Body,
  user_id: number,
  userManager: IUserManager
): Promise<{
  error: UpdateUserError | null
  user: User | null
}> {
  if (!body.email || typeof body.email !== 'string')
    return {
      error: UpdateUserError.emptyEmail,
      user: null,
    }

  const userBefore: User | null = await userManager.findUser(user_id)
  if (!userBefore) {
    return {
      error: UpdateUserError.userNotFound,
      user: null,
    }
  }

  return {
    user: {
      id: user_id,
      email: body.email,
      password: body.password,
      token: body.token,
      createdAt: userBefore.createdAt,
      updatedAt: userBefore.updatedAt,
    },
    error: null,
  }
}
