import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/user/create'
import assert from 'assert'
import { CreateUserError } from '@smartesting/shared/dist/responses/createUser'
import { clearDb } from '../../clearDb'
import bcrypt from 'bcryptjs'
describe('core/user/create', () => {
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

  it('requires a non-blank firstname for the user', async () => {
    const { user: createdUser, error } = await create(
      {
        ...validUserAttributes,
        firstname: '   ',
      },
      userManager
    )

    assert.strictEqual(createdUser, null)
    assert.strictEqual(error, CreateUserError.emptyFirstname)
  })

  it('cant have a blank lastname for the user', async () => {
    const { user: createdUser, error } = await create(
      {
        ...validUserAttributes,
        lastname: '   ',
      },
      userManager
    )

    assert.strictEqual(createdUser, null)
    assert.strictEqual(error, CreateUserError.emptyLastname)
  })

  it('cant create user if already exists', async () => {
    const { user: createdUser, error } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    const { user: createdUser2, error: error2 } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert.strictEqual(createdUser2, null)
    assert.strictEqual(error2, CreateUserError.emailConflict)
  })

  it('cant have a blank email for the user', async () => {
    const { user: createdUser, error } = await create(
      {
        ...validUserAttributes,
        email: '   ',
      },
      userManager
    )

    assert.strictEqual(createdUser, null)
    assert.strictEqual(error, CreateUserError.emptyEmail)
  })

  it('cant have a blank password for the user', async () => {
    const { user: createdUser, error } = await create(
      {
        ...validUserAttributes,
        password: '   ',
      },
      userManager
    )

    assert.strictEqual(createdUser, null)
    assert.strictEqual(error, CreateUserError.emptyPassword)
  })

  it('create user if all fields are correct', async () => {
    const { user: createdUser, error } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert.strictEqual(error, null)
    assert(createdUser)

    const existing = await userManager.findUserByToken(createdUser.token)
    assert.deepStrictEqual(createdUser, existing)
  })

  it('trims the firstname before saving', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
        firstname: '  Boby  ',
      },
      userManager
    )

    assert(createdUser)
    const existing = await userManager.findUserByToken(createdUser.token)
    assert.strictEqual(existing?.firstname, 'Boby')
  })

  it('trims the lastname before saving', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
        lastname: '  Stone  ',
      },
      userManager
    )

    assert(createdUser)
    const existing = await userManager.findUserByToken(createdUser.token)
    assert.strictEqual(existing?.lastname, 'Stone')
  })

  it('trims the email before saving', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
        email: '  bobdupont2@mail.fr  ',
      },
      userManager
    )

    assert(createdUser)
    const existing = await userManager.findUserByToken(createdUser.token)
    assert.strictEqual(existing?.email, 'bobdupont2@mail.fr')
  })
})
