export type AlterRecordingResponse = {
    alteredRecording: string | null,
    error: AlterRecordingError | null
}

export enum AlterRecordingError {
    invalidFormat = 'invalid_format',
    invalidSyntax = 'invalid_syntax'
}