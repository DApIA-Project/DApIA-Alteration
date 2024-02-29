import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import {
  BadType,
  NotFound,
  Unauthorized,
  UnprocessableContent,
} from './responseError'

export type UpdatePasswordUserResponse = DapiaAlterationResponse<
  { user: User | null },
  UpdatePasswordUserError
>

export type UpdatePasswordUserError =
  | Unauthorized.authenticationRequired
  | UnprocessableContent.emptyPassword
  | NotFound.userNotFound

export const UpdatePasswordUserError = {
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyPassword: UnprocessableContent.emptyPassword,
  userNotFound: NotFound.userNotFound,
} as const
