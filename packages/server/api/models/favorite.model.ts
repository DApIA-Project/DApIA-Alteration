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
import Scenario from './scenario.model'
import User from './user.model'

export default class Favorite extends Model<
  InferAttributes<Favorite>,
  InferCreationAttributes<Favorite>
> {
  declare id: CreationOptional<Identifier>
  declare user_id: CreationOptional<number>
  declare scenario_id: CreationOptional<number>

  static associate() {
    Favorite.belongsTo(Scenario, {
      foreignKey: 'scenario_id',
      as: 'scenarioFavorite',
    })
    Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'userFavorite' })
  }
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    scenario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'scenarios',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'favorites',
  }
)
