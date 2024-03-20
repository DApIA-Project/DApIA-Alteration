import { RequestHandler } from 'express'
import makeAlterationRequest from '../utils/makeAlterationRequest'
import { AlterationAdapters } from '../AlterationAdapters'

function setAdapters(adapters: AlterationAdapters): RequestHandler {
  return (req, _, next) => {
    /*const token = req.header('userToken')
    const user = adapters.userManager.findByToken(token)*/
    const alterationRequest = makeAlterationRequest(req)
    alterationRequest.adapters = adapters
    //alterationRequest.userId = user.id
    next()
  }
}

export default setAdapters
