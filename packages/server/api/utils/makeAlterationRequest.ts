import * as core from 'express-serve-static-core'
import { AlterationAdapters } from '../AlterationAdapters'
import * as express from 'express'

export interface AlterationRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends express.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: number
  adapters: AlterationAdapters
}

export default function makeAlterationRequest(
  req: express.Request
): AlterationRequest {
  return req as unknown as AlterationRequest
}
