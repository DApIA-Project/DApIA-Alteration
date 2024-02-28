import IUserManager from './IUserManager'
import UserModel from '../../models/user.model'
import { User, UserAttributes } from '@smartesting/shared/dist/models/User'
import { InferCreationAttributes } from 'sequelize'
import Scenario from '../../models/scenario.model'

export default class PsqlUserManager implements IUserManager {
  async createUser(user: UserAttributes): Promise<User> {
    const userModel = await UserModel.create({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return userModelToUser(userModel)
  }

  async deleteUser(userId: number): Promise<void> {
    const userModel = await UserModel.findByPk(userId)
    if (!userModel) return
    await userModel.destroy()
  }

  async listUsers(): Promise<ReadonlyArray<User>> {
    const userModels = await UserModel.findAll()
    return userModels.map(userModelToUser)
  }

  async findUser(userId: number): Promise<User | null> {
    const userModel = await UserModel.findOne({
      where: {
        id: userId,
      },
    })
    if (!userModel) return null
    return userModelToUser(userModel)
  }

  async updateUser(
    userId: number,
    updatedData: Partial<UserAttributes>
  ): Promise<User | null> {
    const userModel = await UserModel.findOne({
      where: {
        id: userId,
      },
    })
    if (!userModel) return null
    await userModel.update({
      ...userModel,
      ...userAttributesToUserModelAttributes(updatedData),
    })
    return userModelToUser(userModel)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({
      where: {
        email: email,
      },
    })
    if (!userModel) return null
    return userModelToUser(userModel)
  }
}

function userModelToUser(userModel: UserModel): User {
  const {
    id,
    firstname,
    lastname,
    email,
    password,
    isAdmin,
    createdAt,
    updatedAt,
  } = userModel

  return {
    id: Number(id),
    firstname,
    lastname,
    email,
    password,
    isAdmin,
    createdAt,
    updatedAt,
  }
}

function userAttributesToUserModelAttributes(
  updatedData: Partial<UserAttributes>
): Partial<InferCreationAttributes<UserModel>> {
  const userModelAttributes: Partial<InferCreationAttributes<UserModel>> = {}
  if (updatedData.firstname)
    userModelAttributes.firstname = updatedData.firstname
  if (updatedData.lastname) userModelAttributes.lastname = updatedData.lastname
  if (updatedData.email) userModelAttributes.email = updatedData.email
  if (updatedData.password) userModelAttributes.password = updatedData.password
  userModelAttributes.isAdmin = updatedData.isAdmin
  return userModelAttributes
}
