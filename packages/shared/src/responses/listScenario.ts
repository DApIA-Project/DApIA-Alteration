import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { Unauthorized, UnprocessableContent } from './responseError'

export type ListScenarioResponse = DapiaAlterationResponse<
  { scenarios: readonly Scenario[] | null },
  ListScenarioError
>

export type ListScenarioError = UnprocessableContent.emptyListScenario

export const ListScenarioError = {
  emptyListScenario: UnprocessableContent.emptyListScenario,
} as const
