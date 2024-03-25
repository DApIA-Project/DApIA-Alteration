import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import makeTestAdapters from '../../makeTestAdapters'
import { clearDb } from '../../clearDb'
import { FindScenarioError } from '@smartesting/shared/dist/responses/findScenario'
import { OptionsAlteration } from '@smartesting/shared/dist/index'

describe(`GET ${ApiRoutes.findScenario(0)}`, () => {
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
    email: 'bob.dupont7@mail.fr',
    password: 's3cret',
    isAdmin: false,
  }

  const validScenarioAttributes = {
    name: 'Scenario A',
    text: 'hide all_planes at 6 seconds',
    options: options,
  }

  const validScenarioAttributes2 = {
    name: 'Scenario B',
    text: 'hide all_planes at 77 seconds',
    options: options,
  }

  context('when find scenario have in many Scenarios', () => {
    it('returns 201 when scenario is returned', async () => {
      const user1 = await request(server)
        .post(ApiRoutes.users())
        .send(validUserAttributes)

      const scenario1 = await request(server)
        .post(ApiRoutes.scenarios())
        .send({ ...validScenarioAttributes, user_id: user1.body.user.id })

      await request(server)
        .post(ApiRoutes.scenarios())
        .send({ ...validScenarioAttributes2, user_id: user1.body.user.id })
      const response = await request(server).get(
        ApiRoutes.findScenario(scenario1.body.scenario.id)
      )

      const { error, scenario } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenario.name, 'Scenario A')
      assert.equal(scenario.text, 'hide all_planes at 6 seconds')
    })
  })

  context('when scenario list have not scenario', () => {
    it('returns 422 when  no scenario exists', async () => {
      await request(server).post(ApiRoutes.users()).send(validUserAttributes)

      const response = await request(server).get(ApiRoutes.findScenario(6))

      const { error, scenario } = response.body
      assert.deepStrictEqual(error, FindScenarioError.scenarioNotFound)
      assert.deepStrictEqual(scenario, null)
    })
  })
})
