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

export type ResponseError = Unauthorized | UnprocessableContent | NotFound
