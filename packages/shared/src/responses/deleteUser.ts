import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import {
  BadType,
  Conflict,
  NotFound,
  Unauthorized,
  UnprocessableContent,
} from './responseError'

export type DeleteUserResponse = DapiaAlterationResponse<{}, DeleteUserError>

export type DeleteUserError =
  | NotFound.userNotFound
  | BadType.idBadType
  | Conflict.passwordConflict

export const DeleteUserError = {
  userNotFound: NotFound.userNotFound,
  idBadType: BadType.idBadType,
  passwordConflict: Conflict.passwordConflict,
} as const
