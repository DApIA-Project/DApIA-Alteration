import React, { useEffect, useState } from 'react'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist/models'
import '../../../styles.css'
import './ScenarioEditor.css'
import AlterationScenarioEditor from '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor'
import {
  GenerateAlterationButton,
  OnGenerateOptions,
} from './GenerateAlterationButton/GenerateAlterationButton'
import { ScenarioOptions } from './ScenarioOptions/ScenarioOptions'
import { RecordInputFiles } from './RecordInputFiles/RecordInputFiles'
import EditorTabSelection from './EditorTabSelection/EditorTabSelection'
import { unstable_batchedUpdates } from 'react-dom'

export enum ScenarioEditorTestIds {
  COMPONENT = 'ScenarioEditor',
}

type ScenarioEditorProps = {
  onGenerate: (options: OnGenerateOptions) => void
}

const ScenarioEditor: React.FunctionComponent<ScenarioEditorProps> = ({
  onGenerate,
}) => {
  const [recording, setRecording] = useState<Recording>({
    name: '',
    content: '',
  })
  const [recordingToReplay, setRecordingToReplay] = useState<Recording>({
    name: '',
    content: '',
  })

  const [optionsAlteration, setOptionsAlteration] = useState<OptionsAlteration>(
    {
      haveDisableAltitude: false,
      haveDisableLongitude: false,
      haveDisableLatitude: false,
      haveRealism: false,
      haveNoise: false,
      haveLabel: false,
    }
  )
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [scenarios, setScenarios] = useState<string[]>(
    JSON.parse(window.localStorage.getItem('scenarios') || '[]')
  )
  const scenario = scenarios[selectedScenario]

  useEffect(() => {
    window.localStorage.setItem('scenarios', JSON.stringify(scenarios))
  }, [scenarios, selectedScenario])

  function handleOnAdd() {
    unstable_batchedUpdates(() => {
      const newScenarios = scenarios.slice()
      setSelectedScenario(newScenarios.length)
      newScenarios.push('')
      setScenarios(newScenarios)
    })
  }

  function handleOnDelete(index: number) {
    const newScenarios = scenarios.slice()
    newScenarios.splice(index, 1)

    if (selectedScenario >= newScenarios.length) {
      setSelectedScenario(newScenarios.length - 1)
    }
    setScenarios(newScenarios)
  }

  function handleOnChange(newScenario: string) {
    const newScenarios = scenarios.slice()
    newScenarios[selectedScenario] = newScenario
    setScenarios(newScenarios)
  }

  return (
    <div
      className={'scenarioEditor'}
      data-testid={ScenarioEditorTestIds.COMPONENT}
    >
      <div className={'selectionEditor'}>
        <EditorTabSelection
          tabsLength={scenarios.length === 0 ? 1 : scenarios.length}
          selected={selectedScenario}
          onSelect={setSelectedScenario}
          onAdd={handleOnAdd}
          onRemove={handleOnDelete}
        />
      </div>
      <div id={'monaco-editor-root'} className={'alterationeditor'}>
        <AlterationScenarioEditor
          language={'alterationscenario'}
          value={scenario}
          onChange={handleOnChange}
        />
      </div>
      <div className={'composantOption'}>
        <GenerateAlterationButton
          optionsAlteration={optionsAlteration}
          recording={recording}
          recordingToReplay={
            recordingToReplay.name && recordingToReplay.content
              ? recordingToReplay
              : undefined
          }
          onClicked={(options) => onGenerate(options)}
        />
        <ScenarioOptions
          optionsAlteration={optionsAlteration}
          onChange={(newValue) => setOptionsAlteration(newValue)}
        />
        <RecordInputFiles
          onChangeRecord={(newValue) => setRecording(newValue)}
          onChangeReplayRecord={(newValue) => setRecordingToReplay(newValue)}
        />
      </div>
    </div>
  )
}

export default ScenarioEditor
