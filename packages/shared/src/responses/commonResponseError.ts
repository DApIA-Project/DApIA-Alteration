import { Forbidden, Unauthorized } from './responseError'

export type CommonResponseError =
  | Forbidden.accessDenied
  | Unauthorized.authenticationRequired

export const CommonResponseError = {
  accessDenied: Forbidden.accessDenied,
  authenticationRequired: Unauthorized.authenticationRequired,
} as const
