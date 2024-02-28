import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/user/create'
import assert from 'assert'
import { UpdateUserError } from '@smartesting/shared/dist/responses/updateUser'
import updateUser from '../../../api/core/user/update'
import { clearDb } from '../../clearDb'
import { OptionsAlteration } from '@smartesting/shared/dist/models'
describe('core/user/update', () => {
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
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updateUser(
      createdUser.id,
      '  ',
      createdUser.lastname,
      createdUser.email,
      createdUser.password,
      createdUser.isAdmin,
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, UpdateUserError.emptyFirstname)
  })

  it('requires a non-blank lastname for the user', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updateUser(
      createdUser.id,
      createdUser.firstname,
      '     ',
      createdUser.email,
      createdUser.password,
      createdUser.isAdmin,
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, UpdateUserError.emptyLastname)
  })

  it('requires a non-blank email for the user', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updateUser(
      createdUser.id,
      createdUser.firstname,
      createdUser.lastname,
      '     ',
      createdUser.password,
      createdUser.isAdmin,
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, UpdateUserError.emptyEmail)
  })

  it('requires a non-blank password for the user', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updateUser(
      createdUser.id,
      createdUser.firstname,
      createdUser.lastname,
      createdUser.email,
      '     ',
      createdUser.isAdmin,
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, UpdateUserError.emptyPassword)
  })

  it('update user if all fields are correct', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updateUser(
      createdUser.id,
      'Charlie',
      'Stone',
      'charlie.stone@mail.fr',
      'news3cret!',
      true,
      userManager
    )

    assert.strictEqual(updatedError, null)
    assert(updatedUser)

    const existing = await userManager.findUser(updatedUser.id)
    assert.deepStrictEqual(updatedUser.firstname, existing?.firstname)
    assert.deepStrictEqual(updatedUser.lastname, existing?.lastname)
    assert.deepStrictEqual(updatedUser.email, existing?.email)
    assert.deepStrictEqual(updatedUser.password, existing?.password)
  })

  it('trims the firstname, lastname, email but no password before saving', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updateUser(
      createdUser.id,
      '  Charlie  ',
      '  Stone  ',
      '   charlie.stone@mail.fr   ',
      '   newpassword   ',
      createdUser.isAdmin,
      userManager
    )

    assert.strictEqual(updatedError, null)
    assert(updatedUser)

    const existing = await userManager.findUser(updatedUser.id)
    assert.strictEqual(existing?.firstname, 'Charlie')
    assert.strictEqual(existing?.lastname, 'Stone')
    assert.strictEqual(existing?.email, 'charlie.stone@mail.fr')
    assert.strictEqual(existing?.password, '   newpassword   ')
  })
})
