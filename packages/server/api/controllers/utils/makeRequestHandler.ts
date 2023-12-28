import { DapiaAlterationResponse } from '@smartesting/shared/dist/responses/dapiaAlterationResponse'
import {
  getStatusCode,
  ResponseError,
} from '@smartesting/shared/dist/responses/responseError'
import makeAlterationRequest, {
  AlterationRequest,
} from '../../utils/makeAlterationRequest'
import * as express from 'express'

export function makeRequestHandler<
  R extends DapiaAlterationResponse<{}, ResponseError>
>(
  doResponse: (alterationRequest: AlterationRequest) => Promise<R>,
  defaultStatusCode = 200
): express.RequestHandler {
  return async (req, res) => {
    const dapiaResponse = await doResponse(makeAlterationRequest(req))
    return toExpressResponse(res, dapiaResponse, defaultStatusCode)
  }
}

export function toExpressResponse(
  res: express.Response,
  dapiaResponse: DapiaAlterationResponse<{}, ResponseError>,
  defaultStatusCode = 200
) {
  const status: number = !dapiaResponse.error
    ? defaultStatusCode
    : getStatusCode(dapiaResponse.error)
  return res.status(status).json(dapiaResponse).end()
}
