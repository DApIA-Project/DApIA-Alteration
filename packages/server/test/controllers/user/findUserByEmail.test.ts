import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { ListUserError } from '@smartesting/shared/dist/responses/listUser'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import { FindUserByEmailError } from '@smartesting/shared/dist/responses/findUserByEmail'

describe(`POST ${ApiRoutes.findUserByEmail()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  afterEach(async () => {
    await clearDb()
  })

  const validUserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont7@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }

  const validUserAttributes2 = {
    firstname: 'Charlie',
    lastname: 'Stone',
    email: 'charlie.stone7@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }

  context('when find user have in many Users', () => {
    it('returns 201 when user is returned', async () => {
      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes2)

      const response = await request(server)
        .post(ApiRoutes.findUserByEmail())
        .send({ email: 'charlie.stone7@mail.fr' })
      const { error, user } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(user.lastname, 'Stone')
      assert.equal(user.firstname, 'Charlie')
    })
  })

  context('when user list have not user', () => {
    it('returns 422 when  no user exists', async () => {
      const response = await request(server)
        .post(ApiRoutes.findUserByEmail())
        .send({ email: 'test@mail.fr' })

      const { error, user } = response.body
      assert.deepStrictEqual(error, FindUserByEmailError.emptyUserByEmail)
      assert.deepStrictEqual(user, null)
    })
  })
})
