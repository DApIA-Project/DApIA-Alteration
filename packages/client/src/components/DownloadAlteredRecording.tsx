import React from 'react'
import '../styles/DownloadAlteredRecording.css'
import { Recording } from '@smartesting/shared/src'
import downloadAlteredRecording from './DownloadAlteredRecording'

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
    <figure onClick={() => onClick(recording)}>
      <img className={'imageDownload'} src={'../assets/logo_file.png'} />
      <figcaption>{recording.name}</figcaption>
    </figure>
  )
}

export default DownloadAlteredRecording
