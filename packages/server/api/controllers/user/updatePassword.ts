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
    const { error, user } = await validateUser(
      req.body,
      req.userId,
      userManager
    )
    if (error || !user) return { error, user: null }
    const { error: errorUpdated, user: updatedUser } = await updatePassword(
      user.id,
      user.password,
      user.newPassword,
      userManager
    )
    if (errorUpdated || !updatedUser) return { error: errorUpdated, user: null }
    return {
      error: null,
      user: {
        id: updatedUser.id,
        password: updatedUser?.password,
        newPassword: '',
      },
    }
  }
)

async function validateUser(
  body: Body,
  user_id: number,
  userManager: IUserManager
): Promise<{
  error: UpdatePasswordUserError | null
  user: { id: number; password: string; newPassword: string } | null
}> {
  if (!body.password || typeof body.password !== 'string')
    return {
      error: UpdatePasswordUserError.emptyPassword,
      user: null,
    }

  if (!body.newPassword || typeof body.newPassword !== 'string')
    return {
      error: UpdatePasswordUserError.emptyNewPassword,
      user: null,
    }
  const userBefore: User | null = await userManager.findUser(user_id)
  if (!userBefore) {
    return {
      error: UpdatePasswordUserError.userNotFound,
      user: null,
    }
  }

  return {
    user: {
      id: user_id,
      password: body.password,
      newPassword: body.newPassword,
    },
    error: null,
  }
}
