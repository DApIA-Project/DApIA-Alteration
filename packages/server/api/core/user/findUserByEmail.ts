import {
  FindUserByEmailError,
  FindUserByEmailResponse,
} from '@smartesting/shared/dist/responses/findUserByEmail'
import IUserManager from '../../adapters/user/IUserManager'

export default async function findUserByEmail(
  email: string,
  userManager: IUserManager
): Promise<FindUserByEmailResponse> {
  const userByEmail = await userManager.findUserByEmail(email)
  if (userByEmail === null) {
    return { user: null, error: FindUserByEmailError.emptyUserByEmail }
  } else {
    return { user: userByEmail, error: null }
  }
}
