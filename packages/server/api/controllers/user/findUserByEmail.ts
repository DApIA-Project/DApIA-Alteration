import { FindUserByEmailResponse } from '@smartesting/shared/dist/responses/findUserByEmail'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import findUserByEmail from '../../core/user/findUserByEmail'

type Body = Record<string, any>

export default makeRequestHandler<FindUserByEmailResponse>(
  async (req): Promise<FindUserByEmailResponse> => {
    const { userManager } = req.adapters
    const email: string = req.body.email
    return await findUserByEmail(email, userManager)
  }
)
