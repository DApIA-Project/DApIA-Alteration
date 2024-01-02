import express, { Router } from 'express'
import { ApiRoutes } from '@smartesting/shared/dist'
import alterRecording from './api/controllers/recording/alterRecording'
import streamRecording from './api/controllers/recording/streamRecording'
import makeCreateRequestHandler from './api/controllers/scenario/create'
import makeUpdateRequestHandler from './api/controllers/scenario/update'
import makeDeleteRequestHandler from './api/controllers/scenario/delete'
const router = express.Router()

function setRoutes(): Router {
  router.post(ApiRoutes.alteration(), alterRecording)
  router.post(ApiRoutes.streamRecording(), streamRecording)
  router.post(ApiRoutes.createScenario(), makeCreateRequestHandler)
  router.post(ApiRoutes.updateScenario(), makeUpdateRequestHandler)
  router.post(ApiRoutes.deleteScenario(), makeDeleteRequestHandler)
  return router
}

export default setRoutes
