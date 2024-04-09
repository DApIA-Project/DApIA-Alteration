import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { AlterRecordingResponse } from '@smartesting/shared/dist/responses'
import '../../../styles.css'
import DownloadAlteredRecording from './DownloadAlteredRecording/DownloadAlteredRecording'
import './AlterationOutput.css'
import { Recording } from '@smartesting/shared/dist'

export enum ScenarioOutputTestIds {
  DISPLAY_ERROR = 'ScenarioOutput.action.displayError',
  DISPLAY_SUCCESS = 'ScenarioOutput.action.displaySuccess',
  DISPLAY_DOWNLOAD_RECORDINGS = 'ScenarioOutput.action.displayDownloadRecordings',
  DISPLAY_DOWNLOAD_RECORDING_ZONE = 'ScenarioOutput.action.displayDownloadRecordingZone',

  SCENARIO_OUTPUT = 'ScenarioOutput.action.scenarioOutput',
}

type ScenarioOutputProps = {
  response: AlterRecordingResponse | null
}

function onDownloadAlteredRecordingClicked(recording: Recording) {
  const fileBlob = new Blob([recording.content], { type: 'text/plain' })
  const fileUrl = URL.createObjectURL(fileBlob)
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = recording.name
  document.body.appendChild(link)
  link.click()
}

const AlterationOutput: React.FunctionComponent<ScenarioOutputProps> = ({
  response,
}) => {
  if (response != null) {
    const { alteredRecordings, error } = response
    if (error != null) {
      return (
        <Alert
          data-testid={ScenarioOutputTestIds.DISPLAY_ERROR}
          severity='error'
        >
          <AlertTitle>Error while generating alteration</AlertTitle>
          {error}
        </Alert>
      )
    } else {
      return (
        <div
          className={'output'}
          data-testid={ScenarioOutputTestIds.SCENARIO_OUTPUT}
        >
          <div
            data-testid={ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDING_ZONE}
            className={'downloadAlteredRecording'}
          >
            {alteredRecordings.map((element) => (
              <DownloadAlteredRecording
                data-testid={ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDINGS}
                key={element.name}
                recording={element}
                onClick={onDownloadAlteredRecordingClicked}
              />
            ))}
          </div>

          <Alert
            data-testid={ScenarioOutputTestIds.DISPLAY_SUCCESS}
            severity='success'
          >
            <AlertTitle>Success</AlertTitle>
          </Alert>
        </div>
      )
    }
  }

  return <div data-testid={ScenarioOutputTestIds.SCENARIO_OUTPUT}></div>
}

export default AlterationOutput
