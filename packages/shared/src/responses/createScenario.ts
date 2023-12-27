import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { Unauthorized, UnprocessableContent } from './responseError'

export type CreateScenarioResponse = DapiaAlterationResponse<
  { scenario: Scenario | null },
  CreateScenarioError
>

export type CreateScenarioError =
  | Unauthorized.authenticationRequired
  | UnprocessableContent.emptyName
  | UnprocessableContent.emptyTextScenario

export const CreateScenarioError = {
  authenticationRequired: Unauthorized.authenticationRequired,
  emptyName: UnprocessableContent.emptyName,
  emptyTextScenario: UnprocessableContent.emptyTextScenario,
} as const
