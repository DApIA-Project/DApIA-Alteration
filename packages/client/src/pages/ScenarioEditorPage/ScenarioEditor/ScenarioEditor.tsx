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
import EditorTabList from './EditorTabList/EditorTabList'
import { unstable_batchedUpdates } from 'react-dom'
import Client from '../../../Client'
import ScenarioList from './ScenarioList/ScenarioList'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'

export enum ScenarioEditorTestIds {
  COMPONENT = 'ScenarioEditor',
}

export enum SaveScenarioButtonTestIds {
  COMPONENT = 'SaveScenarioButton',
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
  const [openedScenarios, setOpenedScenarios] = useState<string[]>([])
  const [savedScenarios, setSavedScenarios] = useState<ReadonlyArray<Scenario>>(
    []
  )
  const scenario = openedScenarios[selectedScenario]

  useEffect(() => {
    Client.listScenario()
      .then(({ scenarios, error }) => {
        if (error)
          return console.error(
            `Erreur lors de la récupération des scénarios : ${error}`
          )
        setSavedScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
  }, [])

  const handleScenarioNameUpdate = () => {}

  function updateScenario(scenario: Scenario) {
    Client.updateScenario(
      scenario.id,
      scenario.name,
      scenario.text,
      scenario.options
    ).then(({ scenario, error }) => {
      if (error) return
    })
  }

  function handleOnAdd() {
    unstable_batchedUpdates(() => {
      let newScenarios = openedScenarios.slice()
      newScenarios.push('New scenario')
      setOpenedScenarios(newScenarios)
      setSelectedScenario(newScenarios.length - 1)
    })
  }

  function handleOnDelete(index: number) {
    const newScenarios = openedScenarios.slice()
    newScenarios.splice(index, 1)

    if (selectedScenario >= newScenarios.length) {
      setSelectedScenario(newScenarios.length - 1)
    }
    setOpenedScenarios(newScenarios)
  }

  function handleOnChange(newScenario: string) {
    const newScenarios = openedScenarios.slice()
    newScenarios[selectedScenario] = newScenario
    setOpenedScenarios(newScenarios)
  }

  return (
    <div
      className={'scenarioEditor'}
      data-testid={ScenarioEditorTestIds.COMPONENT}
    >
      <div className={'selectionEditor'}>
        <EditorTabList
          tabs={openedScenarios}
          selected={selectedScenario}
          onSelect={setSelectedScenario}
          onAdd={handleOnAdd}
          onChange={handleScenarioNameUpdate}
          onClose={handleOnDelete}
        />
      </div>
      <div id={'monaco-editor-root'} className={'alterationeditor'}>
        <AlterationScenarioEditor
          language={'alterationscenario'}
          value={scenario}
          onChange={handleOnChange}
        />
      </div>
      <ScenarioList
        scenarios={savedScenarios || null}
        onClick={handleOnChange}
      />

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
