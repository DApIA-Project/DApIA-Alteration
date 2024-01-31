import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import {
  CreateScenarioError,
  CreateScenarioResponse,
} from '@smartesting/shared/dist/responses/createScenario'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'

export default async function create(
  scenarioAttributes: ScenarioAttributes,
  scenarioManager: IScenarioManager
): Promise<CreateScenarioResponse> {
  const name = scenarioAttributes.name.trim()
  if (name === '')
    return { scenario: null, error: CreateScenarioError.emptyName }
  const text = scenarioAttributes.text.trim()
  if (text === null || text === undefined)
    return { scenario: null, error: CreateScenarioError.emptyTextScenario }

  return {
    scenario: await scenarioManager.createScenario({
      ...scenarioAttributes,
      name,
      text,
    }),
    error: null,
  }
}
