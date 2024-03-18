import {
  ScenarioAttributes,
  Scenario,
} from '@smartesting/shared/dist/models/Scenario'
import { OptionsAlteration } from '@smartesting/shared/dist/index'

export default interface IScenarioManager {
  createScenario(
    scenario: ScenarioAttributes,
    user_id: number
  ): Promise<Scenario>

  updateScenario(
    scenarioId: number,
    updatedData: Partial<ScenarioAttributes>
  ): Promise<Scenario | null>

  deleteScenario(scenarioId: number): Promise<void>

  findScenario(scenarioId: number): Promise<Scenario | null>

  listScenarios(): Promise<ReadonlyArray<Scenario>>

  listUserScenario(
    user_id: number,
    searchBar?: string,
    startDate?: string,
    endDate?: string,
    optionsAlteration?: OptionsAlteration
  ): Promise<ReadonlyArray<Scenario>>
}
