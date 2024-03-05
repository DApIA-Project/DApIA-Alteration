import { User } from '@smartesting/shared/dist/models/User'
import bcrypt from 'bcryptjs'

export async function comparePassword(
  user: User,
  password: string
): Promise<[boolean | null, string | null]> {
  if (!user.password) return [null, 'password_not_set']
  return [await bcrypt.compare(password, user.password), null]
}
