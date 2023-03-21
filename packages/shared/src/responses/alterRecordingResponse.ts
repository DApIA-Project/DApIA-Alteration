export type AlterRecordingResponse = {
    alteredRecording: string | null,

    newfileName: string | undefined,

    filesToRemove : string[] | undefined,
    error: AlterRecordingError | null
}

export enum AlterRecordingError {
    invalidFormat = 'invalid_format',
    invalidSyntax = 'invalid_syntax'
}