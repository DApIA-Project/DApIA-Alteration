import {
  DeleteUserError,
  DeleteUserResponse,
} from '@smartesting/shared/dist/responses/deleteUser'
import IUserManager from '../../adapters/user/IUserManager'

export default async function deleteUser(
  userId: number,
  userManager: IUserManager
): Promise<DeleteUserResponse> {
  const existingUser = await userManager.findUser(userId)
  if (existingUser === null) {
    return { error: DeleteUserError.userNotFound }
  } else {
    await userManager.deleteUser(userId)
    return { error: null }
  }
}
