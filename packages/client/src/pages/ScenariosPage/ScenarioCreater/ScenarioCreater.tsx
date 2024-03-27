import React, { useEffect, useState } from 'react'
import '../../../styles.css'
import './ScenarioCreater.css'
import { Alert } from '@mui/material'
import IconButton from '../../../components/ui/Button/IconButton/IconButton'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AddIcon from '@mui/icons-material/Add'
import { detectErrorJsonScenario } from '../../../utils/detectErrorJsonScenario/detectErrorJsonScenario'
import { useClient } from '../../../providers/ClientProvider/ClientProvider'
import { OptionsAlteration } from '@smartesting/shared/dist'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import { useNavigate } from 'react-router-dom'

export enum ScenarioCreaterTestIds {
  BUTTON_ADD_SCENARIO = 'ButtonAddScenario',
  BUTTON_IMPORT_SCENARIO = 'ButtonImportScenario',
}

type ScenarioCreaterProps = {
  onScenario: (scenario: Scenario) => void
}

const ScenarioCreater: React.FunctionComponent<ScenarioCreaterProps> = ({
  onScenario,
}) => {
  const client = useClient()
  const navigate = useNavigate()
  const [showError, setShowError] = useState(false)
  const [errorAlert, setErrorAlert] = useState('')
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!/\.json$/.test(file.name)) {
        setErrorAlert('Error file extension')
        setShowError(true)
        return
      }
      const reader = new FileReader()
      reader.onload = async (e) => {
        const content = e.target?.result as string
        try {
          const jsonContent = JSON.parse(content)

          const errorJsonContent: string | null =
            detectErrorJsonScenario(jsonContent)
          if (errorJsonContent !== null) {
            setErrorAlert(errorJsonContent)
            setShowError(true)
            return
          }
          let newScenario = await createScenario(
            jsonContent.name,
            jsonContent.text,
            jsonContent.options
          )
          if (newScenario) {
            onScenario(newScenario)
          }
        } catch (error) {}
      }
      reader.readAsText(file)
    }
  }
  function handleAddScenario() {
    navigate('/edit-scenario')
  }

  function handleImportButtonClick() {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [showError])

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <IconButton
        className={'importScenario'}
        text={''}
        onClick={handleImportButtonClick}
        data-testid={ScenarioCreaterTestIds.BUTTON_IMPORT_SCENARIO}
        icon={<FileUploadIcon fontSize={'large'} />}
      />
      <div className={'alertContainer'}>
        {showError && (
          <Alert
            className={'alert'}
            severity='error'
            onClose={() => {
              setShowError(false)
            }}
          >
            {errorAlert}
          </Alert>
        )}
      </div>
      <IconButton
        className={'addScenario'}
        text={''}
        onClick={handleAddScenario}
        data-testid={ScenarioCreaterTestIds.BUTTON_ADD_SCENARIO}
        icon={<AddIcon fontSize={'large'} />}
      />
    </>
  )
}

export default ScenarioCreater
