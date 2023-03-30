import express, { Router } from 'express'
import { ApiRoutes } from '@smartesting/shared/dist/routes'
import alterRecording from './api/controllers/recording/alterRecording'
const router = express.Router()

function setRoutes(): Router {
  router.post(ApiRoutes.alteration(), alterRecording)
  return router
}

export default setRoutes
