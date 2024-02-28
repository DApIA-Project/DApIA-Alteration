import IScenarioManager from './IScenarioManager'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class MemoryScenarioManager implements IScenarioManager {
  constructor(
    private readonly scenariosById = new Map<number, Scenario>(),
    private readonly userIdByScenarioId = new Map<number, number>()
  ) {}

  async createScenario(
    scenario: ScenarioAttributes,
    user_id: number
  ): Promise<Scenario> {
    const id = this.scenariosById.size + 1
    const date = new Date()
    const fullScenario: Scenario = {
      ...scenario,
      id,
      createdAt: date,
      updatedAt: date,
    }
    this.scenariosById.set(id, fullScenario)
    this.userIdByScenarioId.set(id, user_id)
    return fullScenario
  }

  async updateScenario(
    scenarioId: number,
    updatedData: Partial<ScenarioAttributes>
  ): Promise<Scenario | null> {
    const scenario = this.scenariosById.get(scenarioId)
    if (!scenario) return null
    const updatedScenario: Scenario = {
      ...scenario,
      ...updatedData,
      updatedAt: new Date(),
    }
    this.scenariosById.set(scenarioId, updatedScenario)
    return updatedScenario
  }

  async deleteScenario(scenarioId: number): Promise<void> {
    this.scenariosById.delete(scenarioId)
    this.userIdByScenarioId.delete(scenarioId)
  }

  async findScenario(scenarioId: number): Promise<Scenario | null> {
    const scenario = this.scenariosById.get(scenarioId)
    return scenario || null
  }

  async listScenarios(): Promise<ReadonlyArray<Scenario>> {
    return Array.from(this.scenariosById.values())
  }

  async listUserScenario(userId: number): Promise<ReadonlyArray<Scenario>> {
    const scenarios: Scenario[] = []
    for (const [
      scenarioId,
      storedUserId,
    ] of this.userIdByScenarioId.entries()) {
      if (storedUserId === userId) {
        let scenario = this.scenariosById.get(scenarioId)
        if (scenario !== undefined) {
          scenarios.push(scenario)
        }
      }
    }
    return scenarios
  }
}
