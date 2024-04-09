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
    const { error, user } = await validateUser(req.body, userManager)
    if (error || !user) return { error, user: null }
    return await update(
      user.id,
      user.firstname,
      user.lastname,
      user.email,
      user.isAdmin,
      userManager
    )
  }
)

async function validateUser(
  body: Body,
  userManager: IUserManager
): Promise<{
  error: UpdateUserError | null
  user: User | null
}> {
  if (!body.firstname || typeof body.firstname !== 'string')
    return {
      error: UpdateUserError.emptyFirstname,
      user: null,
    }
  if (!body.lastname || typeof body.lastname !== 'string')
    return {
      error: UpdateUserError.emptyLastname,
      user: null,
    }
  if (!body.email || typeof body.email !== 'string')
    return {
      error: UpdateUserError.emptyEmail,
      user: null,
    }

  const userBefore: User | null = await userManager.findUser(body.id)
  if (!userBefore) {
    return {
      error: UpdateUserError.userNotFound,
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
