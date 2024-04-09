import { FindUserResponse } from '@smartesting/shared/dist/responses/findUser'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import findUser from '../../core/user/findUser'

type Body = Record<string, any>

export default makeRequestHandler<FindUserResponse>(
  async (req): Promise<FindUserResponse> => {
    const { userManager } = req.adapters
    const id: number = req.body.id
    return await findUser(id, userManager)
  }
)
