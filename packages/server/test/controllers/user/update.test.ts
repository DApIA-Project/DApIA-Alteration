import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { UpdateUserError } from '@smartesting/shared/dist/responses/updateUser'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/dist/index'
import { clearDb } from '../../clearDb'
import bcrypt from 'bcryptjs'

describe(`POST ${ApiRoutes.updateUser()}`, () => {
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
    it('returns 422 if the name is not specified', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingFirstname,
          firstname: '',
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyFirstname)
    })

    it('returns 422 if the firstname is blank', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingFirstname,
          firstname: '   ',
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyFirstname)
    })

    it('returns 422 if the firstname is not set', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingFirstname,
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyFirstname)
    })
  })

  context('when user lastname is invalid', () => {
    it('returns 422 if the lastname is not specified', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingLastname,
          lastname: '',
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyLastname)
    })

    it('returns 422 if the lastname is blank', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingLastname,
          lastname: '   ',
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyLastname)
    })

    it('returns 422 if the lastname is not set', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingLastname,
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyLastname)
    })
  })

  context('when user email is invalid', () => {
    it('returns 422 if the email is not specified', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingEmail,
          email: '',
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyEmail)
    })

    it('returns 422 if the email is blank', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingEmail,
          email: '   ',
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyEmail)
    })

    it('returns 422 if the email is not set', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)
      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributesMissingEmail,
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(user, null)
      assert.equal(error, UpdateUserError.emptyEmail)
    })
  })

  context('when user not exists', () => {
    it('returns 404 when user not exists', async () => {
      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributes,
          firstname: 'UserW',
          lastname: 'Other Text',
          email: 'Other Text',
          password: 'Other Text',
          id: 31,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(error, UpdateUserError.userNotFound)
      assert.equal(user, null)
    })
  })

  context('when user all is valid', () => {
    it('returns 201 when all is valid', async () => {
      const createUserReq = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const userCreate = createUserReq.body.user

      const response = await request(server)
        .post(ApiRoutes.updateUser())
        .send({
          ...validUserAttributes,
          firstname: 'Charlie',
          lastname: 'Stone',
          email: 'charlie.stone@mail.fr',
          id: userCreate.id,
        })

      const { error, user } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(user.firstname, 'Charlie')
      assert.equal(user.lastname, 'Stone')
      assert.equal(user.email, 'charlie.stone@mail.fr')
    })
  })
})
