import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/dist/routes'
import assert from 'assert'
import { ListUserScenarioError } from '@smartesting/shared/dist/responses/listUserScenario'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration, Sort } from '@smartesting/shared/dist'
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
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          user_id: responseUser.body.user.id,
        })

      await request(server)
        .post(ApiRoutes.scenarios())
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
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          user_id: responseUser.body.user.id,
        })

      await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioB',
          user_id: responseUser.body.user.id,
        })

      const response = await request(server)
        .post(ApiRoutes.listUserScenario())
        .send({ user_id: responseUser.body.user.id, searchBar: 'B' })

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenarios[0].name, 'ScenarioB')
      assert.equal(scenarios.length, 1)
    })

    it('returns 201 when list is returned with filter dates', async () => {
      let responseUser = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      let responseScenario1 = await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          user_id: responseUser.body.user.id,
        })

      let responseScenario2 = await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioB',
          user_id: responseUser.body.user.id,
        })

      const response = await request(server)
        .post(ApiRoutes.listUserScenario())
        .send({
          user_id: responseUser.body.user.id,
          undefined,
          startDate: responseScenario1.body.scenario.updatedAt,
          endDate: responseScenario2.body.scenario.updatedAt,
        })

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenarios[0].name, 'ScenarioA')
      assert.equal(scenarios[1].name, 'ScenarioB')
      assert.equal(scenarios.length, 2)
    })

    it('returns 201 when list is returned with filter options Alteration', async () => {
      let responseUser = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      let responseScenario1 = await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          user_id: responseUser.body.user.id,
        })

      let responseScenario2 = await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioB',
          user_id: responseUser.body.user.id,
        })

      const response = await request(server)
        .post(ApiRoutes.listUserScenario())
        .send({
          user_id: responseUser.body.user.id,
          optionsAlteration: options,
        })

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenarios[0].name, 'ScenarioA')
      assert.equal(scenarios[1].name, 'ScenarioB')
      assert.equal(scenarios.length, 2)
    })

    it('returns 201 when list is returned with sort', async () => {
      let responseUser = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      let responseScenario1 = await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          user_id: responseUser.body.user.id,
        })

      let responseScenario2 = await request(server)
        .post(ApiRoutes.scenarios())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioB',
          user_id: responseUser.body.user.id,
        })

      const response = await request(server)
        .post(ApiRoutes.listUserScenario())
        .send({
          user_id: responseUser.body.user.id,
          sort: Sort.antialphabeticalOrder,
        })

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenarios[0].name, 'ScenarioB')
      assert.equal(scenarios[1].name, 'ScenarioA')
      assert.equal(scenarios.length, 2)
    })
  })

  context('when list have not scenario', () => {
    it('returns 422 when  no scenario exists', async () => {
      let responseUser = await request(server)
        .post(ApiRoutes.users())
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
