import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { NotFound, Unauthorized, UnprocessableContent } from './responseError'

export type FindScenarioResponse = DapiaAlterationResponse<
  { scenario: Scenario | null },
  FindScenarioError
>

export type FindScenarioError = NotFound.scenarioNotFound

export const FindScenarioError = {
  scenarioNotFound: NotFound.scenarioNotFound,
} as const
