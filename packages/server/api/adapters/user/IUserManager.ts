import { UserAttributes, User } from '@smartesting/shared/dist/models/User'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'

export default interface IUserManager {
  createUser(user: UserAttributes): Promise<User>

  updateUser(
    userId: number,
    updatedData: Partial<UserAttributes>
  ): Promise<User | null>

  deleteUser(userId: number): Promise<void>
  findUserByEmail(email: string): Promise<User | null>
  findUser(id: number): Promise<User | null>
  listUsers(): Promise<ReadonlyArray<User>>
  updatePassword(
    userId: number,
    password: string,
    newPassword: string
  ): Promise<{ id: number; password: string; newPassword: string } | null>
  login(email: string, password: string): Promise<User | null>
}
