import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import { Unauthorized, UnprocessableContent } from './responseError'

export type ListUserResponse = DapiaAlterationResponse<
  { users: readonly User[] | null },
  ListUserError
>

export type ListUserError = UnprocessableContent.emptyListUser

export const ListUserError = {
  emptyListUser: UnprocessableContent.emptyListUser,
} as const
