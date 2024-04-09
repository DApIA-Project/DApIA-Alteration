import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/dist/routes'
import assert from 'assert'
import { UpdateUserError } from '@smartesting/shared/dist/responses/updateUser'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

describe(`PUT ${ApiRoutes.users()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  afterEach(async () => {
    await clearDb()
  })

  const validUserAttributesMissingEmail = {
    password: 's3cret!',
  }

  const validUserAttributes = {
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
  }

  context('when user email is invalid', () => {
    it('returns 422 if the email is not specified', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .put(ApiRoutes.users())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributesMissingEmail,
          email: '',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyEmail)
    })

    it('returns 422 if the email is blank', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .put(ApiRoutes.users())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributesMissingEmail,
          email: '   ',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyEmail)
    })

    it('returns 422 if the email is not set', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .put(ApiRoutes.users())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributesMissingEmail,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyEmail)
    })
  })

  context('when user not exists', () => {
    it('returns 404 when user not exists', async () => {
      const response = await request(server)
        .put(ApiRoutes.users())
        .set('userToken', uuid())
        .send({
          ...validUserAttributes,
          email: 'Other Text',
          password: 'Other Text',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(error, UpdateUserError.userNotFound)
      assert.equal(user, null)
    })
  })

  context('when user all is valid', () => {
    it('returns 201 when all is valid', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      const userCreate = createUserReq.body.user

      const response = await request(server)
        .put(ApiRoutes.users())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributes,
          email: 'charlie.stone@mail.fr',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(user.email, 'charlie.stone@mail.fr')
    })
  })
})
