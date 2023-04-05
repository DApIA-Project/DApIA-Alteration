import React, { useState } from 'react'
import ScenarioEditor, {
  ScenarioEditorTestIds,
} from './ScenarioEditor/ScenarioEditor'
import ScenarioOutput from './ScenarioOutput/ScenarioOutput'
import Client from '../../Client'
import { AlterRecordingResponse, Recording } from '@smartesting/shared/dist'
import '../../styles.css'
import './ScenarioEditorPage.css'

export enum ScenarioEditorPageTestIds {
  COMPONENT = 'ScenarioEditorPage',

  SCENARIO_EDITOR = 'ScenarioEditorPage.action.scenarioEditor',
  SCENARIO_OUTPUT = 'ScenarioEditorPage.action.scenarioOutput',
}
const ScenarioEditorPage: React.FunctionComponent = () => {
  const [alteredRecordings, setAlteredRecordings] =
    useState<AlterRecordingResponse | null>(null)

  return (
    <div className={'scenarioEditorPage'}>
      <ScenarioEditor
        onGenerate={async ({ scenario, recording, recordingToReplay }) => {
          setAlteredRecordings(
            await Client.alteration(scenario, recording, recordingToReplay)
          )
        }}
      />
      <ScenarioOutput response={alteredRecordings} />
    </div>
  )
}

export default ScenarioEditorPage
