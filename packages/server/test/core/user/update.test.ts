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
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
  }

  beforeEach(async () => {
    const adapters = makeTestAdapters()
    userManager = adapters.userManager
  })

  afterEach(async () => {
    await clearDb()
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
      '     ',
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, UpdateUserError.emptyEmail)
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
      'charlie.stone@mail.fr',
      userManager
    )

    assert.strictEqual(updatedError, null)
    assert(updatedUser)

    const existing = await userManager.findUserByToken(createdUser.token)
    assert.deepStrictEqual(updatedUser.email, existing?.email)
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
      '   charlie.stone@mail.fr   ',
      userManager
    )

    assert.strictEqual(updatedError, null)
    assert(updatedUser)

    const existing = await userManager.findUserByToken(createdUser.token)
    assert.strictEqual(existing?.email, 'charlie.stone@mail.fr')
  })
})
