import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import { Unauthorized, UnprocessableContent } from './responseError'

export type FindUserByEmailResponse = DapiaAlterationResponse<
  { user: User | null },
  FindUserByEmailError
>

export type FindUserByEmailError = UnprocessableContent.emptyUserByEmail

export const FindUserByEmailError = {
  emptyUserByEmail: UnprocessableContent.emptyUserByEmail,
} as const
