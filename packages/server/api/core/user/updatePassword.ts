import { OptionsAlteration } from '@smartesting/shared/dist/models'
import {
  UpdatePasswordUserError,
  UpdatePasswordUserResponse,
} from '@smartesting/shared/dist/responses/updatePasswordUser'
import IUserManager from '../../adapters/user/IUserManager'
import { UnprocessableContent } from '@smartesting/shared/dist/responses/responseError'
export default async function updatePassword(
  userId: number,
  password: string,
  userManager: IUserManager
): Promise<UpdatePasswordUserResponse> {
  if (password.trim().length === 0)
    return { error: UnprocessableContent.emptyPassword, user: null }
  const updatedUser = await userManager.updatePassword(userId, password)
  return { error: null, user: updatedUser }
}
