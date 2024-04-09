import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import { FindUserByTokenError } from '@smartesting/shared/dist/responses/findUserByToken'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

describe(`GET ${ApiRoutes.findUserByToken()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  afterEach(async () => {
    await clearDb()
  })

  const validUserAttributes = {
    email: 'bob.dupont7@mail.fr',
    password: 's3cret',
  }

  const validUserAttributes2 = {
    email: 'charlie.stone7@mail.fr',
    password: 's3cret',
  }

  context('when find user have in many Users', () => {
    it('returns 201 when user is returned', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      let user2 = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes2)

      const response = await request(server).get(
        `/users/${user2.body.user.token}`
      )
      const { error, user } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(user.email, 'charlie.stone7@mail.fr')
    })
  })

  context('when user list have not user', () => {
    it('returns 422 when  no user exists', async () => {
      const response = await request(server).get(`/users/${uuid()}`)

      const { error, user } = response.body
      assert.deepStrictEqual(error, FindUserByTokenError.emptyUserByToken)
      assert.deepStrictEqual(user, null)
    })
  })
})
