import {
  CreationOptional,
  DataTypes,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../database/connection'

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<Identifier>
  declare isAdmin: CreationOptional<boolean>
  declare firstname: string
  declare lastname: string
  declare email: string
  declare password: CreationOptional<string>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'users',
  }
)
