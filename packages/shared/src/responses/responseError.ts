export enum Unauthorized {
  authenticationRequired = 'authentication_required',
}

export enum UnprocessableContent {
  emptyName = 'empty_name',
  emptyTextScenario = 'empty_text_scenario',
  emptyListScenario = 'empty_list_scenario',
}

export enum NotFound {
  scenarioNotFound = 'scenario_not_found',
}

export enum BadType {
  optionsBadType = 'options_bad_type',
  idBadType = 'id_bad_type',
}

export type ResponseError =
  | Unauthorized
  | UnprocessableContent
  | NotFound
  | BadType

export function getStatusCode<E extends ResponseError>(error: E): number {
  if (isError(error, Object.values(Unauthorized))) {
    return 401
  }
  if (isError(error, Object.values(NotFound))) {
    return 404
  }
  if (
    isError(error, Object.values(UnprocessableContent)) ||
    isError(error, Object.values(BadType))
  ) {
    return 422
  }
  throw new Error('Error ' + error + ' has not been mapped to a status code')
}

function isError(error: string, values: string[]): boolean {
  return values.includes(error)
}
