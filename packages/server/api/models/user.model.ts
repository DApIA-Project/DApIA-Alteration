import {
  CreationOptional,
  DataTypes,
  HasMany,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize'
import { sequelize } from '../database/connection'
import { Identifier } from 'sequelize/types/model'
import Scenario from './scenario.model'

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<Identifier>
  declare firstname: string
  declare lastname: string
  declare email: string
  declare password: string
  declare isAdmin: boolean
  declare token: string
  declare createdAt: Date
  declare updatedAt: Date
}

User.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'users',
  }
)

User.sync({}).then(() => {
  console.log('User table synchronized')
})
