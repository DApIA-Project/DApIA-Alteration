import React from 'react'
import './DownloadAlteredRecording.css'
import { Recording } from '@smartesting/shared/src'

export enum DownloadAlteredRecordingTestIds {
  COMPONENT = 'DownloadAlteredRecording',
  DOWNLOAD_RECORDING = 'DownloadAlteredRecording.action.downloadRecording',
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
