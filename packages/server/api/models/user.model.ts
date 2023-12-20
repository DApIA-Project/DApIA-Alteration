import {
  CreationOptional,
  DataTypes,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../database/connection'
import Option from './option.model'
import Historic from './historic.model'
import Favorite from './favorite.model'

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<Identifier>
  declare is_admin: CreationOptional<boolean>
  declare firstname: string
  declare lastname: string
  declare email: string
  declare password: CreationOptional<string>
  static associate() {
    User.hasOne(Option, { foreignKey: 'user_id', as: 'userOption' })
    User.hasMany(Historic, { foreignKey: 'user_id', as: 'userHistoric' })
    User.hasMany(Favorite, { foreignKey: 'user_id', as: 'userFavorite' })
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    is_admin: {
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
