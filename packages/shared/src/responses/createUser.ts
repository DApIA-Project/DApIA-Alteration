import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import {
  BadType,
  Conflict,
  Unauthorized,
  UnprocessableContent,
} from './responseError'

export type CreateUserResponse = DapiaAlterationResponse<
  { user: User | null },
  CreateUserError
>

export type CreateUserError =
  | Conflict.emailConflict
  | Unauthorized.authenticationRequired
  | UnprocessableContent.emptyEmail
  | UnprocessableContent.emptyPassword
  | BadType.optionsBadType

export const CreateUserError = {
  emailConflict: Conflict.emailConflict,
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyEmail: UnprocessableContent.emptyEmail,
  emptyPassword: UnprocessableContent.emptyPassword,
  optionsBadType: BadType.optionsBadType,
} as const
