import React, { useState } from 'react'
import Button from '../../../components/Button'
import { Alert, AlertTitle } from '@mui/material'
import MonacoEditor from '../CodeArea/MonacoEditor'
import InputFile from '../../../components/InputFile'
import { Recording } from '@smartesting/shared/dist/models'
import '../../../styles.css'
import '../../../styles/ScenarioEditor.css'

export enum ScenarioEditorTestIds {
  COMPONENT = 'ScenarioEditor',
  GENERATE_BUTTON = 'ScenarioEditor.action.generateButton',
  INPUT_FILE_RECORDING = 'ScenarioEditor.action.selectRecording',
  INPUT_FILE_RECORDING_REPLAY = 'ScenarioEditor.action.selectRecordingReplay',
  RECORDING_IS_PRESENT = 'ScenarioEditor.action.isSelectedRecording',
  RECORDING_IS_NOT_PRESENT = 'ScenarioEditor.action.isNotSelectedRecording',
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
  const [isRecordingPresent, setIsRecordingPresent] = useState<boolean>(false)
  const [isRecordingReplayPresent, setIsRecordingReplayPresent] =
    useState<boolean>(false)
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
    readFiles(
      files,
      setRecordingContent,
      setRecordingName,
      setIsRecordingPresent
    )
  }

  function onRecordingToReplaySelected(files: FileList) {
    readFiles(
      files,
      setRecordingToReplayContent,
      setRecordingToReplayName,
      setIsRecordingReplayPresent
    )
  }

  function imageSelection(state: boolean): string {
    let colorImg: string = ''
    if (state) {
      colorImg = '../../../assets/green_check.png'
    } else {
      colorImg = '../../../assets/red_cross.png'
    }
    return colorImg
  }

  function datatestSelection(state: boolean): string {
    let datatest: string = ''
    if (state) {
      datatest = ScenarioEditorTestIds.RECORDING_IS_PRESENT
    } else {
      datatest = ScenarioEditorTestIds.RECORDING_IS_NOT_PRESENT
    }
    return datatest
  }

  function imageRecordingSelection(): string {
    return imageSelection(isRecordingPresent)
  }

  function imageRecordingReplaySelection(): string {
    return imageSelection(isRecordingReplayPresent)
  }

  function datatestRecordingSelection(): string {
    return datatestSelection(isRecordingPresent)
  }

  function datatestRecordingReplaySelection(): string {
    return datatestSelection(isRecordingReplayPresent)
  }

  function readFiles(
    files: FileList,
    setContent: React.Dispatch<string>,
    setName: React.Dispatch<string>,
    setIsPresent: React.Dispatch<boolean>
  ) {
    const file = files.item(0)
    if (!file) {
      return
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        setName(file.name)
        setContent(String(reader.result))
        setIsPresent(true)
      }
      reader.readAsText(file)
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
    <div className={'scenarioEditor'}>
      <MonacoEditor />
      <Button
        data-testid={ScenarioEditorTestIds.GENERATE_BUTTON}
        text='Generate alteration'
        onClick={onGenerateClicked}
      />
      <div className={'zone_input_files'}>
        <InputFile
          name={'recording'}
          onChange={onRecordingSelected}
          data-testid={ScenarioEditorTestIds.INPUT_FILE_RECORDING}
        />
        <img
          data-testid={datatestRecordingSelection()}
          src={imageRecordingSelection()}
          alt={'recording_charged_or_not'}
          title={'Enregistrement requis'}
        />
      </div>
      <div className={'zone_input_files'}>
        <InputFile
          name={'recordingToReplay'}
          onChange={onRecordingToReplaySelected}
          data-testid={ScenarioEditorTestIds.INPUT_FILE_RECORDING_REPLAY}
        />
        <img
          data-testid={datatestRecordingReplaySelection()}
          src={imageRecordingReplaySelection()}
          alt={'recording_replay_charged_or_not'}
          title={'Enregistrement requis en cas de replay'}
        />
      </div>
    </div>
  )
}

export default ScenarioEditor
