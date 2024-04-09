import { ListUserResponse } from '@smartesting/shared/dist/responses/listUser'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import listUser from '../../core/user/listUser'

type Body = Record<string, any>

export default makeRequestHandler<ListUserResponse>(
  async (req): Promise<ListUserResponse> => {
    const { userManager } = req.adapters
    return await listUser(userManager)
  }
)
