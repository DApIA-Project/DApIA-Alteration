import { RequestHandler } from 'express'
import makeAlterationRequest from '../utils/makeAlterationRequest'
import { AlterationAdapters } from '../AlterationAdapters'

function setAdapters(adapters: AlterationAdapters): RequestHandler {
  return async (req, _, next) => {
    const token = req.header('userToken')
    const alterationRequest = makeAlterationRequest(req)
    alterationRequest.adapters = adapters
    if (token !== undefined) {
      const user = await adapters.userManager.findUserByToken(token)
      if (user !== null) {
        alterationRequest.userId = user.id
      }
    }

    next()
  }
}

export default setAdapters
