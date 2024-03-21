import { FindUserByTokenResponse } from '@smartesting/shared/dist/responses/findUserByToken'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import findUserByToken from '../../core/user/findUserByToken'

type Body = Record<string, any>

export default makeRequestHandler<FindUserByTokenResponse>(
  async (req): Promise<FindUserByTokenResponse> => {
    const { userManager } = req.adapters
    const token: string = req.body.token
    return await findUserByToken(token, userManager)
  }
)
