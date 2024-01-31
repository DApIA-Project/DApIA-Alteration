import IScenarioManager from './IScenarioManager'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'

export default class MemoryScenarioManager implements IScenarioManager {
  constructor(private readonly scenariosById = new Map<string, Scenario>()) {}

  async createScenario(scenario: ScenarioAttributes): Promise<Scenario> {
    const id = uuid()
    const date = new Date()
    const fullScenario: Scenario = {
      ...scenario,
      id,
      createdAt: date,
      updatedAt: date,
    }
    this.scenariosById.set(id, fullScenario)
    return fullScenario
  }

  async updateScenario(
    scenarioId: string,
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

  async deleteScenario(scenarioId: string): Promise<void> {
    this.scenariosById.delete(scenarioId)
  }

  async findScenario(scenarioId: string): Promise<Scenario | null> {
    const scenario = this.scenariosById.get(scenarioId)
    return scenario || null
  }

  async listScenarios(): Promise<ReadonlyArray<Scenario>> {
    return Array.from(this.scenariosById.values())
  }
}
