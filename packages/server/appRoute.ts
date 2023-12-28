import express, { Router } from 'express'
import { ApiRoutes } from '@smartesting/shared/dist'
import alterRecording from './api/controllers/recording/alterRecording'
import streamRecording from './api/controllers/recording/streamRecording'
import makeRequestHandler from './api/controllers/scenario/create'
const router = express.Router()

function setRoutes(): Router {
  router.post(ApiRoutes.alteration(), alterRecording)
  router.post(ApiRoutes.streamRecording(), streamRecording)
  router.post(ApiRoutes.createScenario(), makeRequestHandler)
  return router
}

export default setRoutes
