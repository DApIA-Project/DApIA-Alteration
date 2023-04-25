import React from 'react'
import './DownloadAlteredRecording.css'
import { Recording } from '@smartesting/shared/src'

export enum DownloadAlteredRecordingTestIds {
  DISPLAY_DOWNLOAD_RECORDINGS = 'DownloadAlteredRecording.action.displayDownloadRecordings',
  DISPLAY_DOWNLOAD_RECORDING_ZONE = 'DownloadAlteredRecording.action.displayDownloadRecordingZone',
}
interface DownloadAlteredRecordingProps {
  recording: Recording

  onClick: (recording: Recording) => void
}

function DownloadAlteredRecording({
  recording,
  onClick,
  ...props
}: DownloadAlteredRecordingProps) {
  return (
    <figure {...props} onClick={() => onClick(recording)}>
      <img className={'imageDownload'} src={'../assets/logo_file.png'} />
      <figcaption>{recording.name}</figcaption>
    </figure>
  )
}

export default DownloadAlteredRecording
