import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { Unauthorized, UnprocessableContent } from './responseError'

export type ListUserScenarioResponse = DapiaAlterationResponse<
  { scenarios: readonly Scenario[] | null },
  ListUserScenariosError
>

export type ListUserScenariosError = UnprocessableContent.emptyListScenario

export const ListUserScenariosError = {
  emptyListScenario: UnprocessableContent.emptyListScenario,
} as const
