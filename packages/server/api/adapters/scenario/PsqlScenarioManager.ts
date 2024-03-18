import IScenarioManager from './IScenarioManager'
import ScenarioModel from '../../models/scenario.model'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'
import { InferCreationAttributes, Op } from 'sequelize'
import { OptionsAlteration } from '@smartesting/shared/dist/index'

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

  async deleteScenario(scenarioId: number): Promise<void> {
    const scenarioModel = await ScenarioModel.findByPk(scenarioId)
    if (!scenarioModel) return
    await scenarioModel.destroy()
  }

  async listScenarios(): Promise<ReadonlyArray<Scenario>> {
    const scenarioModels = await ScenarioModel.findAll()
    return scenarioModels.map(scenarioModelToScenario)
  }

  async listUserScenario(
    user_id: number,
    searchBar?: string,
    startDate?: string,
    endDate?: string,
    optionsAlteration?: OptionsAlteration
  ): Promise<ReadonlyArray<Scenario>> {
    let whereClause: any = { user_id }

    if (searchBar) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { name: { [Op.like]: `%${searchBar}%` } },
          { text: { [Op.like]: `%${searchBar}%` } },
        ],
      }
    }

    if (startDate && endDate) {
      whereClause = {
        ...whereClause,
        [Op.and]: [{ updated_at: { [Op.between]: [startDate, endDate] } }],
      }
    }

    if (optionsAlteration) {
      whereClause = {
        ...whereClause,
        [Op.and]: [
          {
            options: {
              [Op.and]: [
                { haveLabel: optionsAlteration.haveLabel },
                { haveRealism: optionsAlteration.haveRealism },
                { haveNoise: optionsAlteration.haveNoise },
                { haveDisableLatitude: optionsAlteration.haveDisableLatitude },
                {
                  haveDisableLongitude: optionsAlteration.haveDisableLongitude,
                },
                { haveDisableAltitude: optionsAlteration.haveDisableAltitude },
              ],
            },
          },
        ],
      }
    }

    const scenarioModels = await ScenarioModel.findAll({
      where: whereClause,
    })
    return scenarioModels.map(scenarioModelToScenario)
  }

  async findScenario(scenarioId: number): Promise<Scenario | null> {
    const scenarioModel = await ScenarioModel.findOne({
      where: {
        id: scenarioId,
      },
    })
    if (!scenarioModel) return null
    return scenarioModelToScenario(scenarioModel)
  }

  async updateScenario(
    scenarioId: number,
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
    id: Number(id),
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
