import {
  CreationOptional,
  DataTypes,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../database/connection'
import Historic from './historic.model'
import Favorite from './favorite.model'

export default class Scenario extends Model<
  InferAttributes<Scenario>,
  InferCreationAttributes<Scenario>
> {
  declare id: CreationOptional<Identifier>
  declare historical_id: CreationOptional<number>
  declare text: string

  static associate() {
    Scenario.belongsTo(Historic, {
      foreignKey: 'historical_id',
      as: 'scenarioHistoric',
    })

    Scenario.hasOne(Favorite, {
      foreignKey: 'scenario_id',
      as: 'scenarioFavorite',
    })
  }
}

Scenario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    historical_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'historical',
        key: 'id',
      },
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'scenarios',
  }
)
