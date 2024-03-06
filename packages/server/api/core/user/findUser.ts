import {
  FindUserError,
  FindUserResponse,
} from '@smartesting/shared/dist/responses/findUser'
import IUserManager from '../../adapters/user/IUserManager'

export default async function findUser(
  id: number,
  userManager: IUserManager
): Promise<FindUserResponse> {
  const user = await userManager.findUser(id)
  if (user === null) {
    return { user: null, error: FindUserError.userNotFound }
  } else {
    return { user: user, error: null }
  }
}
