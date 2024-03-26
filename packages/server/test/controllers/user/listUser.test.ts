import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { ListUserError } from '@smartesting/shared/dist/responses/listUser'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'

describe(`POST ${ApiRoutes.users()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  afterEach(async () => {
    await clearDb()
  })

  /*const validUserAttributes = {
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

  context('when list have many Users', () => {
    it('returns 201 when list is returned', async () => {
      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes2)

      const response = await request(server).post(ApiRoutes.listUser()).send()

      const { error, users } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(users[0].firstname, 'Bob')
      assert.equal(users[1].firstname, 'Charlie')
    })
  })

  context('when list have not user', () => {
    it('returns 422 when  no user exists', async () => {
      const response = await request(server).post(ApiRoutes.listUser()).send()

      const { error, users } = response.body
      assert.deepStrictEqual(error, ListUserError.emptyListUser)
      assert.deepStrictEqual(users, null)
    })
  })*/
})
