import IUserManager from './IUserManager'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import { User, UserAttributes } from '@smartesting/shared/dist/models/User'
import hashPassword from './hashPassword'
import { comparePassword } from '../../utils/user'

export default class MemoryUserManager implements IUserManager {
  constructor(private readonly usersById = new Map<number, User>()) {}

  async createUser(user: UserAttributes): Promise<User> {
    const id = this.usersById.size + 1
    const date = new Date()
    const fullUser: User = {
      ...user,
      id,
      token: uuid(),
      password: await hashPassword(user.password),
      createdAt: date,
      updatedAt: date,
    }
    this.usersById.set(id, fullUser)
    return fullUser
  }

  async updateUser(
    userId: number,
    updatedData: Partial<UserAttributes>
  ): Promise<User | null> {
    const user = this.usersById.get(userId)
    if (!user) return null
    const updatedUser: User = {
      ...user,
      ...updatedData,
      updatedAt: new Date(),
    }
    this.usersById.set(userId, updatedUser)
    return updatedUser
  }

  async deleteUser(userId: number): Promise<void> {
    this.usersById.delete(userId)
  }

  async findUserByEmail(userEmail: string): Promise<User | null> {
    for (const user of this.usersById.values()) {
      if (user.email === userEmail) {
        return user
      }
    }
    return null
  }

  async findUserByToken(userToken: string): Promise<User | null> {
    for (const user of this.usersById.values()) {
      if (user.token === userToken) {
        return user
      }
    }
    return null
  }

  async findUser(userId: number): Promise<User | null> {
    const user = this.usersById.get(userId)
    return user || null
  }

  async listUsers(): Promise<ReadonlyArray<User>> {
    return Array.from(this.usersById.values())
  }

  async updatePassword(
    userId: number,
    password: string,
    newPassword: string
  ): Promise<{ id: number; password: string; newPassword: string } | null> {
    const user = this.usersById.get(userId)
    if (!user) return null
    const [pass, error] = await comparePassword(user, password)
    if (pass) {
      user.password = await hashPassword(newPassword)
      return { id: user.id, password: user.password, newPassword: '' }
    } else {
      return null
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email)
    if (user !== null) {
      const [pass, error] = await comparePassword(user, password)
      if (pass) {
        const updatedUser: User = {
          ...user,
          token: uuid(),
        }
        this.usersById.set(user.id, updatedUser)
        return updatedUser
      } else {
        return null
      }
    } else {
      return null
    }
  }
}
