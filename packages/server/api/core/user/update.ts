import { OptionsAlteration } from '@smartesting/shared/dist/models'
import {
  UpdateUserError,
  UpdateUserResponse,
} from '@smartesting/shared/dist/responses/updateUser'
import IUserManager from '../../adapters/user/IUserManager'
import { UnprocessableContent } from '@smartesting/shared/dist/responses/responseError'
export default async function updateUser(
  userId: number,
  email: string,
  userManager: IUserManager
): Promise<UpdateUserResponse> {
  const newEmail = email.trim()
  if (newEmail.length === 0)
    return { error: UnprocessableContent.emptyEmail, user: null }
  const updatedUser = await userManager.updateUser(userId, {
    email: newEmail,
  })
  return { error: null, user: updatedUser }
}
