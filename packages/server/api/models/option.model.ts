import {
  CreationOptional,
  DataTypes,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../database/connection'
import User from './user.model'

export default class Option extends Model<
  InferAttributes<Option>,
  InferCreationAttributes<Option>
> {
  declare id: CreationOptional<Identifier>
  declare user_id: CreationOptional<number>
  declare is_active_realism: CreationOptional<boolean>
  declare is_active_noise: CreationOptional<boolean>
  declare is_active_labeling: CreationOptional<boolean>
  declare is_disable_latitude: CreationOptional<boolean>
  declare is_disable_longitude: CreationOptional<boolean>
  declare is_disable_altitude: CreationOptional<boolean>

  static associate() {
    Option.belongsTo(User, { foreignKey: 'user_id', as: 'userOption' })
  }
}

Option.init(
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
    is_active_realism: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active_noise: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active_labeling: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_disable_latitude: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_disable_longitude: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_disable_altitude: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'options',
  }
)
