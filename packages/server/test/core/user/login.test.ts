import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/user/create'
import assert from 'assert'
import { LoginUserError } from '@smartesting/shared/dist/responses/loginUser'
import updateUser from '../../../api/core/user/update'
import { clearDb } from '../../clearDb'
import { OptionsAlteration } from '@smartesting/shared/dist/models'
import login from '../../../api/core/user/login'
describe('core/user/login', () => {
  let userManager: IUserManager
  const validUserAttributes: UserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
    isAdmin: false,
  }

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    userManager = adapters.userManager
  })

  afterEach(async () => {
    await clearDb()
  })

  it('requires a existing email for the user', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await login(
      { email: 'bademail@mail.fr', password: 's3cret!' },
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, LoginUserError.userNotFound)
  })

  it('requires a true password for the user', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await login(
      { email: 'bob.dupont@mail.fr', password: 'badPassword' },
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, LoginUserError.passwordConflict)
  })

  it('login user if all fields are correct', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: logUser, error: logError } = await login(
      {
        email: validUserAttributes.email,
        password: validUserAttributes.password,
      },
      userManager
    )

    assert.strictEqual(logError, null)
    assert(logUser)

    const existing = await userManager.findUserByToken(logUser.token)
    assert.deepStrictEqual(logUser.firstname, existing?.firstname)
    assert.deepStrictEqual(logUser.lastname, existing?.lastname)
    assert.deepStrictEqual(logUser.email, existing?.email)
  })
})
