import React from 'react'
import './DownloadAlteredRecording.css'
import { Recording } from '@smartesting/shared/dist'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'

interface DownloadAlteredRecordingProps {
  recording: Recording

  onClick: (recording: Recording) => void
}

function sendToVisualizer(recording: Recording) {
  const visualizer = window.open('https://adsb-visualizer.web.app/')
  if (visualizer !== null) {
    setTimeout(function () {
      let msg = {
        filename: recording.name,
        content: recording.content,
      }
      visualizer.postMessage(msg, '*')
    }, 1000)
  }
}

function DownloadAlteredRecording({
  recording,
  onClick,
  ...props
}: DownloadAlteredRecordingProps) {
  return (
    <figure>
      <div onClick={() => onClick(recording)} {...props}>
        <img
          className={'imageDownload'}
          src={'../assets/logo_file.png'}
          alt={'logo file download'}
        />
        <figcaption>{recording.name}</figcaption>
      </div>
      <OpenInNewRoundedIcon
        className={'openInNew'}
        onClick={() => {
          sendToVisualizer(recording)
        }}
      />
    </figure>
  )
}

export default DownloadAlteredRecording
