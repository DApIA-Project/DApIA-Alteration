import * as core from 'express-serve-static-core'
import { FditAdapters } from '../FditAdapters'
import express from 'express'

interface FditRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends express.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  adapters: FditAdapters
}

export default function makeFditRequest(req: express.Request): FditRequest {
  return req as unknown as FditRequest
}
