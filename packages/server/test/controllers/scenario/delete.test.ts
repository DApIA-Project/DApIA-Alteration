import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/dist/routes'
import assert from 'assert'
import { DeleteScenarioError } from '@smartesting/shared/dist/responses/deleteScenario'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/dist/index'
import { clearDb } from '../../clearDb'

describe(`DELETE ${ApiRoutes.scenarios()}`, () => {
  let server: express.Express

  beforeEach(async () => {
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

  const validScenarioAttributes = {
    name: 'ScenarioA',
    text: 'hide all_planes at 6 seconds',
    options: options,
  }

  context('when scenario exists and is removed', () => {
    it('returns 201 when scenario is removed', async () => {
      const responseCreate = await request(server)
        .post(ApiRoutes.scenarios())
        .send(validScenarioAttributes)

      const scenario = responseCreate.body.scenario

      const response = await request(server)
        .delete(ApiRoutes.scenarios())
        .send({ id: scenario.id })

      const errorDelete = response.body.error
      assert.deepStrictEqual(errorDelete, null)
    })
  })

  context('when scenario not exists and can not be removed', () => {
    it('returns 422 when scenario not exists', async () => {
      const responseCreate = await request(server)
        .post(ApiRoutes.scenarios())
        .send(validScenarioAttributes)

      const scenario = responseCreate.body.scenario

      const response = await request(server)
        .delete(ApiRoutes.scenarios())
        .send({ id: 31 })

      const errorDelete = response.body.error
      assert.deepStrictEqual(errorDelete, DeleteScenarioError.scenarioNotFound)
    })

    it('returns 422 when scenario id is bad type', async () => {
      const responseCreate = await request(server)
        .post(ApiRoutes.scenarios())
        .send(validScenarioAttributes)

      const scenario = responseCreate.body.scenario

      const response = await request(server)
        .delete(ApiRoutes.scenarios())
        .send({ id: String(scenario.id) })

      const errorDelete = response.body.error
      assert.deepStrictEqual(errorDelete, DeleteScenarioError.idBadType)
    })
  })
})
