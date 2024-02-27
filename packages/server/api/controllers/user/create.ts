import {
  CreateUserError,
  CreateUserResponse,
} from '@smartesting/shared/dist/responses/createUser'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import create from '../../core/user/create'

type Body = Record<string, any>

export default makeRequestHandler<CreateUserResponse>(
  async (req): Promise<CreateUserResponse> => {
    const { userManager } = req.adapters
    const { error, userAttributes } = validateUser(req.body)
    if (error || !userAttributes) return { error, user: null }
    return await create(userAttributes, userManager)
  }
)

function validateUser(body: Body): {
  error: CreateUserError | null
  userAttributes: UserAttributes | null
} {
  if (!body.firstname || typeof body.firstname !== 'string')
    return {
      error: CreateUserError.emptyFirstname,
      userAttributes: null,
    }

  if (!body.lastname || typeof body.lastname !== 'string')
    return {
      error: CreateUserError.emptyLastname,
      userAttributes: null,
    }

  if (!body.email || typeof body.email !== 'string')
    return {
      error: CreateUserError.emptyEmail,
      userAttributes: null,
    }

  if (!body.password || typeof body.password !== 'string')
    return {
      error: CreateUserError.emptyPassword,
      userAttributes: null,
    }

  if (typeof body.isAdmin !== 'boolean') {
    return {
      error: CreateUserError.optionsBadType,
      userAttributes: null,
    }
  }

  return {
    userAttributes: {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      isAdmin: body.isAdmin,
    },
    error: null,
  }
}
