import React from 'react'
import ScenarioEditor from './ScenarioEditor/ScenarioEditor'
import ScenarioOutput from './ScenarioOutput/ScenarioOutput'

const ScenarioEditorPage: React.FunctionComponent = () => {
  return (
    <div>
      <ScenarioEditor
        onGenerate={({ scenario, recording, recordingToReplay }) => {}}
      />
      <ScenarioOutput response={{ alteredRecordings: [], error: null }} />
    </div>
  )
}

export default ScenarioEditorPage
