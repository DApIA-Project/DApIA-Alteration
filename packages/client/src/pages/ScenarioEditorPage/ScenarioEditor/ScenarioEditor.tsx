import React, { useState } from 'react'
import Button from '../../../components/Button'
import { Alert, AlertTitle } from '@mui/material'
import MonacoEditor from '../CodeArea/MonacoEditor'
import InputFile from '../../../components/InputFile'
import { Recording } from '@smartesting/shared/dist/models'

export enum ScenarioEditorTestIds {
  COMPONENT = 'ScenarioEditor',
  GENERATE_BUTTON = 'ScenarioEditor.action.generateButton',
}

type OnGenerateOptions = {
  scenario: string
  recording: Recording
  recordingToReplay?: Recording
}

type ScenarioEditorProps = {
  onGenerate: (options: OnGenerateOptions) => void
}

const ScenarioEditor: React.FunctionComponent<ScenarioEditorProps> = ({
  onGenerate,
}) => {
  const [error, setError] = useState<string | null>(null)
  const [recordingName, setRecordingName] = useState<string>('')
  const [recordingContent, setRecordingContent] = useState<string>('')
  const [recordingToReplayName, setRecordingToReplayName] = useState<string>('')
  const [recordingToReplayContent, setRecordingToReplayContent] =
    useState<string>('')

  function onGenerateClicked() {
    const elements = document.getElementsByClassName(
      'view-lines monaco-mouse-cursor-text'
    ) as HTMLCollectionOf<HTMLElement>
    if (!elements[0]) return setError('Unable to initialize Monaco Editor')
    const scenario = elements[0]?.textContent

    if (!scenario || !recordingContent || !recordingName) return

    const options: OnGenerateOptions = {
      scenario,
      recording: {
        content: recordingContent,
        name: recordingName,
      },
    }
    if (recordingToReplayName && recordingToReplayContent) {
      options.recordingToReplay = {
        name: recordingToReplayName,
        content: recordingToReplayContent,
      }
    }
    onGenerate(options)
    setError(null)
  }

  function onRecordingSelected(files: FileList) {
    readFiles(files, setRecordingContent, setRecordingName)
  }

  function onRecordingToReplaySelected(files: FileList) {
    readFiles(files, setRecordingToReplayContent, setRecordingToReplayName)
  }

  function readFiles(
    files: FileList,
    setContent: React.Dispatch<string>,
    setName: React.Dispatch<string>
  ) {
    const file = files.item(0)
    if (!file) {
      return
    } else {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function () {
        setName(file.name)
        setContent(String(reader.result))
      }
    }
  }

  if (error)
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )

  return (
    <div>
      <MonacoEditor />
      <Button
        data-testid={ScenarioEditorTestIds.GENERATE_BUTTON}
        text='Generate alteration'
        onClick={onGenerateClicked}
      />
      <InputFile name={'recording'} onChange={onRecordingSelected} />
      <InputFile
        name={'recordingToReplay'}
        onChange={onRecordingToReplaySelected}
      />
    </div>
  )
}

export default ScenarioEditor
