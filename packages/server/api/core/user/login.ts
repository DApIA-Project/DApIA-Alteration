import {
  LoginUserError,
  LoginUserResponse,
} from '@smartesting/shared/dist/responses/loginUser'
import IUserManager from '../../adapters/user/IUserManager'

export default async function login(
  loginAttributes: { email: string; password: string },
  userManager: IUserManager
): Promise<LoginUserResponse> {
  const userByEmail = await userManager.findUserByEmail(loginAttributes.email)
  if (userByEmail === null) {
    return { user: null, error: LoginUserError.userNotFound }
  } else {
    const user = await userManager.login(
      loginAttributes.email,
      loginAttributes.password
    )
    if (user !== null) {
      return { user: user, error: null }
    } else {
      return { user: null, error: LoginUserError.passwordConflict }
    }
  }
}
