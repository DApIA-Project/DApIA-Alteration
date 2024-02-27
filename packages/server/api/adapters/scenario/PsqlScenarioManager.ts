import IScenarioManager from './IScenarioManager'
import ScenarioModel from '../../models/scenario.model'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'
import { InferCreationAttributes } from 'sequelize'

export default class PsqlScenarioManager implements IScenarioManager {
  async createScenario(
    scenario: ScenarioAttributes,
    user_id: number
  ): Promise<Scenario> {
    const scenarioModel = await ScenarioModel.create({
      ...scenario,
      user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return scenarioModelToScenario(scenarioModel)
  }

  async deleteScenario(scenarioId: string): Promise<void> {
    const scenarioModel = await ScenarioModel.findByPk(scenarioId)
    if (!scenarioModel) return
    await scenarioModel.destroy()
  }

  async listScenarios(): Promise<ReadonlyArray<Scenario>> {
    const scenarioModels = await ScenarioModel.findAll()
    return scenarioModels.map(scenarioModelToScenario)
  }

  async findScenario(scenarioId: string): Promise<Scenario | null> {
    const scenarioModel = await ScenarioModel.findOne({
      where: {
        id: scenarioId,
      },
    })
    if (!scenarioModel) return null
    return scenarioModelToScenario(scenarioModel)
  }

  async updateScenario(
    scenarioId: string,
    updatedData: Partial<ScenarioAttributes>
  ): Promise<Scenario | null> {
    const scenarioModel = await ScenarioModel.findOne({
      where: {
        id: scenarioId,
      },
    })
    if (!scenarioModel) return null
    await scenarioModel.update({
      ...scenarioModel,
      ...scenarioAttributesToScenarioModelAttributes(updatedData),
    })
    return scenarioModelToScenario(scenarioModel)
  }
}

function scenarioModelToScenario(scenarioModel: ScenarioModel): Scenario {
  const { id, name, text, options, user_id, createdAt, updatedAt } =
    scenarioModel

  return {
    id: String(id),
    name,
    text,
    options,
    createdAt,
    updatedAt,
  }
}

function scenarioAttributesToScenarioModelAttributes(
  updatedData: Partial<ScenarioAttributes>
): Partial<InferCreationAttributes<ScenarioModel>> {
  const scenarioModelAttributes: Partial<
    InferCreationAttributes<ScenarioModel>
  > = {}
  if (updatedData.name) scenarioModelAttributes.name = updatedData.name
  if (updatedData.text !== null && updatedData.text !== undefined)
    scenarioModelAttributes.text = updatedData.text
  if (updatedData.options) scenarioModelAttributes.options = updatedData.options
  return scenarioModelAttributes
}
