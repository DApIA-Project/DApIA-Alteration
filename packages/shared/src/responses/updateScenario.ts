import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { BadType, Unauthorized, UnprocessableContent } from './responseError'

export type UpdateScenarioResponse = DapiaAlterationResponse<
  { scenario: Scenario | null },
  UpdateScenarioError
>

export type UpdateScenarioError =
  | Unauthorized.authenticationRequired
  | UnprocessableContent.emptyName
  | UnprocessableContent.emptyTextScenario
  | BadType.optionsBadType

export const UpdateScenarioError = {
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyName: UnprocessableContent.emptyName,
  emptyTextScenario: UnprocessableContent.emptyTextScenario,
  optionsBadType: BadType.optionsBadType,
} as const
