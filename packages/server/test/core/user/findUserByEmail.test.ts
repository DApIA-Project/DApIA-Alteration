import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import findUserByEmail from '../../../api/core/user/findUserByEmail'
import assert from 'assert'
import { FindUserByEmailError } from '@smartesting/shared/dist/responses/findUserByEmail'
import { clearDb } from '../../clearDb'

describe('core/user/findUserByEmail', () => {
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
    const { user: user, error: errorFindUserByEmail } = await findUserByEmail(
      validUserAttributes.email,
      userManager
    )
    assert(user)
    assert.deepStrictEqual(user.firstname, validUserAttributes.firstname)
    assert.strictEqual(errorFindUserByEmail, null)
  })

  it('list user is empty', async () => {
    const { user: user, error: errorFindUserByEmail } = await findUserByEmail(
      validUserAttributes2.email,
      userManager
    )
    assert(errorFindUserByEmail)
    assert.strictEqual(
      errorFindUserByEmail,
      FindUserByEmailError.emptyUserByEmail
    )
    assert.strictEqual(user, null)
  })

  it('list user is empty after create et delete', async () => {
    let createdUser = await userManager.createUser(validUserAttributes)
    assert(createdUser)
    await userManager.deleteUser(createdUser.id)
    const { user: user, error: errorFindUserByEmail } = await findUserByEmail(
      validUserAttributes.email,
      userManager
    )
    assert(errorFindUserByEmail)
    assert.strictEqual(
      errorFindUserByEmail,
      FindUserByEmailError.emptyUserByEmail
    )
    assert.strictEqual(user, null)
  })
})
