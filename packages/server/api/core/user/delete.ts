import {
  DeleteUserError,
  DeleteUserResponse,
} from '@smartesting/shared/dist/responses/deleteUser'
import IUserManager from '../../adapters/user/IUserManager'
import { comparePassword } from '../../utils/user'

export default async function deleteUser(
  userId: number,
  password: string,
  userManager: IUserManager
): Promise<DeleteUserResponse> {
  const existingUser = await userManager.findUser(userId)
  if (existingUser === null) {
    return { error: DeleteUserError.userNotFound }
  } else {
    const [pass, error] = await comparePassword(existingUser, password)
    if (pass) {
      await userManager.deleteUser(userId)
      return { error: null }
    } else {
      return { error: DeleteUserError.passwordConflict }
    }
  }
}
