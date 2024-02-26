import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { User } from '../models/User'
import {
  BadType,
  NotFound,
  Unauthorized,
  UnprocessableContent,
} from './responseError'

export type DeleteUserResponse = DapiaAlterationResponse<{}, DeleteUserError>

export type DeleteUserError = NotFound.userNotFound | BadType.idBadType

export const DeleteUserError = {
  userNotFound: NotFound.userNotFound,
  idBadType: BadType.idBadType,
} as const
