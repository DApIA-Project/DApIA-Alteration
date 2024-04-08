import { UserAttributes } from '@smartesting/shared/dist/models/User'
import {
  CreateUserError,
  CreateUserResponse,
} from '@smartesting/shared/dist/responses/createUser'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'
import IUserManager from '../../adapters/user/IUserManager'

export default async function create(
  userAttributes: UserAttributes,
  userManager: IUserManager
): Promise<CreateUserResponse> {
  const email = userAttributes.email.trim()
  if (email === '') return { user: null, error: CreateUserError.emptyEmail }
  const findUser = await userManager.findUserByEmail(email)
  if (findUser !== null) {
    return { user: null, error: CreateUserError.emailConflict }
  }
  const password = userAttributes.password.trim()
  if (password === '')
    return { user: null, error: CreateUserError.emptyPassword }

  return {
    user: await userManager.createUser({
      ...userAttributes,
      email,
      password,
    }),
    error: null,
  }
}
