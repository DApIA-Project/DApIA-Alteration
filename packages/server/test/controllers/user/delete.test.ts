import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { DeleteUserError } from '@smartesting/shared/dist/responses/deleteUser'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/dist/index'
import { clearDb } from '../../clearDb'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

describe(`DELETE ${ApiRoutes.users()}`, () => {
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
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      const user = responseCreate.body.user

      const response = await request(server)
        .delete(ApiRoutes.users())
        .set('userToken', user.token)
        .send({ password: validUserAttributes.password })

      const error = response.body.error
      assert.deepStrictEqual(error, null)
    })
  })

  context('when user not exists and can not be removed', () => {
    it('returns 422 when user not exists, id is undefined', async () => {
      const responseCreate = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      const user = responseCreate.body.user

      const response = await request(server)
        .delete(ApiRoutes.users())
        .set('userToken', uuid())
        .send({ password: validUserAttributes.password })

      const error = response.body.error
      assert.deepStrictEqual(error, DeleteUserError.idBadType)
    })
  })
})
