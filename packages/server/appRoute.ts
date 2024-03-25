import express, { Router } from 'express'
import { ApiRoutes } from '@smartesting/shared/dist'
import alterRecording from './api/controllers/recording/alterRecording'
import streamRecording from './api/controllers/recording/streamRecording'
import makeCreateRequestHandler from './api/controllers/scenario/create'
import makeUpdateRequestHandler from './api/controllers/scenario/update'
import makeDeleteRequestHandler from './api/controllers/scenario/delete'
import makeCreateUserRequestHandler from './api/controllers/user/create'
import makeUpdateUserRequestHandler from './api/controllers/user/update'
import makeDeleteUserRequestHandler from './api/controllers/user/delete'
import makeListUserScenarioRequestHandler from './api/controllers/scenario/listUserScenario'
import makeListUserRequestHandler from './api/controllers/user/listUser'
import makeUpdatePasswordUserRequestHandler from './api/controllers/user/updatePassword'
import makeFindUserByTokenRequestHandler from './api/controllers/user/findUserByToken'
import makeFindScenarioRequestHandler from './api/controllers/scenario/findScenario'
import makeLoginUserRequestHandler from './api/controllers/user/login'
const router = express.Router()

function setRoutes(): Router {
  router.post(ApiRoutes.alteration(), alterRecording)
  router.post(ApiRoutes.streamRecording(), streamRecording)
  router.post(ApiRoutes.scenarios(), makeCreateRequestHandler)
  router.post(ApiRoutes.listUserScenario(), makeListUserScenarioRequestHandler)
  router.post(ApiRoutes.users(), makeCreateUserRequestHandler)
  router.post(ApiRoutes.login(), makeLoginUserRequestHandler)

  router.put(ApiRoutes.scenarios(), makeUpdateRequestHandler)
  router.put(ApiRoutes.users(), makeUpdateUserRequestHandler)
  router.put(ApiRoutes.updatePassword(), makeUpdatePasswordUserRequestHandler)

  router.delete(ApiRoutes.scenarios(), makeDeleteRequestHandler)
  router.delete(ApiRoutes.users(), makeDeleteUserRequestHandler)

  router.get(ApiRoutes.findScenario(), makeFindScenarioRequestHandler)
  router.get(ApiRoutes.findUserByToken(), makeFindUserByTokenRequestHandler)

  return router
}

export default setRoutes
