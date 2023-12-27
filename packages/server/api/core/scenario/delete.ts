import {
  DeleteScenarioError,
  DeleteScenarioResponse,
} from '@smartesting/shared/dist/responses/deleteScenario'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'

export default async function deleteScenario(
  scenarioId: string,
  scenarioManager: IScenarioManager
): Promise<DeleteScenarioResponse> {
  const existingScenario = await scenarioManager.findScenario(scenarioId)
  if (existingScenario === null) {
    return { error: DeleteScenarioError.scenarioNotFound }
  } else {
    await scenarioManager.deleteScenario(scenarioId)
    return { error: null }
  }
}
