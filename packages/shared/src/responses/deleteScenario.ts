import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Scenario } from '../models/Scenario'
import {
  BadType,
  NotFound,
  Unauthorized,
  UnprocessableContent,
} from './responseError'

export type DeleteScenarioResponse = DapiaAlterationResponse<
  {},
  DeleteScenarioError
>

export type DeleteScenarioError = NotFound.scenarioNotFound | BadType.idBadType

export const DeleteScenarioError = {
  scenarioNotFound: NotFound.scenarioNotFound,
  idBadType: BadType.idBadType,
} as const
