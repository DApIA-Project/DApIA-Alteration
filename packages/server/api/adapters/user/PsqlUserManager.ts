import IUserManager from './IUserManager'
import UserModel from '../../models/user.model'
import { User, UserAttributes } from '@smartesting/shared/dist/models/User'
import { InferCreationAttributes } from 'sequelize'
import hashPassword from './hashPassword'
import { comparePassword } from '../../utils/user'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

export default class PsqlUserManager implements IUserManager {
  async createUser(user: UserAttributes): Promise<User> {
    const userModel = await UserModel.create({
      ...user,
      token: uuid(),
      password: await hashPassword(user.password),
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

  async updatePassword(
    userId: number,
    password: string,
    newPassword: string
  ): Promise<{ id: number; password: string; newPassword: string } | null> {
    const userModel = await UserModel.findOne({
      where: {
        id: userId,
      },
    })
    if (!userModel) {
      return null
    }
    const user = userModelToUser(userModel)
    const [pass, error] = await comparePassword(user, password)
    if (pass) {
      await userModel.update({
        password: await hashPassword(newPassword),
      })
      const userUpdated = userModelToUser(userModel)
      return {
        id: userUpdated.id,
        password: userUpdated.password,
        newPassword: '',
      }
    } else {
      return null
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email)
    if (user !== null) {
      const [pass, error] = await comparePassword(user, password)
      if (pass) {
        return user
      } else {
        return null
      }
    } else {
      return null
    }
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
    token,
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
    token,
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
