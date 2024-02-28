import { OptionsAlteration } from '@smartesting/shared/dist/models'
import {
  UpdateUserError,
  UpdateUserResponse,
} from '@smartesting/shared/dist/responses/updateUser'
import IUserManager from '../../adapters/user/IUserManager'
import { UnprocessableContent } from '@smartesting/shared/dist/responses/responseError'
export default async function updateUser(
  userId: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  isAdmin: boolean,
  userManager: IUserManager
): Promise<UpdateUserResponse> {
  const newFirstname = firstname.trim()
  if (newFirstname.length === 0)
    return { error: UnprocessableContent.emptyFirstname, user: null }
  const newLastname = lastname.trim()
  if (newLastname.length === 0)
    return { error: UnprocessableContent.emptyLastname, user: null }
  const newEmail = email.trim()
  if (newEmail.length === 0)
    return { error: UnprocessableContent.emptyEmail, user: null }
  if (password.trim().length === 0)
    return { error: UnprocessableContent.emptyPassword, user: null }
  const updatedUser = await userManager.updateUser(userId, {
    firstname: newFirstname,
    lastname: newLastname,
    email: newEmail,
    password: password,
    isAdmin: isAdmin,
  })
  return { error: null, user: updatedUser }
}
