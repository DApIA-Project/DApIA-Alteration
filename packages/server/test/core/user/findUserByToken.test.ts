import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import findUserByToken from '../../../api/core/user/findUserByToken'
import assert from 'assert'
import { FindUserByTokenError } from '@smartesting/shared/dist/responses/findUserByToken'
import { clearDb } from '../../clearDb'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

describe('core/user/findUserByToken', () => {
  let userManager: IUserManager
  const validUserAttributes: UserAttributes = {
    email: 'bob.dupont8@mail.fr',
    password: 's3cret',
  }
  const validUserAttributes2: UserAttributes = {
    email: 'charlie.stone@mail.fr',
    password: 's3cret',
  }
  const validUserAttributes3: UserAttributes = {
    email: 'alice.summer8@mail.fr',
    password: 's3cret',
  }

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    userManager = adapters.userManager
  })

  afterEach(async () => {
    await clearDb()
  })

  it('list user is valid with 3 users', async () => {
    let user1 = await userManager.createUser(validUserAttributes)
    await userManager.createUser(validUserAttributes2)
    await userManager.createUser(validUserAttributes3)
    const { user: user, error: errorFindUserByToken } = await findUserByToken(
      user1.token,
      userManager
    )
    assert(user)
    assert.deepStrictEqual(user.email, validUserAttributes.email)
    assert.strictEqual(errorFindUserByToken, null)
  })

  it('list user is empty', async () => {
    const { user: user, error: errorFindUserByToken } = await findUserByToken(
      uuid(),
      userManager
    )
    assert(errorFindUserByToken)
    assert.strictEqual(
      errorFindUserByToken,
      FindUserByTokenError.emptyUserByToken
    )
    assert.strictEqual(user, null)
  })

  it('list user is empty after create et delete', async () => {
    let createdUser = await userManager.createUser(validUserAttributes)
    assert(createdUser)
    await userManager.deleteUser(createdUser.id)
    const { user: user, error: errorFindUserByToken } = await findUserByToken(
      uuid(),
      userManager
    )
    assert(errorFindUserByToken)
    assert.strictEqual(
      errorFindUserByToken,
      FindUserByTokenError.emptyUserByToken
    )
    assert.strictEqual(user, null)
  })
})
