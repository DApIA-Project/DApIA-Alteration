import { RequestHandler } from 'express'
import makeAlterationRequest from '../utils/makeAlterationRequest'
import { AlterationAdapters } from '../AlterationAdapters'

function setAdapters(adapters: AlterationAdapters): RequestHandler {
  return (req, _, next) => {
    const alterationRequest = makeAlterationRequest(req)
    alterationRequest.adapters = adapters
    next()
  }
}

export default setAdapters
