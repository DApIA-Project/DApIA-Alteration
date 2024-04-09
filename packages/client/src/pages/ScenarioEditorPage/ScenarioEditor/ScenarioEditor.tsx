import React, { useCallback, useEffect, useState } from 'react'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist/models'
import '../../../styles.css'
import './ScenarioEditor.css'
import AlterationScenarioEditor from '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor'
import {
  GenerateAlterationButton,
  OnGenerateOptions,
} from './GenerateAlterationButton/GenerateAlterationButton'
import { ScenarioOptions } from '../../../components/business/ScenarioOptions/ScenarioOptions'
import { RecordInputFiles } from './RecordInputFiles/RecordInputFiles'
import EditorTabList from './EditorTabList/EditorTabList'
import { unstable_batchedUpdates } from 'react-dom'
import ScenarioList from './ScenarioList/ScenarioList'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import { useClient } from '../../../providers/ClientProvider/ClientProvider'
import { FileFormat } from '@smartesting/shared/dist'
import Select from '../../../components/ui/Select/Select'
import { useParams } from 'react-router'

export enum ScenarioEditorTestIds {
  COMPONENT = 'ScenarioEditor',
}

type ScenarioEditorProps = {
  onGenerate: (options: OnGenerateOptions) => void
}

const ScenarioEditor: React.FunctionComponent<ScenarioEditorProps> = ({
  onGenerate,
}) => {
  const client = useClient()
  let params_url = useParams()

  const optionsAlterationDefault: OptionsAlteration = {
    haveLabel: false,
    haveRealism: false,
    haveNoise: false,
    haveDisableLatitude: false,
    haveDisableLongitude: false,
    haveDisableAltitude: false,
  }

  const formats = [
    { value: FileFormat.auto, label: 'Auto' },
    { value: FileFormat.sbs, label: 'sbs' },
    { value: FileFormat.openskyCsv, label: 'openskyCsv' },
    { value: FileFormat.droneCsv, label: 'droneCsv' },
    { value: FileFormat.json, label: 'json' },
    { value: FileFormat.ndjson, label: 'ndjson' },
  ]

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

  const [outputFormat, setOutputFormat] = useState('auto')

  const [selectedScenario, setSelectedScenario] = useState(0)
  const [openedScenarios, setOpenedScenarios] = useState<Scenario[]>([])
  const [savedScenarios, setSavedScenarios] = useState<ReadonlyArray<Scenario>>(
    []
  )
  const scenario = openedScenarios[selectedScenario]

  const handleOnOpen = useCallback(
    (openingScenario: Scenario) => {
      unstable_batchedUpdates(async () => {
        let newScenarios = openedScenarios.slice()
        let isAlreadyOpen = false
        for (const newScenario of newScenarios) {
          if (newScenario.id === openingScenario.id) {
            isAlreadyOpen = true
          }
        }
        if (openingScenario && !isAlreadyOpen) {
          newScenarios.push(openingScenario)
          setOpenedScenarios(newScenarios)
          selectTab(newScenarios.length - 1, openingScenario.options)
        }
      }).then(() => {
        return
      })
    },
    [openedScenarios]
  )

  async function updateScenario(
    id: number,
    newName: string,
    newText: string,
    newOptions: OptionsAlteration
  ) {
    if (!client) return
    await client
      .updateScenario(id, newName, newText, newOptions)
      .then(({ error }) => {
        if (error) console.log(error)
      })
  }

  async function createScenario(
    name: string,
    text: string,
    options: OptionsAlteration
  ) {
    if (!client) return
    try {
      const { scenario, error } = await client.createScenario(
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
        optionsAlterationDefault
      )
      if (scenarioCreation) {
        newScenarios.push(scenarioCreation)
        setOpenedScenarios(newScenarios)
        selectTab(newScenarios.length - 1, optionsAlterationDefault)
      }
    }).then(() => {
      return
    })
  }

  function handleOnDelete(index: number) {
    const newScenarios = openedScenarios.filter(
      (scenario, indexScenario) => indexScenario !== index
    )

    if (selectedScenario === index) {
      if (selectedScenario < newScenarios.length) {
        selectTab(
          selectedScenario,
          openedScenarios[selectedScenario + 1].options
        )
      } else {
        selectTab(
          selectedScenario - 1,
          openedScenarios[selectedScenario - 1].options
        )
      }
    } else {
      if (selectedScenario >= newScenarios.length) {
        selectTab(
          selectedScenario - 1,
          openedScenarios[selectedScenario - 1].options
        )
      } else {
        selectTab(
          selectedScenario - 1,
          openedScenarios[selectedScenario].options
        )
      }
    }

    setOpenedScenarios(newScenarios)
  }

  async function handleOnRemove(scenario: Scenario) {
    if (!client) return

    await client.deleteScenario(scenario.id).then(({ error }) => {
      if (error) console.log(error)
    })
    const newScenariosOpened = openedScenarios.filter(
      (scenarioOpened) => scenarioOpened.id !== scenario.id
    )

    const newScenariosSaved = savedScenarios.filter(
      (scenarioSaved) => scenarioSaved.id !== scenario.id
    )

    unstable_batchedUpdates(async () => {
      setSavedScenarios(newScenariosSaved)
      setOpenedScenarios(newScenariosOpened)
      if (newScenariosOpened.length > 0) {
        selectTab(
          newScenariosOpened.length - 1,
          openedScenarios[newScenariosOpened.length - 1].options
        )
      }
    }).then(() => {
      return
    })
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

  async function handleScenarioNameUpdate(newName: string) {
    await updateScenario(
      openedScenarios[selectedScenario].id,
      newName,
      openedScenarios[selectedScenario].text,
      optionsAlteration
    )
    let newOpenedScenarios = openedScenarios.slice()
    newOpenedScenarios[selectedScenario].name = newName
    setOpenedScenarios(newOpenedScenarios)
  }

  async function handleOptions(newValue: OptionsAlteration) {
    setOptionsAlteration(newValue)
    await updateScenario(
      openedScenarios[selectedScenario].id,
      openedScenarios[selectedScenario].name,
      openedScenarios[selectedScenario].text,
      newValue
    )
  }

  async function handleSelectFormat(value: string) {
    setOutputFormat(value)
  }

  function handleSelectTab(newSelectedTab: number) {
    selectTab(newSelectedTab, openedScenarios[newSelectedTab].options)
  }

  function handleChangeRecord(newValue: Recording) {
    setRecording(newValue)
  }

  function selectTab(
    newSelectedTab: number,
    optionToChange: OptionsAlteration
  ) {
    setOptionsAlteration(optionToChange)
    setSelectedScenario(newSelectedTab)
  }

  useEffect(() => {
    if (!client) return
    client
      .listUserScenario()
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

    if (params_url.id) {
      client
        .findScenario(Number(params_url.id))
        .then(({ scenario, error }) => {
          if (error)
            return console.error(
              `Erreur lors de la récupération du scénario : ${error}`
            )
          if (scenario !== null) handleOnOpen(scenario)
        })
        .catch((e) => {
          console.error('Erreur lors de la récupération du scénario :', e)
        })
    }
  }, [client, handleOnOpen, openedScenarios, params_url.id])

  return (
    <div
      className={'scenarioEditor'}
      data-testid={ScenarioEditorTestIds.COMPONENT}
    >
      <div className={'selectionEditor'}>
        <EditorTabList
          tabs={openedScenarios}
          selected={selectedScenario}
          onSelect={handleSelectTab}
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
          options={{
            readOnly: openedScenarios.length <= 0,
            hideCursorInOverviewRuler: openedScenarios.length <= 0,
          }}
        />
      </div>
      <ScenarioList
        scenarios={savedScenarios || null}
        onClick={handleOnOpen}
        onRemove={handleOnRemove}
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
          outputFormat={outputFormat}
          onClicked={(options) => onGenerate(options)}
        />
        <div className={'scenario-options'}>
          <ScenarioOptions
            optionsAlteration={optionsAlteration}
            onChange={handleOptions}
            haveDescription={true}
          />
        </div>
        <Select
          value={outputFormat}
          options={formats}
          onChange={handleSelectFormat}
        />
        <RecordInputFiles
          onChangeRecord={handleChangeRecord}
          onChangeReplayRecord={(newValue) => setRecordingToReplay(newValue)}
        />
      </div>
    </div>
  )
}

export default ScenarioEditor
