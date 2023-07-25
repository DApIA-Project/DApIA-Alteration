import React, { useState } from 'react'
import ScenarioEditor from './ScenarioEditor/ScenarioEditor'
import AlterationOutput from './AlterationOutput/AlterationOutput'
import Client from '../../Client'
import { AlterRecordingResponse } from '@smartesting/shared/dist'
import '../../styles.css'
import './ScenarioEditorPage.css'

const ScenarioEditorPage: React.FunctionComponent = () => {
  const [alteredRecordings, setAlteredRecordings] =
    useState<AlterRecordingResponse | null>(null)

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
            setAlteredRecordings(
              await Client.alteration(
                scenario,
                recording,
                optionsAlteration,
                recordingToReplay
              )
            )
          }}
        />
        <AlterationOutput response={alteredRecordings} />
      </div>
    </div>
  )
}

export default ScenarioEditorPage
