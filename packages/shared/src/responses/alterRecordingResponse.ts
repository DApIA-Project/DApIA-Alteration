import { Recording } from '../models'

export type AlterRecordingResponse = {
  alteredRecordings: Recording[]
  error: AlterRecordingError | string | null
}

export enum AlterRecordingError {
  invalidFormat = 'invalid_format',
  invalidSyntax = 'invalid_syntax',
}
