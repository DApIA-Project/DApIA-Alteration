import {
  CreationOptional,
  DataTypes,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../database/connection'
import { OptionsAlteration } from '@smartesting/shared/dist'

export default class Scenario extends Model<
  InferAttributes<Scenario>,
  InferCreationAttributes<Scenario>
> {
  declare id: CreationOptional<Identifier>
  declare name: string
  declare text: string
  declare options: OptionsAlteration
}

Scenario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
    options: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'scenarios',
  }
)
