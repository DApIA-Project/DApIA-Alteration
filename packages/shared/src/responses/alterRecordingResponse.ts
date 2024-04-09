import { Recording } from '../models'
import { DapiaAlterationResponse } from './dapiaAlterationResponse'
import { Invalid } from './responseError'

export type AlterRecordingResponse = DapiaAlterationResponse<
  { alteredRecordings: Recording[] },
  AlterRecordingError
>

export type AlterRecordingError =
  | Invalid.invalidFormat
  | Invalid.invalidSyntax
  | Invalid.invalidContentFile

export const AlterRecordingError = {
  invalidFormat: Invalid.invalidFormat,
  invalidSyntax: Invalid.invalidSyntax,
  invalidContentFile: Invalid.invalidContentFile,
} as const
