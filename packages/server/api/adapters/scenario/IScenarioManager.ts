import {
  ScenarioAttributes,
  Scenario,
} from '@smartesting/shared/dist/models/Scenario'

export default interface IScenarioManager {
  createScenario(scenario: ScenarioAttributes): Promise<Scenario>

  updateScenario(
    scenarioId: string,
    updatedData: Partial<ScenarioAttributes>
  ): Promise<Scenario | null>

  deleteScenario(scenarioId: string): Promise<void>

  findScenario(scenarioId: string): Promise<Scenario | null>

  hasText(scenarioId: string, text: string): Promise<boolean>

  listScenarios(): Promise<ReadonlyArray<Scenario>>
}
