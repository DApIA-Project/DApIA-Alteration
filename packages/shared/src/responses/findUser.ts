import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import { NotFound, Unauthorized, UnprocessableContent } from './responseError'

export type FindUserResponse = DapiaAlterationResponse<
  { user: User | null },
  FindUserError
>

export type FindUserError = NotFound.userNotFound

export const FindUserError = {
  userNotFound: NotFound.userNotFound,
} as const
