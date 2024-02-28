import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { Unauthorized, UnprocessableContent } from './responseError'

export type ListUserScenarioResponse = DapiaAlterationResponse<
  { scenarios: readonly Scenario[] | null },
  ListUserScenarioError
>

export type ListUserScenarioError = UnprocessableContent.emptyListScenario

export const ListUserScenarioError = {
  emptyListScenario: UnprocessableContent.emptyListScenario,
} as const
