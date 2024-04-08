import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { BadType, NotFound } from './responseError'

export type DeleteScenarioResponse = DapiaAlterationResponse<
  {},
  DeleteScenarioError
>

export type DeleteScenarioError = NotFound.scenarioNotFound | BadType.idBadType

export const DeleteScenarioError = {
  scenarioNotFound: NotFound.scenarioNotFound,
  idBadType: BadType.idBadType,
} as const
