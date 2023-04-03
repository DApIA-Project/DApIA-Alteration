import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { AlterRecordingResponse } from '@smartesting/shared/dist/responses'
import '../../../styles.css'
import DownloadAlteredRecording from '../../../components/DownloadAlteredRecording'
import '../../../styles/ScenarioOutput.css'
import { Recording } from '@smartesting/shared/src'

type ScenarioOutputProps = {
  response: AlterRecordingResponse | null
}

function onDownloadAlteredRecordingClicked(recording: Recording) {
  console.log(recording.name)

  const fileBlob = new Blob([recording.content], { type: 'text/plain' })
  const fileUrl = URL.createObjectURL(fileBlob)
  const link = document.createElement('a')

  link.href = fileUrl
  link.download = recording.name
  document.body.appendChild(link)
  link.click()
}

const ScenarioOutput: React.FunctionComponent<ScenarioOutputProps> = ({
  response,
}) => {
  if (response != null) {
    const { alteredRecordings, error } = response
    if (error != null) {
      return (
        <Alert severity='error'>
          <AlertTitle>Error while generating alteration</AlertTitle>
          {error}
        </Alert>
      )
    } else {
      const alterRecordingsMap = alteredRecordings.map((element) => (
        <DownloadAlteredRecording
          recording={element}
          onClick={onDownloadAlteredRecordingClicked}
        />
      ))

      return (
        <>
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
          </Alert>
          <div className={'downloadAlteredRecording'}>{alterRecordingsMap}</div>
        </>
      )
    }
  }

  return <div></div>
}

export default ScenarioOutput
