import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { LoginUserError } from '@smartesting/shared/dist/responses/loginUser'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import bcrypt from 'bcryptjs'

describe(`POST ${ApiRoutes.createUser()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  afterEach(async () => {
    await clearDb()
  })

  const validUserAttributesMissingFirstname = {
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
    isAdmin: false,
  }

  const validUserAttributesMissingLastname = {
    firstname: 'Bob',
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
    isAdmin: false,
  }

  const validUserAttributesMissingEmail = {
    firstname: 'Bob',
    lastname: 'Dupont',
    password: 's3cret!',
    isAdmin: false,
  }

  const validUserAttributesMissingPassword = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    isAdmin: false,
  }

  const validUserAttributesMissingIsAdmin = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
  }

  const validUserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
    isAdmin: false,
  }

  context('when user email is invalid', () => {
    it('returns 422 if the email is not specified', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: '',
        password: 's3cret!',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyEmail)
    })

    it('returns 422 if the email is blank', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: '     ',
        password: 's3cret!',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.userNotFound)
    })

    it('returns 422 if the email is not set', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        password: 's3cret!',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyEmail)
    })

    it('returns 422 if the email is not in user table', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

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
      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'bob.dupont@mail.fr',
        password: '',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyPassword)
    })

    it('returns 422 if the password is blank', async () => {
      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'bob.dupont@mail.fr',
        password: '      ',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.passwordConflict)
    })

    it('returns 422 if the password is not set', async () => {
      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server).post(ApiRoutes.login()).send({
        email: 'bob.dupont@mail.fr',
      })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, LoginUserError.emptyPassword)
    })

    it('returns 422 if the password is not the same', async () => {
      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

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
      await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server)
        .post(ApiRoutes.login())
        .send({ email: 'bob.dupont@mail.fr', password: 's3cret!' })

      const { error, user } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(user.firstname, 'Bob')
      assert.equal(user.lastname, 'Dupont')
      assert.equal(user.email, 'bob.dupont@mail.fr')
      assert.notEqual(user.password, 's3cret!')
      assert(await bcrypt.compare('s3cret!', user.password))
      assert.equal(user.isAdmin, false)
    })
  })
})
