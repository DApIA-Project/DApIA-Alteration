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
  | BadType.optionsBadType
  | NotFound.userNotFound

export const UpdateUserError = {
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyTextScenario: UnprocessableContent.emptyEmail,
  optionsBadType: BadType.optionsBadType,
  scenarioNotFound: NotFound.userNotFound,
} as const
