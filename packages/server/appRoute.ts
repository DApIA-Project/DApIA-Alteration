import express, { Router } from 'express'
import { ApiRoutes } from '@smartesting/shared/dist'
import alterRecording from './api/controllers/recording/alterRecording'
import streamRecording from './api/controllers/recording/streamRecording'
import makeCreateRequestHandler from './api/controllers/scenario/create'
import makeUpdateRequestHandler from './api/controllers/scenario/update'
import makeDeleteRequestHandler from './api/controllers/scenario/delete'
import makeListRequestHandler from './api/controllers/scenario/listScenario'
import makeCreateUserRequestHandler from './api/controllers/user/create'
import makeUpdateUserRequestHandler from './api/controllers/user/update'
import makeDeleteUserRequestHandler from './api/controllers/user/delete'
import makeListUserScenarioRequestHandler from './api/controllers/scenario/listUserScenario'
import makeListUserRequestHandler from './api/controllers/user/listUser'
import makeUpdatePasswordUserRequestHandler from './api/controllers/user/updatePassword'
import makeFindUserByEmailRequestHandler from './api/controllers/user/findUserByEmail'
import makeLoginUserRequestHandler from './api/controllers/user/login'
const router = express.Router()

function setRoutes(): Router {
  router.post(ApiRoutes.alteration(), alterRecording)
  router.post(ApiRoutes.streamRecording(), streamRecording)
  router.post(ApiRoutes.createScenario(), makeCreateRequestHandler)
  router.post(ApiRoutes.updateScenario(), makeUpdateRequestHandler)
  router.post(ApiRoutes.deleteScenario(), makeDeleteRequestHandler)
  router.post(ApiRoutes.listScenario(), makeListRequestHandler)
  router.post(ApiRoutes.createUser(), makeCreateUserRequestHandler)
  router.post(ApiRoutes.deleteUser(), makeDeleteUserRequestHandler)
  router.post(ApiRoutes.updateUser(), makeUpdateUserRequestHandler)
  router.post(ApiRoutes.listUserScenario(), makeListUserScenarioRequestHandler)
  router.post(ApiRoutes.listUser(), makeListUserRequestHandler)
  router.post(ApiRoutes.updatePassword(), makeUpdatePasswordUserRequestHandler)
  router.post(ApiRoutes.findUserByEmail(), makeFindUserByEmailRequestHandler)
  router.post(ApiRoutes.login(), makeLoginUserRequestHandler)
  return router
}

export default setRoutes
