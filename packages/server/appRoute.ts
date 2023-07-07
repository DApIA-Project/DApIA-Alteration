import express, { Router } from 'express'
import { ApiRoutes } from '@smartesting/shared/dist'
import alterRecording from './api/controllers/recording/alterRecording'
import streamRecording from './api/controllers/recording/streamRecording'
const router = express.Router()

function setRoutes(): Router {
  router.post(ApiRoutes.alteration(), alterRecording)
  router.post(ApiRoutes.streamRecording(), streamRecording)
  return router
}

export default setRoutes
