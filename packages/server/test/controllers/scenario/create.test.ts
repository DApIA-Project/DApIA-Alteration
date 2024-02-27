import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { CreateScenarioError } from '@smartesting/shared/dist/responses/createScenario'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/dist/index'
import { clearDb } from '../../clearDb'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import { User } from '@smartesting/shared/dist/models/User'

describe(`POST ${ApiRoutes.createScenario()}`, () => {
  let server: express.Express
  const validUserAttributes: User = {
    id: '2',
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret!',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    server = setupExpress(makeTestAdapters())
    await request(server).post(ApiRoutes.createUser()).send(validUserAttributes)
  })

  afterEach(async () => {
    await clearDb()
  })

  const options: OptionsAlteration = {
    haveLabel: false,
    haveRealism: true,
    haveNoise: false,
    haveDisableAltitude: false,
    haveDisableLatitude: true,
    haveDisableLongitude: false,
  }
  const validScenarioAttributesMissingName = {
    text: 'hide all_planes at 6 seconds',
    options: options,
    user_id: validUserAttributes.id,
  }
  const validScenarioAttributesMissingText = {
    name: 'ScenarioA',
    options: options,
    user_id: validUserAttributes.id,
  }
  const validScenarioAttributesMissingOption = {
    name: 'ScenarioA',
    text: 'hide all_planes at 6 seconds',
    user_id: validUserAttributes.id,
  }
  const validScenarioAttributes = {
    name: 'ScenarioA',
    text: 'hide all_planes at 6 seconds',
    options: options,
    user_id: 2,
  }

  context('when scenario name is invalid', () => {
    it('returns 422 if the name is not specified', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributesMissingName,
          name: '',
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.emptyName)
    })

    it('returns 422 if the name is blank', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({ ...validScenarioAttributesMissingName, name: '   ' })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.emptyName)
    })

    it('returns 422 if the name is not set', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({ ...validScenarioAttributesMissingName })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.emptyName)
    })
  })

  context('when scenario text is invalid', () => {
    it('returns 422 if the text is not set', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributesMissingText)

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.emptyTextScenario)
    })
  })

  context('when scenario option are invalid', () => {
    it('returns 422 if the option haveRealism is not boolean', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributesMissingOption,
          options: {
            haveLabel: false,
            haveRealism: 'salut',
            haveNoise: false,
            haveDisableLongitude: false,
            haveDisableLatitude: false,
            haveDisableAltitude: false,
          },
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveNoise is not boolean', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributesMissingOption,
          options: {
            haveLabel: false,
            haveRealism: false,
            haveNoise: 'salut',
            haveDisableLongitude: false,
            haveDisableLatitude: false,
            haveDisableAltitude: false,
          },
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveLabel is not boolean', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributesMissingOption,
          options: {
            haveLabel: 'salut',
            haveRealism: false,
            haveNoise: false,
            haveDisableLongitude: false,
            haveDisableLatitude: false,
            haveDisableAltitude: false,
          },
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveDisableLongitude is not boolean', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributesMissingOption,
          options: {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLongitude: 'salut',
            haveDisableLatitude: false,
            haveDisableAltitude: false,
          },
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveDisableLatitude is not boolean', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributesMissingOption,
          options: {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLongitude: false,
            haveDisableLatitude: 'salut',
            haveDisableAltitude: false,
          },
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveDisableAltitude is not boolean', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributesMissingOption,
          options: {
            haveLabel: false,
            haveRealism: false,
            haveNoise: false,
            haveDisableLongitude: false,
            haveDisableLatitude: false,
            haveDisableAltitude: 'salut',
          },
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, CreateScenarioError.optionsBadType)
    })
  })

  context('when scenario all is valid', () => {
    it('returns 201 when all is valid', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)

      const { error, scenario } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenario.name, 'ScenarioA')
      assert.equal(scenario.text, 'hide all_planes at 6 seconds')
    })

    it('returns 201 if the text is not specified', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({ ...validScenarioAttributesMissingText, text: '' })

      const { error, scenario } = response.body
      assert.equal(scenario.text, '')
      assert.deepStrictEqual(error, null)
    })

    it('returns 201 if the text is blank', async () => {
      const response = await request(server)
        .post(ApiRoutes.createScenario())
        .send({ ...validScenarioAttributesMissingText, text: '   ' })

      const { error, scenario } = response.body
      assert.equal(scenario.text, '')
      assert.deepStrictEqual(error, null)
    })
  })
})
