import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { CreateUserError } from '@smartesting/shared/dist/responses/createUser'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import bcrypt from 'bcryptjs'

describe(`POST ${ApiRoutes.users()}`, () => {
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

  context('when user firstname is invalid', () => {
    it('returns 422 if the firstname is not specified', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({
          ...validUserAttributesMissingFirstname,
          firstname: '',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyFirstname)
    })

    it('returns 422 if the firstname is blank', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingFirstname, firstname: '   ' })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyFirstname)
    })

    it('returns 422 if the firstname is not set', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingFirstname })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyFirstname)
    })
  })

  context('when user lastname is invalid', () => {
    it('returns 422 if the lastname is not specified', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({
          ...validUserAttributesMissingLastname,
          lastname: '',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyLastname)
    })

    it('returns 422 if the lastname is blank', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingLastname, lastname: '   ' })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyLastname)
    })

    it('returns 422 if the lastname is not set', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingLastname })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyLastname)
    })
  })

  context('when user email is invalid', () => {
    it('returns 422 if the email is not specified', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({
          ...validUserAttributesMissingEmail,
          email: '',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyEmail)
    })

    it('returns 422 if the email is blank', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingEmail, email: '   ' })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyEmail)
    })

    it('returns 422 if the email is not set', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingEmail })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyEmail)
    })
  })

  context('when user password is invalid', () => {
    it('returns 422 if the password is not specified', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({
          ...validUserAttributesMissingPassword,
          password: '',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyPassword)
    })

    it('returns 422 if the password is blank', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingPassword, password: '   ' })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyPassword)
    })

    it('returns 422 if the password is not set', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({ ...validUserAttributesMissingPassword })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.emptyPassword)
    })
  })

  context('when user isAdmin are invalid', () => {
    it('returns 422 if isAdmin is not boolean', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send({
          ...validUserAttributesMissingIsAdmin,
          isAdmin: 'salut',
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, CreateUserError.optionsBadType)
    })
  })

  context('when user all is valid', () => {
    it('returns 201 when all is valid', async () => {
      const response = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)

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
