import { RequestHandler } from 'express'
import makeAlterationRequest from '../utils/makeAlterationRequest'
import { AlterationAdapters } from '../AlterationAdapters'

function makeAdapters(adapters: AlterationAdapters): RequestHandler {
  return (req, _, next) => {
    const alterationRequest = makeAlterationRequest(req)
    alterationRequest.adapters = adapters
    next()
  }
}

export default makeAdapters
