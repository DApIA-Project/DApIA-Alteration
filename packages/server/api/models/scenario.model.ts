import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../database/connection'
import { OptionsAlteration } from '@smartesting/shared/dist'
import { Identifier } from 'sequelize/types/model'

export default class Scenario extends Model<
  InferAttributes<Scenario>,
  InferCreationAttributes<Scenario>
> {
  declare id: CreationOptional<Identifier>
  declare name: string
  declare text: string
  declare options: OptionsAlteration
  declare createdAt: Date
  declare updatedAt: Date
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'scenarios',
  }
)
