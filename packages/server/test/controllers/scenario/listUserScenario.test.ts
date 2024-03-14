import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { ListUserScenarioError } from '@smartesting/shared/dist/responses/listUserScenario'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/src'
import { clearDb } from '../../clearDb'

describe(`POST ${ApiRoutes.listUserScenario()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
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

  const validUserAttributes = {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }

  const validScenarioAttributes = {
    name: 'ScenarioA',
    text: 'hide all_planes at 6 seconds',
    options: options,
  }

  context('when list have many Scenarios', () => {
    it('returns 201 when list is returned', async () => {
      let responseUser = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributes,
          user_id: responseUser.body.user.id,
        })

      await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioB',
          user_id: responseUser.body.user.id,
        })

      const response = await request(server)
        .post(ApiRoutes.listUserScenario())
        .send({ user_id: responseUser.body.user.id })

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenarios[0].name, 'ScenarioA')
      assert.equal(scenarios[1].name, 'ScenarioB')
    })

    it('returns 201 when list is returned with filter searchbar', async () => {
      let responseUser = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributes,
          user_id: responseUser.body.user.id,
        })

      await request(server)
        .post(ApiRoutes.createScenario())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioB',
          user_id: responseUser.body.user.id,
        })

      const response = await request(server)
        .post(ApiRoutes.listUserScenario())
        .send({ user_id: responseUser.body.user.id, filter: 'B' })

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenarios[0].name, 'ScenarioB')
      assert.equal(scenarios.length, 1)
    })
  })

  context('when list have not scenario', () => {
    it('returns 422 when  no scenario exists', async () => {
      let responseUser = await request(server)
        .post(ApiRoutes.createUser())
        .send(validUserAttributes)

      const response = await request(server)
        .post(ApiRoutes.listUserScenario())
        .send({ user_id: responseUser.body.user.id })

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, ListUserScenarioError.emptyListScenario)
      assert.deepStrictEqual(scenarios, null)
    })
  })
})
