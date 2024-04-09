import { ResponseError } from './responseError'

export type DapiaAlterationResponse<
  Data extends { [key: string]: any },
  CustomError extends ResponseError
> = Data & { error: CustomError | null }
