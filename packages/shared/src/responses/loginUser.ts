import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import { Conflict, NotFound, UnprocessableContent } from './responseError'

export type LoginUserResponse = DapiaAlterationResponse<
  { user: User | null },
  LoginUserError
>

export type LoginUserError =
  | NotFound.userNotFound
  | Conflict.passwordConflict
  | UnprocessableContent.emptyEmail
  | UnprocessableContent.emptyPassword

export const LoginUserError = {
  userNotFound: NotFound.userNotFound,
  passwordConflict: Conflict.passwordConflict,
  emptyEmail: UnprocessableContent.emptyEmail,
  emptyPassword: UnprocessableContent.emptyPassword,
} as const
