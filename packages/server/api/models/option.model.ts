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
  declare userId: CreationOptional<number>
  declare isActiveRealism: CreationOptional<boolean>
  declare isActiveNoise: CreationOptional<boolean>
  declare isActiveLabeling: CreationOptional<boolean>
  declare isDisableLatitude: CreationOptional<boolean>
  declare isDisableLongitude: CreationOptional<boolean>
  declare isDisableAltitude: CreationOptional<boolean>

  static associate() {
    Option.belongsTo(User, { foreignKey: 'userId' })
  }
}

Option.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    isActiveRealism: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActiveNoise: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActiveLabeling: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDisableLatitude: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDisableLongitude: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDisableAltitude: {
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
