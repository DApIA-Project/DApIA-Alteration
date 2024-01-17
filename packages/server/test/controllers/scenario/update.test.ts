import express from 'express'
import { setupExpress } from '../../helpers/setupExpress'
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes'
import assert from 'assert'
import { UpdateScenarioError } from '@smartesting/shared/dist/responses/updateScenario'
import makeTestAdapters from '../../makeTestAdapters'
import { OptionsAlteration } from '@smartesting/shared/dist/index'

describe(`POST ${ApiRoutes.updateScenario()}`, () => {
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
  const validScenarioAttributesMissingName = {
    text: 'hide all_planes at 6 seconds',
    options: options,
  }
  const validScenarioAttributesMissingText = {
    name: 'ScenarioA',
    options: options,
  }
  const validScenarioAttributesMissingOption = {
    name: 'ScenarioA',
    text: 'hide all_planes at 6 seconds',
  }
  const validScenarioAttributes = {
    name: 'ScenarioA',
    text: 'hide all_planes at 6 seconds',
    options: options,
  }

  context('when scenario name is invalid', () => {
    it('returns 422 if the name is not specified', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributesMissingName,
          name: '',
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.emptyName)
    })

    it('returns 422 if the name is blank', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributesMissingName,
          name: '   ',
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.emptyName)
    })

    it('returns 422 if the name is not set', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributesMissingName,
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.emptyName)
    })
  })

  context('when scenario text is invalid', () => {
    it('returns 422 if the text is not set', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributesMissingText,
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.emptyTextScenario)
    })
  })

  context('when scenario option are invalid', () => {
    it('returns 422 if the option haveRealism is not boolean', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
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
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveNoise is not boolean', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
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
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveLabel is not boolean', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
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
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveDisableLongitude is not boolean', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
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
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveDisableLatitude is not boolean', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
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
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.optionsBadType)
    })

    it('returns 422 if the option haveDisableAltitude is not boolean', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
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
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(scenario, null)
      assert.equal(error, UpdateScenarioError.optionsBadType)
    })
  })

  context('when scenario not exists', () => {
    it('returns 404 when scenario not exists', async () => {
      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioW',
          text: 'Other Text',
          id: '31',
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(error, UpdateScenarioError.scenarioNotFound)
      assert.equal(scenario, null)
    })
  })

  context('when scenario all is valid', () => {
    it('returns 201 when all is valid', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)

      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributes,
          name: 'ScenarioW',
          text: 'Other Text',
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.deepStrictEqual(error, null)
      assert.equal(scenario.name, 'ScenarioW')
      assert.equal(scenario.text, 'Other Text')
    })

    it('returns 201 if the text is not specified', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributesMissingText,
          text: '',
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.equal(scenario.text, '')
      assert.deepStrictEqual(error, null)
    })

    it('returns 201 if the text is blank', async () => {
      const createScenarioReq = await request(server)
        .post(ApiRoutes.createScenario())
        .send(validScenarioAttributes)
      const scenarioCreate = createScenarioReq.body.scenario

      const response = await request(server)
        .post(ApiRoutes.updateScenario())
        .send({
          ...validScenarioAttributesMissingText,
          text: '   ',
          id: scenarioCreate.id,
        })

      const { error, scenario } = response.body
      assert.equal(scenario.text, '')
      assert.deepStrictEqual(error, null)
    })
  })
})
