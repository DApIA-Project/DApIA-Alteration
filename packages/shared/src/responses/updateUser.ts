import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import {
  BadType,
  NotFound,
  Unauthorized,
  UnprocessableContent,
} from './responseError'

export type UpdateUserResponse = DapiaAlterationResponse<
  { user: User | null },
  UpdateUserError
>

export type UpdateUserError =
  | Unauthorized.authenticationRequired
  | UnprocessableContent.emptyEmail
  | UnprocessableContent.emptyFirstname
  | UnprocessableContent.emptyLastname
  | UnprocessableContent.emptyPassword
  | BadType.optionsBadType
  | NotFound.userNotFound

export const UpdateUserError = {
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyEmail: UnprocessableContent.emptyEmail,
  emptyFirstname: UnprocessableContent.emptyFirstname,
  emptyLastname: UnprocessableContent.emptyLastname,
  emptyPassword: UnprocessableContent.emptyPassword,
  optionsBadType: BadType.optionsBadType,
  userNotFound: NotFound.userNotFound,
} as const
