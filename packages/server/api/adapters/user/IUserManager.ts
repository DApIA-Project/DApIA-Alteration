import { UserAttributes, User } from '@smartesting/shared/dist/models/User'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'

export default interface IUserManager {
  createUser(user: UserAttributes): Promise<User>

  updateUser(
    userId: string,
    updatedData: Partial<UserAttributes>
  ): Promise<User | null>

  deleteUser(userId: string): Promise<void>
  findUserByEmail(email: string): Promise<User | null>
  findUser(id: string): Promise<User | null>
  listUserScenarios(userId: string): Promise<ReadonlyArray<Scenario>>
  listUsers(): Promise<ReadonlyArray<User>>
}
