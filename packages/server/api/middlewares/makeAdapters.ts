import { RequestHandler } from 'express'
import makeFditRequest from '../utils/makeFditRequest'
import { FditAdapters } from '../FditAdapters'

function makeAdapters(adapters: FditAdapters): RequestHandler {
  return (req, _, next) => {
    const fditRequest = makeFditRequest(req)
    fditRequest.adapters = adapters
    next()
  }
}

export default makeAdapters
