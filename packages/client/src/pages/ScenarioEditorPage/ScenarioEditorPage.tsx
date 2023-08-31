import React, { useState } from 'react'
import ScenarioEditor from './ScenarioEditor/ScenarioEditor'
import AlterationOutput from './AlterationOutput/AlterationOutput'
import Client from '../../Client'
import { AlterRecordingResponse } from '@smartesting/shared/dist'
import '../../styles.css'
import './ScenarioEditorPage.css'
import { CircularProgress } from '@mui/material'
import { unstable_batchedUpdates } from 'react-dom'

const ScenarioEditorPage: React.FunctionComponent = () => {
  const [alteredRecordings, setAlteredRecordings] =
    useState<AlterRecordingResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div id={'root'}>
      <div className={'scenarioEditorPage'}>
        <ScenarioEditor
          onGenerate={async ({
            scenario,
            recording,
            optionsAlteration,
            recordingToReplay,
          }) => {
            setAlteredRecordings(null)
            setIsLoading(true)
            Client.alteration(
              scenario,
              recording,
              optionsAlteration,
              recordingToReplay
            ).then((response) => {
              unstable_batchedUpdates(() => {
                setAlteredRecordings(response)
                setIsLoading(false)
              })
            })
          }}
        />
        {alteredRecordings ? (
          <AlterationOutput response={alteredRecordings} />
        ) : (
          isLoading && (
            <CircularProgress className={'circularProgress'} color='inherit' />
          )
        )}
      </div>
    </div>
  )
}

export default ScenarioEditorPage
