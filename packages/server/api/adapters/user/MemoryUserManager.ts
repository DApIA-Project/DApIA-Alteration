import IUserManager from './IUserManager'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'
import { User, UserAttributes } from '@smartesting/shared/dist/models/User'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class MemoryUserManager implements IUserManager {
  constructor(
    private readonly usersById = new Map<string, User>(),
    private readonly scenariosById = new Map<string, Scenario>(),
    private readonly scenarioIdsByUser = new ArrayMultimap<string, string>()
  ) {}

  async createUser(user: UserAttributes): Promise<User> {
    const id = uuid()
    const date = new Date()
    const fullUser: User = {
      ...user,
      id,
      createdAt: date,
      updatedAt: date,
    }
    this.usersById.set(id, fullUser)
    return fullUser
  }

  async updateUser(
    userId: string,
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

  async deleteUser(userId: string): Promise<void> {
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

  async findUser(userId: string): Promise<User | null> {
    const user = this.usersById.get(userId)
    return user || null
  }

  async listUsers(): Promise<ReadonlyArray<User>> {
    return Array.from(this.usersById.values())
  }

  async listUserScenarios(userId: string): Promise<ReadonlyArray<Scenario>> {
    const scenarioIds = this.scenarioIdsByUser.get(userId)
    const scenarios: Array<Scenario> = []
    scenarioIds.forEach((scenarioId) => {
      const scenario = this.scenariosById.get(scenarioId)
      if (scenario) {
        scenarios.push(scenario)
      }
    })
    return scenarios
  }
}
