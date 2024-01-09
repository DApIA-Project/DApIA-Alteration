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
import IconButton from '../../../components/ui/Button/IconButton/IconButton'
import FloatingSquare from './FloatingSquare/FloatingSquare'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {
  ListScenarioError,
  ListScenarioResponse,
} from '@smartesting/shared/dist/responses/listScenario'
import Client from '../../../Client'
import ScenarioList from './ScenarioList/ScenarioList'

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
  const [lastRemovedTab, setLastRemovedTab] = useState<number | null>(null)
  const [scenarios, setScenarios] = useState<string[]>(
    JSON.parse(window.localStorage.getItem('scenarios') || '[]')
  )
  const scenario = scenarios[selectedScenario]

  async function fetchScenarios() {
    const listScenario = await Client.listScenario()
    setScenariosSaved(listScenario)
  }

  useEffect(() => {
    window.localStorage.setItem('scenarios', JSON.stringify(scenarios))
  }, [scenarios, selectedScenario])

  const [scenariosSaved, setScenariosSaved] = useState<ListScenarioResponse>({
    scenarios: null,
    error: ListScenarioError.emptyListScenario,
  })

  useEffect(() => {
    fetchScenarios().catch((e) => {
      console.error('Erreur lors de la récupération des scénarios :', e)
    })
  }, [])

  /*
  const [isSquareVisible, setIsSquareVisible] = useState<boolean>(false)

  const handleSquareClose = async () => {
    setIsSquareVisible(false)
    await fetchScenarios()
  }

  const handleSquareOpen = () => {
    setIsSquareVisible(true)
  }
*/
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
      {/*
      <div className={'divSaveScenarioButton'}>
        <IconButton
          data-testid={SaveScenarioButtonTestIds.COMPONENT}
          text={''}
          icon={<StarBorderIcon fontSize='medium'/>}
          onClick={handleSquareOpen}
          className='saveScenarioButton'
        />
        {isSquareVisible && <FloatingSquare onClose={handleSquareClose} scenarios={scenarios} optionsAlteration={optionsAlteration} selectedScenario={selectedScenario}/>}
      </div>
*/}

      <ScenarioList
        scenarios={scenariosSaved || null}
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
