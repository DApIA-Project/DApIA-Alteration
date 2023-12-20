import {
  CreationOptional,
  DataTypes,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize'
import { sequelize } from '../database/connection'
import User from './user.model'
import Scenario from './scenario.model'

export default class Historic extends Model<
  InferAttributes<Historic>,
  InferCreationAttributes<Historic>
> {
  declare id: CreationOptional<Identifier>
  declare user_id: CreationOptional<number>
  declare date: Date

  static associate() {
    Historic.belongsTo(User, { foreignKey: 'user_id', as: 'userHistoric' })
    Historic.hasMany(Scenario, {
      foreignKey: 'historical_id',
      as: 'scenarioHistoric',
    })
  }
}

Historic.init(
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
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'historical',
  }
)
