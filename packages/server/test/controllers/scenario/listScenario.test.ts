import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { ListScenarioError } from '@smartesting/shared/dist/responses/listScenario'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/dist/index'

describe(`POST ${ApiRoutes.listScenario()}`, () => {
  let server: express.Express

  beforeEach(() => {
    server = setupExpress(makeTestAdapters())
  })

  const options: OptionsAlteration = {
    haveLabel: false,
    haveRealism: true,
    haveNoise: false,
    haveDisableAltitude: false,
    haveDisableLatitude: true,
    haveDisableLongitude: false,
  }

  const validScenarioAttributes = {
    name: 'ScenarioA',
    text: 'hide all_planes at 6 seconds',
    options: options,
  }

  context('when list have many Scenarios', () => {
    it('returns 201 when list is returned', async () => {
      await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)

      await request(server)
        .post(ApiRoutes.createScenario())
        .send({ ...validScenarioAttributes, name: 'ScenarioB' })

      const response = await request(server)
        .post(ApiRoutes.listScenario())
        .send()

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenarios[0].name, 'ScenarioA')
      assert.equal(scenarios[1].name, 'ScenarioB')
    })
  })

  context('when list have not scenario', () => {
    it('returns 422 when  no scenario exists', async () => {
      const response = await request(server)
        .post(ApiRoutes.listScenario())
        .send()

      const { error, scenarios } = response.body
      assert.deepStrictEqual(error, ListScenarioError.emptyListScenario)
      assert.deepStrictEqual(scenarios, null)
    })
  })
})
