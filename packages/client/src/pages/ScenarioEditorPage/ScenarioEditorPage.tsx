import React, { useState } from 'react'
import ScenarioEditor from './ScenarioEditor/ScenarioEditor'
import AlterationOutput from './AlterationOutput/AlterationOutput'
import Client from '../../Client'
import { AlterRecordingResponse } from '@smartesting/shared/dist'
import '../../styles.css'
import './ScenarioEditorPage.css'
import { CircularProgress } from '@mui/material'
import { unstable_batchedUpdates } from 'react-dom'
import { useClient } from '../../providers/ClientProvider/ClientProvider'

const ScenarioEditorPage: React.FunctionComponent = () => {
  const client = useClient()
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
            outputFormat,
          }) => {
            setAlteredRecordings(null)
            setIsLoading(true)
            if (!client) return
            client
              .alteration(
                scenario,
                recording,
                optionsAlteration,
                outputFormat,
                recordingToReplay
              )
              .then((response) => {
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
