import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { AlterRecordingResponse } from '@smartesting/shared/dist/responses'
import '../../../styles.css'

type ScenarioOutputProps = {
  response: AlterRecordingResponse | null
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
      console.log(alteredRecordings)
    }

    return <div></div>
  }

  return <div></div>
}

export default ScenarioOutput
