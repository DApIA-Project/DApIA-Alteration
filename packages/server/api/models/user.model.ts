import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../database/connection'
import { OptionsAlteration } from '@smartesting/shared/dist'
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
  declare createdAt: Date
  declare updatedAt: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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

User.hasMany(Scenario, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'scenarios', // Alias pour la relation
})

User.sync({}).then(() => {
  console.log('User table synchronized')
})
