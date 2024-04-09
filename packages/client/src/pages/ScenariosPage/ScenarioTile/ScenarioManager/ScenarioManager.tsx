import React from 'react'
import '../../../../styles.css'
import './ScenarioManager.css'
import IconButton from '../../../../components/ui/Button/IconButton/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'
import { useNavigate } from 'react-router-dom'

export enum ScenarioManagerTestIds {
  BUTTON_REMOVE_SCENARIO = 'ButtonRemoveScenario',
  BUTTON_EDIT_SCENARIO = 'ButtonEditScenario',
  BUTTON_EXPORT_SCENARIO = 'ButtonExportScenario',
}

type ScenarioManagerProps = {
  scenario: Scenario
  onDeleteScenario: (id: number) => void
}

const ScenarioManager: React.FunctionComponent<ScenarioManagerProps> = ({
  scenario,
  onDeleteScenario,
}) => {
  const navigate = useNavigate()

  function handleEdit(id_scenario: number) {
    navigate('/edit-scenario/' + id_scenario)
  }

  function handleDownloadScenario(scenarioToDownload: Scenario) {
    const { name, text, options } = scenarioToDownload
    const scenarioAttributes: ScenarioAttributes = { name, text, options }
    const scenarioJson = JSON.stringify(scenarioAttributes, null, 2)

    const fileBlob = new Blob([scenarioJson], { type: 'text/plain' })
    const fileUrl = URL.createObjectURL(fileBlob)
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = `${scenarioToDownload.name}.json`
    document.body.appendChild(link)
    link.click()
  }

  function handleRemove(id: number) {
    onDeleteScenario(id)
  }

  return (
    <>
      <div className={'buttonsScenario'}>
        <IconButton
          className={'iconButton'}
          text={''}
          onClick={() => {
            handleEdit(scenario.id)
          }}
          data-testid={ScenarioManagerTestIds.BUTTON_EDIT_SCENARIO}
          icon={<EditIcon fontSize={'small'} />}
        />
        <IconButton
          className={'iconButton'}
          text={''}
          onClick={() => {
            handleDownloadScenario(scenario)
          }}
          data-testid={ScenarioManagerTestIds.BUTTON_EXPORT_SCENARIO}
          icon={<FileDownloadIcon fontSize={'small'} />}
        />
        <IconButton
          className={'iconButton'}
          text={''}
          onClick={() => {
            handleRemove(scenario.id)
          }}
          data-testid={ScenarioManagerTestIds.BUTTON_REMOVE_SCENARIO}
          icon={<DeleteIcon fontSize={'small'} />}
        />
      </div>
    </>
  )
}

export default ScenarioManager
