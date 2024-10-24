import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { BadType, Unauthorized, UnprocessableContent } from './responseError'

export type CreateScenarioResponse = DapiaAlterationResponse<
  { scenario: Scenario | null },
  CreateScenarioError
>

export type CreateScenarioError =
  | Unauthorized.authenticationRequired
  | UnprocessableContent.emptyName
  | UnprocessableContent.emptyTextScenario
  | UnprocessableContent.emptyUserId
  | BadType.optionsBadType

export const CreateScenarioError = {
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyName: UnprocessableContent.emptyName,
  emptyTextScenario: UnprocessableContent.emptyTextScenario,
  emptyUserId: UnprocessableContent.emptyUserId,
  optionsBadType: BadType.optionsBadType,
} as const
