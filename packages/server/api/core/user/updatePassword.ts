import {
  UpdatePasswordUserError,
  UpdatePasswordUserResponse,
} from '@smartesting/shared/dist/responses/updatePasswordUser'
import IUserManager from '../../adapters/user/IUserManager'
import {
  NotFound,
  UnprocessableContent,
} from '@smartesting/shared/dist/responses/responseError'
import { User } from '@smartesting/shared/dist/models/User'

export default async function updatePassword(
  userId: number,
  password: string,
  newPassword: string,
  userManager: IUserManager
): Promise<{
  error: UpdatePasswordUserError | null
  user: { id: number; password: string; newPassword: string } | null
}> {
  if (password.trim().length === 0)
    return { error: UnprocessableContent.emptyPassword, user: null }
  if (newPassword.trim().length === 0)
    return { error: UnprocessableContent.emptyNewPassword, user: null }
  const updatedUser = await userManager.updatePassword(
    userId,
    password,
    newPassword
  )
  if (updatedUser !== null) return { error: null, user: updatedUser }
  return { error: NotFound.userNotFound, user: null }
}
