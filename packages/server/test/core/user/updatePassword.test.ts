import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes } from '@smartesting/shared/dist/models/User'
import makeTestAdapters from '../../makeTestAdapters'
import create from '../../../api/core/user/create'
import assert from 'assert'
import { UpdatePasswordUserError } from '@smartesting/shared/dist/responses/updatePasswordUser'
import { clearDb } from '../../clearDb'
import updatePassword from '../../../api/core/user/updatePassword'
import bcrypt from 'bcryptjs'
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

  it('requires a non-blank password for the user', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updatePassword(
      createdUser.id,
      '     ',
      'newPassword',
      userManager
    )

    assert.strictEqual(updatedUser, null)
    assert.strictEqual(updatedError, UpdatePasswordUserError.emptyPassword)
  })

  it('update user if all fields are correct', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updatePassword(
      createdUser.id,
      's3cret!',
      'newPassword',
      userManager
    )

    assert.strictEqual(updatedError, null)
    assert(updatedUser)

    const existing = await userManager.findUserByToken(createdUser.token)
    assert(await bcrypt.compare('newPassword', <string>existing?.password))
  })

  it('no trims password before saving', async () => {
    const { user: createdUser } = await create(
      {
        ...validUserAttributes,
      },
      userManager
    )

    assert(createdUser)

    const { user: updatedUser, error: updatedError } = await updatePassword(
      createdUser.id,
      's3cret!',
      '   newPassword   ',
      userManager
    )

    assert.strictEqual(updatedError, null)
    assert(updatedUser)

    const existing = await userManager.findUserByToken(createdUser.token)
    assert(
      await bcrypt.compare('   newPassword   ', <string>existing?.password)
    )
  })
})
