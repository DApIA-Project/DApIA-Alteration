//401
export enum Unauthorized {
  authenticationRequired = 'authentication_required',
}

//403
export enum Forbidden {
  accessDenied = 'access_denied',
}

//404
export enum NotFound {
  scenarioNotFound = 'scenario_not_found',
  userNotFound = 'user_not_found',
}

//409
export enum Conflict {
  emailConflict = 'email_already_used',
}

//422
export enum UnprocessableContent {
  emptyName = 'empty_name',
  emptyTextScenario = 'empty_text_scenario',
  emptyListScenario = 'empty_list_scenario',
  emptyListUser = 'empty_list_user',
  emptyEmail = 'empty_email',
  emptyFirstname = 'empty_firstname',
  emptyLastname = 'empty_lastname',
  emptyPassword = 'empty_password',
}

//422
export enum BadType {
  optionsBadType = 'options_bad_type',
  idBadType = 'id_bad_type',
}

//422
export enum Invalid {
  invalidFormat = 'invalid_format',
  invalidSyntax = 'invalid_syntax',
  invalidContentFile = 'invalid_content_file',
}

//500
export enum InternalServerError {
  internalError = 'internal_error',
}

export type ResponseError =
  | Unauthorized
  | Forbidden
  | UnprocessableContent
  | NotFound
  | BadType
  | Invalid
  | Conflict
  | InternalServerError

export function getStatusCode<E extends ResponseError>(error: E): number {
  if (isError(error, Object.values(Unauthorized))) {
    return 401
  }
  if (isError(error, Object.values(Forbidden))) {
    return 403
  }
  if (isError(error, Object.values(NotFound))) {
    return 404
  }
  if (isError(error, Object.values(Conflict)))
    if (
      isError(error, Object.values(UnprocessableContent)) ||
      isError(error, Object.values(BadType)) ||
      isError(error, Object.values(Invalid))
    ) {
      return 422
    }
  if (isError(error, Object.values(InternalServerError))) {
    return 500
  }
  throw new Error('Error ' + error + ' has not been mapped to a status code')
}

function isError(error: string, values: string[]): boolean {
  return values.includes(error)
}
