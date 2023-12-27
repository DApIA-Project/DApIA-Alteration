import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import { NotFound, Unauthorized, UnprocessableContent } from './responseError'

export type DeleteScenarioResponse = DapiaAlterationResponse<
  {},
  DeleteScenarioError
>

export type DeleteScenarioError = NotFound.scenarioNotFound

export const DeleteScenarioError = {
  scenarioNotFound: NotFound.scenarioNotFound,
} as const
