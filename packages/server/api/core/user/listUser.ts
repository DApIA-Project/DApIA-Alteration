import {
  ListUserError,
  ListUserResponse,
} from '@smartesting/shared/dist/responses/listUser'
import IUserManager from '../../adapters/user/IUserManager'

export default async function listUser(
  userManager: IUserManager
): Promise<ListUserResponse> {
  const listUser = await userManager.listUsers()
  if (listUser.length === 0) {
    return { users: null, error: ListUserError.emptyListUser }
  } else {
    return { users: listUser, error: null }
  }
}
