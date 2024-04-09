import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import {
  BadType,
  NotFound,
  Unauthorized,
  UnprocessableContent,
} from './responseError'

export type UpdatePasswordUserResponse = DapiaAlterationResponse<
  { user: { id: number; password: string; newPassword: string } | null },
  UpdatePasswordUserError
>

export type UpdatePasswordUserError =
  | Unauthorized.authenticationRequired
  | UnprocessableContent.emptyPassword
  | UnprocessableContent.emptyNewPassword
  | NotFound.userNotFound

export const UpdatePasswordUserError = {
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyPassword: UnprocessableContent.emptyPassword,
  emptyNewPassword: UnprocessableContent.emptyNewPassword,
  userNotFound: NotFound.userNotFound,
} as const
