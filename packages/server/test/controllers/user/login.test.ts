import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { LoginUserError } from '@smartesting/shared/dist/responses/loginUser'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import bcrypt from 'bcryptjs'

describe(`POST ${ApiRoutes.login()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  afterEach(async () => {
    await clearDb()
  })

  const validUserAttributes = {
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
  }

  context('when user email is invalid', () => {
    it('returns 422 if the email is not specified', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: '',
        password: 's3cret!',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyEmail)
    })

    it('returns 422 if the email is blank', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: '     ',
        password: 's3cret!',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.userNotFound)
    })

    it('returns 422 if the email is not set', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        password: 's3cret!',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyEmail)
    })

    it('returns 422 if the email is not in user table', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'test@mail.fr',
        password: 's3cret!',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.userNotFound)
    })
  })

  context('when user password is invalid', () => {
    it('returns 422 if the password is not specified', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'bob.dupont@mail.fr',
        password: '',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyPassword)
    })

    it('returns 422 if the password is blank', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'bob.dupont@mail.fr',
        password: '      ',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.passwordConflict)
    })

    it('returns 422 if the password is not set', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'bob.dupont@mail.fr',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyPassword)
    })

    it('returns 422 if the password is not the same', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'bob.dupont@mail.fr',
        password: 'badPassword',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.passwordConflict)
    })
  })

  context('when user all is valid', () => {
    it('returns 201 when all is valid', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server)
        .post(ApiRoutes.login())
        .send({ email: 'bob.dupont@mail.fr', password: 's3cret!' })

      const { error, user } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(user.email, 'bob.dupont@mail.fr')
      assert.notEqual(user.password, 's3cret!')
      assert(await bcrypt.compare('s3cret!', user.password))
    })
  })
})
