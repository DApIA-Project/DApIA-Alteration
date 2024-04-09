import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { DeleteUserError } from '@smartesting/shared/dist/responses/deleteUser'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/dist/index'
import { clearDb } from '../../clearDb'

describe(`POST ${ApiRoutes.deleteUser()}`, () => {
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
    email: 'bob.dupont@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }

  context('when user exists and is removed', () => {
    it('returns 201 when user is removed', async () => {
      const responseCreate = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const user = responseCreate.body.user

      const response = await request(server)
        .post(ApiRoutes.deleteUser())
        .send({ id: user.id, password: validUserAttributes.password })

      const error = response.body.error
      assert.deepStrictEqual(error, null)
    })
  })

  context('when user not exists and can not be removed', () => {
    it('returns 422 when user not exists', async () => {
      const responseCreate = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const user = responseCreate.body.user

      const response = await request(server)
        .post(ApiRoutes.deleteUser())
        .send({ id: 31, password: validUserAttributes.password })

      const error = response.body.error
      assert.deepStrictEqual(error, DeleteUserError.userNotFound)
    })

    it('returns 422 when user id is bad type', async () => {
      const responseCreate = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const user = responseCreate.body.user

      const response = await request(server)
        .post(ApiRoutes.deleteUser())
        .send({ id: String(user.id), password: validUserAttributes.password })

      const error = response.body.error
      assert.deepStrictEqual(error, DeleteUserError.idBadType)
    })
  })
})
