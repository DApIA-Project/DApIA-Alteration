import React from 'react'
import ScenarioEditor from './ScenarioEditor/ScenarioEditor'
import ScenarioOutput from './ScenarioOutput/ScenarioOutput'
import Client from '../../Client'

const ScenarioEditorPage: React.FunctionComponent = () => {
  // TODO: state on response
  return (
    <div>
      <ScenarioEditor
        onGenerate={async ({ scenario, recording, recordingToReplay }) => {
          const response = await Client.alteration(
            scenario,
            recording,
            recordingToReplay
          )
        }}
      />
      <ScenarioOutput response={{ alteredRecordings: [], error: null }} />
    </div>
  )
}

export default ScenarioEditorPage
