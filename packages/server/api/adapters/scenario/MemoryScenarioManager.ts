import IScenarioManager from './IScenarioManager'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'
import { OptionsAlteration, Sort } from '@smartesting/shared/dist/index'

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

  async listUserScenario(
    userId: number,
    searchBar?: string,
    startDate?: string,
    endDate?: string,
    optionsAlteration?: OptionsAlteration,
    sort?: string
  ): Promise<ReadonlyArray<Scenario>> {
    const scenarios: Scenario[] = []
    const filteredScenarios: Scenario[] = []
    for (const [
      scenarioId,
      storedUserId,
    ] of this.userIdByScenarioId.entries()) {
      if (storedUserId === userId) {
        let scenario = this.scenariosById.get(scenarioId)
        if (scenario !== undefined) {
          let isMatched = true

          if (
            searchBar &&
            !scenario.name.toLowerCase().includes(searchBar.toLowerCase()) &&
            !scenario.text.toLowerCase().includes(searchBar.toLowerCase())
          ) {
            isMatched = false
          }

          if (startDate && endDate) {
            const scenarioDate = new Date(scenario.updatedAt)
            const start = new Date(startDate)
            const end = new Date(endDate)
            if (!(scenarioDate >= start && scenarioDate <= end)) {
              isMatched = false
            }
          }

          if (optionsAlteration) {
            if (
              optionsAlteration.haveLabel !== scenario.options.haveLabel ||
              optionsAlteration.haveRealism !== scenario.options.haveRealism ||
              optionsAlteration.haveNoise !== scenario.options.haveNoise ||
              optionsAlteration.haveDisableLatitude !==
                scenario.options.haveDisableLatitude ||
              optionsAlteration.haveDisableLongitude !==
                scenario.options.haveDisableLongitude ||
              optionsAlteration.haveDisableAltitude !==
                scenario.options.haveDisableAltitude
            ) {
              isMatched = false
            }
          }

          if (isMatched) {
            scenarios.push(scenario)
          }
        }
      }
    }

    if (sort === Sort.dateDescending) {
      filteredScenarios.push(
        ...scenarios.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      )
    } else if (sort === Sort.dateAscending) {
      filteredScenarios.push(
        ...scenarios.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        )
      )
    } else if (sort === Sort.alphabeticalOrder) {
      filteredScenarios.push(
        ...scenarios.sort((a, b) => a.name.localeCompare(b.name))
      )
    } else if (sort === Sort.antialphabeticalOrder) {
      filteredScenarios.push(
        ...scenarios.sort((a, b) => b.name.localeCompare(a.name))
      )
    } else {
      filteredScenarios.push(...scenarios)
    }

    return filteredScenarios
  }
}
