import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import listUser from '../../../api/core/user/listUser'
import assert from 'assert'
import { ListUserError } from '@smartesting/shared/dist/responses/listUser'
import { clearDb } from '../../clearDb'

describe('core/user/listUser', () => {
  let userManager: IUserManager
  const validUserAttributes: UserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont8@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }
  const validUserAttributes2: UserAttributes = {
    firstname: 'Charlie',
    lastname: 'Stone',
    email: 'charlie.stone@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }
  const validUserAttributes3: UserAttributes = {
    firstname: 'Alice',
    lastname: 'Summer',
    email: 'alice.summer8@mail.fr',
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

  it('list user is valid with 3 users', async () => {
    await userManager.createUser(validUserAttributes)
    await userManager.createUser(validUserAttributes2)
    await userManager.createUser(validUserAttributes3)
    const { users: listedUser, error: errorListUser } = await listUser(
      userManager
    )
    assert(listedUser)
    assert.equal(listedUser.length, 3)
    assert.strictEqual(errorListUser, null)
  })

  it('list user is empty', async () => {
    const { users: listedUser, error: errorListUser } = await listUser(
      userManager
    )
    assert(errorListUser)
    assert.strictEqual(errorListUser, ListUserError.emptyListUser)
    assert.strictEqual(listedUser, null)
  })

  it('list user is empty after create et delete', async () => {
    let createdUser = await userManager.createUser(validUserAttributes)
    assert(createdUser)
    await userManager.deleteUser(createdUser.id)
    const { users: listedUser, error: errorListUser } = await listUser(
      userManager
    )
    assert(errorListUser)
    assert.strictEqual(errorListUser, ListUserError.emptyListUser)
    assert.strictEqual(listedUser, null)
  })
})
