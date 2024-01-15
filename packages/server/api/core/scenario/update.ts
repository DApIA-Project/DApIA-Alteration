import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import {
  UpdateScenarioError,
  UpdateScenarioResponse,
} from '@smartesting/shared/dist/responses/updateScenario'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'
import { UnprocessableContent } from '@smartesting/shared/dist/responses/responseError'
export default async function updateScenario(
  scenarioId: string,
  name: string,
  text: string,
  scenarioManager: IScenarioManager
): Promise<UpdateScenarioResponse> {
  const newName = name.trim()
  if (newName.length === 0)
    return { error: UnprocessableContent.emptyName, scenario: null }
  const newText = text.trim()
  /*if (newText.length === 0)
    return { error: UnprocessableContent.emptyTextScenario, scenario: null }*/
  const updatedScenario = await scenarioManager.updateScenario(scenarioId, {
    name: newName,
    text: newText,
  })
  return { error: null, scenario: updatedScenario }
}
