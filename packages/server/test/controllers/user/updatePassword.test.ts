import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { UpdatePasswordUserError } from '@smartesting/shared/dist/responses/updatePasswordUser'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import bcrypt from 'bcryptjs'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

describe(`POST ${ApiRoutes.updatePassword()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  afterEach(async () => {
    await clearDb()
  })

  const validUserAttributesMissingPassword = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    isAdmin: false,
  }

  const validUserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
    isAdmin: false,
  }

  context('when user password is invalid', () => {
    it('returns 422 if the password is not specified', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updatePassword())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributesMissingPassword,
          password: '',
          newPassword: 'newPassword',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdatePasswordUserError.emptyPassword)
    })

    it('returns 422 if the password is blank', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updatePassword())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributesMissingPassword,
          password: '   ',
          newPassword: 'newPassword',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdatePasswordUserError.emptyPassword)
    })

    it('returns 422 if the password is not set', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updatePassword())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributesMissingPassword,
          newPassword: 'newPassword',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdatePasswordUserError.emptyPassword)
    })
  })

  context('when user not exists', () => {
    it('returns 404 when user not exists', async () => {
      const response = await request(server)
        .post(ApiRoutes.updatePassword())
        .set('userToken', uuid())
        .send({
          ...validUserAttributes,
          password: 'Other Text',
          newPassword: 'newPassword',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(error, UpdatePasswordUserError.userNotFound)
      assert.equal(user, null)
    })
  })

  context('when user Password is valid', () => {
    it('returns 201 when all is valid', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updatePassword())
        .set('userToken', userCreate.token)
        .send({
          ...validUserAttributes,
          password: 's3cret!',
          newPassword: 'newPassword',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(error, null)
      assert(await bcrypt.compare('newPassword', user.password))
    })
  })
})
