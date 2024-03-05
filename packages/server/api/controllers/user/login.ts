import {
  LoginUserResponse,
  LoginUserError,
} from '@smartesting/shared/dist/responses/loginUser'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import login from '../../core/user/login'

type Body = Record<string, any>

export default makeRequestHandler<LoginUserResponse>(
  async (req): Promise<LoginUserResponse> => {
    const { userManager } = req.adapters
    const { error, loginAttributes } = validateLogin(req.body)
    if (error || !loginAttributes) return { error, user: null }
    return await login(loginAttributes, userManager)
  }
)

function validateLogin(body: Body): {
  error: LoginUserError | null
  loginAttributes: { email: string; password: string } | null
} {
  if (!body.email || typeof body.email !== 'string')
    return {
      error: LoginUserError.emptyEmail,
      loginAttributes: null,
    }

  if (!body.password || typeof body.password !== 'string')
    return {
      error: LoginUserError.emptyPassword,
      loginAttributes: null,
    }
  return {
    loginAttributes: {
      email: body.email,
      password: body.password,
    },
    error: null,
  }
}
