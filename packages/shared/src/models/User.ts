export type User = {
  id: Readonly<number>
  createdAt: Readonly<Date>
  updatedAt: Readonly<Date>
} & UserAttributes

export type UserAttributes = {
  firstname: Readonly<string>
  lastname: Readonly<string>
  email: Readonly<string>
  password: Readonly<string>
  isAdmin: Readonly<boolean>
}
