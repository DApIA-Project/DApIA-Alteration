import {
  FindUserByTokenError,
  FindUserByTokenResponse,
} from '@smartesting/shared/dist/responses/findUserByToken'
import IUserManager from '../../adapters/user/IUserManager'

export default async function findUserByToken(
  token: string,
  userManager: IUserManager
): Promise<FindUserByTokenResponse> {
  const userByToken = await userManager.findUserByToken(token)
  if (userByToken === null) {
    return { user: null, error: FindUserByTokenError.emptyUserByToken }
  } else {
    return { user: userByToken, error: null }
  }
}
