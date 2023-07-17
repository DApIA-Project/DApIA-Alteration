import React from 'react'
import { ScenarioEditorTestIds } from '../ScenarioEditor'
import { RecordInputFile } from './RecordInputFile/RecordInputFile'
import { Recording } from '@smartesting/shared/dist'
import './RecordInputFiles.css'

export enum RecordInputFilesTestIds {
  INPUT_FILE_RECORDING = 'RecordInputFiles.action.selectRecording',
  INPUT_FILE_RECORDING_REPLAY = 'RecordInputFiles.action.selectRecordingReplay',
  RECORDING_IS_PRESENT = 'RecordInputFiles.action.isSelectedRecording',
  RECORDING_IS_NOT_PRESENT = 'RecordInputFiles.action.isNotSelectedRecording',
}
export type RecordInputFilesProps = {
  onChangeRecord: (newValue: Recording) => void
  onChangeReplayRecord: (newValue: Recording) => void
}
export const RecordInputFiles: React.FunctionComponent<
  RecordInputFilesProps
> = ({ onChangeRecord, onChangeReplayRecord }) => {
  return (
    <div className={'allInputFiles'}>
      <RecordInputFile
        testIdInput={RecordInputFilesTestIds.INPUT_FILE_RECORDING}
        onRead={(recording) => {
          onChangeRecord(recording)
        }}
      />
      <RecordInputFile
        testIdInput={RecordInputFilesTestIds.INPUT_FILE_RECORDING_REPLAY}
        onRead={(recording) => {
          onChangeReplayRecord(recording)
        }}
      />
    </div>
  )
}

/**
 <div className={'zone_input_files'}>
 <InputFile
 name={'recording'}
 onChange={onRecordingSelected}
 data-testid={ScenarioEditorTestIds.INPUT_FILE_RECORDING}
 />
 <img
 data-testid={datatestRecordingSelection()}
 src={imageRecordingSelection()}
 alt={'recording_charged_or_not'}
 title={'Enregistrement requis'}
 />
 </div>
 <div className={'zone_input_files'}>
 <InputFile
 name={'recordingToReplay'}
 onChange={onRecordingToReplaySelected}
 data-testid={ScenarioEditorTestIds.INPUT_FILE_RECORDING_REPLAY}
 />
 <img
 data-testid={datatestRecordingReplaySelection()}
 src={imageRecordingReplaySelection()}
 alt={'recording_replay_charged_or_not'}
 title={'Enregistrement requis en cas de replay'}
 />
 </div>**/
