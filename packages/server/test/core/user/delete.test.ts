import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/user/create'
import assert from 'assert'
import { DeleteUserError } from '@smartesting/shared/dist/responses/deleteUser'
import deleteUser from '../../../api/core/user/delete'
import { clearDb } from '../../clearDb'
describe('core/user/delete', () => {
  let userManager: IUserManager
  const validUserAttributes: UserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    userManager = adapters.userManager
  })

  afterEach(async () => {
    await clearDb()
  })

  it('user exists', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { error: errorRemoved } = await deleteUser(
      createdUser.id,
      validUserAttributes.password,
      userManager
    )
    assert.strictEqual(errorRemoved, null)
  })

  it('user not exists', async () => {
    const { error: errorRemoved } = await deleteUser(
      1234,
      validUserAttributes.password,
      userManager
    )
    assert.strictEqual(errorRemoved, DeleteUserError.userNotFound)
  })
})
