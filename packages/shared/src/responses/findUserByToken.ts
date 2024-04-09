import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import { Unauthorized, UnprocessableContent } from './responseError'

export type FindUserByTokenResponse = DapiaAlterationResponse<
  { user: User | null },
  FindUserByTokenError
>

export type FindUserByTokenError = UnprocessableContent.emptyUserByToken

export const FindUserByTokenError = {
  emptyUserByToken: UnprocessableContent.emptyUserByToken,
} as const
