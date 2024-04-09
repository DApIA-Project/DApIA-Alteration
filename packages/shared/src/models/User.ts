export type User = {
  id: Readonly<number>
  createdAt: Readonly<Date>
  updatedAt: Readonly<Date>
  token: Readonly<string>
} & UserAttributes

export type UserAttributes = {
  email: Readonly<string>
  password: Readonly<string>
}
