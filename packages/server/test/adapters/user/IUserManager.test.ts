import IContractTest from '../../IContractTest'
import { AlterationAdapters } from '../../../api/AlterationAdapters'
import IUserManager from '../../../api/adapters/user/IUserManager'
import { UserAttributes, User } from '@smartesting/shared/dist/models/User'
import assert from 'assert'
import {
  makeMemoryAdapters,
  makeProductionAdapters,
} from '../../makeTestAdapters'
import { clearMemoryDb, clearProductionDb } from '../../clearDb'
import hashPassword from '../../../api/adapters/user/hashPassword'
import bcrypt from 'bcryptjs'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

const IUserContractTest: IContractTest = (
  implementationName,
  makeAdapters,
  clearDb
) => {
  describe(implementationName, () => {
    let adapters: AlterationAdapters
    let userManager: IUserManager

    const validUserAttributes: UserAttributes = {
      firstname: 'Bob',
      lastname: 'Dupont',
      email: 'bob.dupont2@mail.fr',
      password: 's3cret!',
      isAdmin: false,
    }

    const secondUserAttributes: UserAttributes = {
      firstname: 'Charlie',
      lastname: 'Stone',
      email: 'charlie2.stone@mail.fr',
      password: 's3cret!',
      isAdmin: true,
    }

    beforeEach(async () => {
      adapters = makeAdapters()
      userManager = adapters.userManager
    })

    afterEach(async () => {
      await clearDb()
    })

    describe('createUser', () => {
      it('returns the created user', async () => {
        const created = await userManager.createUser(validUserAttributes)

        assert.deepStrictEqual(created.firstname, validUserAttributes.firstname)
        assert.deepStrictEqual(created.lastname, validUserAttributes.lastname)
        assert.deepStrictEqual(created.email, validUserAttributes.email)
        assert.notEqual(created.password, validUserAttributes.password)
        assert(
          await bcrypt.compare(validUserAttributes.password, created.password)
        )
      })
    })

    describe('updateUser', () => {
      it('returns the updated user', async () => {
        const created = await userManager.createUser(validUserAttributes)

        const updated = await userManager.updateUser(created.id, {
          firstname: 'Joe',
        })

        assert(updated)
        assert.deepStrictEqual(updated.firstname, 'Joe')
        assert.deepStrictEqual(updated.lastname, validUserAttributes.lastname)
        assert.deepStrictEqual(updated.email, validUserAttributes.email)
        assert.notEqual(updated.password, validUserAttributes.password)
        assert(
          await bcrypt.compare(validUserAttributes.password, updated.password)
        )
      })
    })

    describe('updateUserPassword', () => {
      it('returns the updated user when update the password', async () => {
        const created = await userManager.createUser(validUserAttributes)

        const updated = await userManager.updatePassword(
          created.id,
          's3cret!',
          'newPassword'
        )

        assert(updated)
        assert.deepStrictEqual(
          await bcrypt.compare('newPassword', updated.password),
          true
        )
      })
    })

    describe('findUser', () => {
      it('returns null if the user does not exists', async () => {
        assert.strictEqual(await userManager.findUser(2345), null)
      })

      it('returns a user', async () => {
        await userManager.createUser(validUserAttributes)
        const secondUser = await userManager.createUser(secondUserAttributes)

        const found = await userManager.findUser(secondUser.id)
        assert.deepStrictEqual(found, secondUser)
      })
    })

    describe('listUsers', () => {
      it('returns all users', async () => {
        const user1 = await userManager.createUser(validUserAttributes)
        const user2 = await userManager.createUser(secondUserAttributes)

        assert.deepEqual(await userManager.listUsers(), [user1, user2])
      })
    })

    describe('deleteUser', () => {
      it('remove a specific user', async () => {
        const user1 = await userManager.createUser(validUserAttributes)
        const user2 = await userManager.createUser(secondUserAttributes)
        assert.deepEqual(await userManager.listUsers(), [user1, user2])
        await userManager.deleteUser(user1.id)
        assert.deepEqual(await userManager.listUsers(), [user2])
      })
    })

    describe('findUserByEmail', () => {
      it('find a specific user with email', async () => {
        const user1 = await userManager.createUser(validUserAttributes)
        const user2 = await userManager.createUser(secondUserAttributes)
        assert.deepEqual(
          await userManager.findUserByEmail(validUserAttributes.email),
          user1
        )
      })

      it('not find a specific user with no existing email', async () => {
        await userManager.createUser(validUserAttributes)
        await userManager.createUser(secondUserAttributes)
        assert.deepEqual(
          await userManager.findUserByEmail('notExistingMail@mail.fr'),
          null
        )
      })
    })

    describe('findUserByToken', () => {
      it('find a specific user with token', async () => {
        const user1 = await userManager.createUser(validUserAttributes)
        const user2 = await userManager.createUser(secondUserAttributes)
        assert.deepEqual(await userManager.findUserByToken(user1.token), user1)
      })

      it('not find a specific user with no existing email', async () => {
        await userManager.createUser(validUserAttributes)
        await userManager.createUser(secondUserAttributes)
        assert.deepEqual(await userManager.findUserByToken(uuid()), null)
      })
    })

    describe('loginUser', () => {
      it('user login with good email and good password', async () => {
        const user1 = await userManager.createUser(validUserAttributes)
        await userManager.createUser(secondUserAttributes)

        const user1Logged = await userManager.login(
          validUserAttributes.email,
          validUserAttributes.password
        )
        assert.deepEqual(
          {
            ...user1,
            token: user1Logged?.token,
            updatedAt: user1Logged?.updatedAt,
          },
          user1Logged
        )
      })

      it('user no login with bad email and good password', async () => {
        await userManager.createUser(validUserAttributes)
        await userManager.createUser(secondUserAttributes)
        assert.deepEqual(
          await userManager.login(
            'badEmail@mail.fr',
            validUserAttributes.password
          ),
          null
        )
      })

      it('user no login with good email and bad password', async () => {
        await userManager.createUser(validUserAttributes)
        await userManager.createUser(secondUserAttributes)
        assert.deepEqual(
          await userManager.login(validUserAttributes.email, 'badPassword'),
          null
        )
      })
    })
  })
}

describe('IProjectManager', () => {
  IUserContractTest('MemoryUserManager', makeMemoryAdapters, clearMemoryDb)

  IUserContractTest(
    'PsqlUserManager',
    makeProductionAdapters,
    clearProductionDb
  )
})
