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
import { CreateScenarioResponse } from '@smartesting/shared/dist/responses/createScenario'

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
  const [openedScenarios, setOpenedScenarios] = useState<Scenario[]>([])
  const [savedScenarios, setSavedScenarios] = useState<ReadonlyArray<Scenario>>(
    []
  )
  const scenario = openedScenarios[selectedScenario]
  console.log(scenario)
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
  }, [openedScenarios])

  function updateScenario(
    id: string,
    newName: string,
    newText: string,
    newOptions: OptionsAlteration
  ) {
    Client.updateScenario(id, newName, newText, newOptions).then(
      ({ scenario, error }) => {
        if (error) console.log(error)
      }
    )
  }

  async function createScenario(
    name: string,
    text: string,
    options: OptionsAlteration
  ) {
    try {
      const { scenario, error } = await Client.createScenario(
        name,
        text,
        options
      )
      if (error) {
        return
      }

      return scenario
    } catch (err) {
      throw err
    }
  }

  function handleOnAdd() {
    unstable_batchedUpdates(async () => {
      let newScenarios = openedScenarios.slice()
      let scenarioCreation = await createScenario(
        'New scenario',
        '',
        optionsAlteration
      )
      if (scenarioCreation) {
        newScenarios.push(scenarioCreation)
        setOpenedScenarios(newScenarios)
        setSelectedScenario(newScenarios.length - 1)
      }
    }).then(() => {
      return
    })
  }

  function handleOnDelete(index: number) {
    const newScenarios = openedScenarios.filter(
      (scenario, indexScenario) => indexScenario !== index
    )
    if (selectedScenario >= newScenarios.length) {
      setSelectedScenario(newScenarios.length - 1)
    }
    setOpenedScenarios(newScenarios)
  }

  function handleOnChange(newText: string) {
    updateScenario(
      openedScenarios[selectedScenario].id,
      openedScenarios[selectedScenario].name,
      newText,
      optionsAlteration
    )
    let newOpenedScenarios = openedScenarios.slice()
    newOpenedScenarios[selectedScenario].text = newText
    setOpenedScenarios(newOpenedScenarios)
  }

  const handleScenarioNameUpdate = (newName: string) => {
    updateScenario(
      openedScenarios[selectedScenario].id,
      newName,
      openedScenarios[selectedScenario].text,
      optionsAlteration
    )
    let newOpenedScenarios = openedScenarios.slice()
    newOpenedScenarios[selectedScenario].name = newName
    setOpenedScenarios(newOpenedScenarios)
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
          value={scenario ? scenario.text : ''}
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
