import React, { ChangeEvent, useState } from 'react'
import HelpIcon from '@mui/icons-material/Help'
import Switch from '@mui/joy/Switch'

import Button from '../../../components/ui/Button/Button'
import { Alert, AlertTitle } from '@mui/material'
import InputFile from '../../../components/ui/InputFile/InputFile'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist/models'
import '../../../styles.css'
import './ScenarioEditor.css'
import { ScenarioEditorPageTestIds } from '../ScenarioEditorPage'
import { act } from 'react-dom/test-utils'
import AlterationScenarioEditor from '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor'
import { Tooltip } from '@mui/joy'

export enum ScenarioEditorTestIds {
  COMPONENT = 'ScenarioEditor',
  GENERATE_BUTTON = 'ScenarioEditor.action.generateButton',
  INPUT_FILE_RECORDING = 'ScenarioEditor.action.selectRecording',
  INPUT_FILE_RECORDING_REPLAY = 'ScenarioEditor.action.selectRecordingReplay',
  RECORDING_IS_PRESENT = 'ScenarioEditor.action.isSelectedRecording',
  RECORDING_IS_NOT_PRESENT = 'ScenarioEditor.action.isNotSelectedRecording',
  RECORDING_REPLAY_IS_PRESENT = 'ScenarioEditor.action.isSelectedRecordingReplay',
  RECORDING_REPLAY_IS_NOT_PRESENT = 'ScenarioEditor.action.isNotSelectedRecordingReplay',

  OPTION_LABELING = 'ScenarioEditor.action.selectOptionLabeling',

  OPTION_REALISM = 'ScenarioEditor.action.selectOptionRealism',
  OPTION_NOISE = 'ScenarioEditor.action.selectOptionNoise',
  OPTION_DISABLE_LATITUDE = 'ScenarioEditor.action.selectOptionDisableLatitude',
  OPTION_DISABLE_LONGITUDE = 'ScenarioEditor.action.selectOptionDisableLongitude',
  OPTION_DISABLE_ALTITUDE = 'ScenarioEditor.action.selectOptionDisableAltitude',

  EDITOR_MONACO = 'ScenarioEditor.action.createMonacoEditor',
}

type OnGenerateOptions = {
  scenario: string
  recording: Recording
  optionsAlteration: OptionsAlteration
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
  const [haveLabelOption, setHaveLabelOption] = useState<boolean>(false)
  const [haveRealismOption, setHaveRealismOption] = useState<boolean>(false)
  const [haveNoiseOption, setHaveNoiseOption] = useState<boolean>(false)
  const [haveDisableLatitudeOption, setHaveDisableLatitudeOption] =
    useState<boolean>(false)
  const [haveDisableLongitudeOption, setHaveDisableLongitudeOption] =
    useState<boolean>(false)
  const [haveDisableAltitudeOption, setHaveDisableAltitudeOption] =
    useState<boolean>(false)
  const [tooltipStates, setTooltipStates] = useState(Array(6).fill(false))

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
      optionsAlteration: {
        haveLabel: haveLabelOption,
        haveRealism: haveRealismOption,
        haveNoise: haveNoiseOption,
        haveDisableLatitude: haveDisableLatitudeOption,
        haveDisableLongitude: haveDisableLongitudeOption,
        haveDisableAltitude: haveDisableAltitudeOption,
      },
    }
    if (recordingToReplayName && recordingToReplayContent) {
      options.recordingToReplay = {
        name: recordingToReplayName,
        content: recordingToReplayContent,
      }
    }

    onGenerate(options)
    act(() => {
      setError(null)
    })
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

  function datatestSelection(
    state: boolean,
    isPresentStr: string,
    isNotPresentStr: string
  ): string {
    let datatest: string = ''
    if (state) {
      datatest = isPresentStr
    } else {
      datatest = isNotPresentStr
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
    return datatestSelection(
      isRecordingPresent,
      ScenarioEditorTestIds.RECORDING_IS_PRESENT,
      ScenarioEditorTestIds.RECORDING_IS_NOT_PRESENT
    )
  }

  function datatestRecordingReplaySelection(): string {
    return datatestSelection(
      isRecordingReplayPresent,
      ScenarioEditorTestIds.RECORDING_REPLAY_IS_PRESENT,
      ScenarioEditorTestIds.RECORDING_REPLAY_IS_NOT_PRESENT
    )
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

  const realismChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHaveRealismOption(event.target.checked)
  }

  const labelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHaveLabelOption(event.target.checked)
  }

  const noiseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHaveNoiseOption(event.target.checked)
  }

  const disableLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHaveDisableLatitudeOption(event.target.checked)
  }
  const disableLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHaveDisableLongitudeOption(event.target.checked)
  }
  const disableAltitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHaveDisableAltitudeOption(event.target.checked)
  }

  const handleHelpIconClick = (index: number) => {
    const newTooltipStates = [...tooltipStates]
    newTooltipStates[index] = !newTooltipStates[index]
    setTooltipStates(newTooltipStates)
  }

  if (error)
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )

  return (
    <div
      className={'scenarioEditor'}
      data-testid={ScenarioEditorPageTestIds.SCENARIO_EDITOR}
    >
      <div id={'monaco-editor-root'} className={'alterationeditor'}>
        <AlterationScenarioEditor language={'alterationscenario'} value={''} />
      </div>
      <div className={'composantOption'}>
        <div className={'zoneButton'}>
          <Button
            data-testid={ScenarioEditorTestIds.GENERATE_BUTTON}
            text='Generate alteration'
            onClick={onGenerateClicked}
          />
        </div>
        <div className={'zoneOptions'}>
          <div className={'option'}>
            <Switch
              className={'switchButton'}
              data-testid={ScenarioEditorTestIds.OPTION_LABELING}
              color={haveLabelOption ? 'success' : 'neutral'}
              checked={haveLabelOption}
              onChange={labelChange}
              endDecorator={'Labeling'}
            />
            <Tooltip
              arrow
              title='Enable Data labeling'
              className={'tooltip'}
              open={tooltipStates.at(0)}
            >
              <HelpIcon
                fontSize='small'
                className='helpIcon'
                onClick={() => handleHelpIconClick(0)}
              />
            </Tooltip>
          </div>
          <div className={'option'}>
            <Switch
              className={'switchButton'}
              data-testid={ScenarioEditorTestIds.OPTION_REALISM}
              color={haveRealismOption ? 'success' : 'neutral'}
              checked={haveRealismOption}
              onChange={realismChange}
              endDecorator={'Realism'}
            />
            <Tooltip
              arrow
              title='Enable ground speed, track and vertical rate realism'
              className={'tooltip'}
              open={tooltipStates.at(1)}
            >
              <HelpIcon
                fontSize='small'
                className='helpIcon'
                onClick={() => handleHelpIconClick(1)}
              />
            </Tooltip>
          </div>
          <div className={'option'}>
            <Switch
              className={'switchButton'}
              data-testid={ScenarioEditorTestIds.OPTION_NOISE}
              color={haveNoiseOption ? 'success' : 'neutral'}
              checked={haveNoiseOption}
              onChange={noiseChange}
              endDecorator={'Noise'}
            />
            <Tooltip
              arrow
              title='Enable latitude and longitude noise'
              className={'tooltip'}
              open={tooltipStates.at(2)}
            >
              <HelpIcon
                fontSize='small'
                className='helpIcon'
                onClick={() => handleHelpIconClick(2)}
              />
            </Tooltip>
          </div>
          <div className={'option'}>
            <Switch
              className={'switchButton'}
              data-testid={ScenarioEditorTestIds.OPTION_DISABLE_LATITUDE}
              color={haveDisableLatitudeOption ? 'success' : 'neutral'}
              checked={haveDisableLatitudeOption}
              onChange={disableLatitudeChange}
              endDecorator={'Disable Latitude'}
            />
            <Tooltip
              arrow
              title='Disable latitude interpolation'
              className={'tooltip'}
              open={tooltipStates.at(3)}
            >
              <HelpIcon
                fontSize='small'
                className='helpIcon'
                onClick={() => handleHelpIconClick(3)}
              />
            </Tooltip>
          </div>
          <div className={'option'}>
            <Switch
              className={'switchButton'}
              data-testid={ScenarioEditorTestIds.OPTION_DISABLE_LONGITUDE}
              color={haveDisableLongitudeOption ? 'success' : 'neutral'}
              checked={haveDisableLongitudeOption}
              onChange={disableLongitudeChange}
              endDecorator={'Disable Longitude'}
            />
            <Tooltip
              arrow
              title='Disable longitude interpolation'
              className={'tooltip'}
              open={tooltipStates.at(4)}
            >
              <HelpIcon
                fontSize='small'
                className='helpIcon'
                onClick={() => handleHelpIconClick(4)}
              />
            </Tooltip>
          </div>
          <div className={'option'}>
            <Switch
              className={'switchButton'}
              data-testid={ScenarioEditorTestIds.OPTION_DISABLE_ALTITUDE}
              color={haveDisableAltitudeOption ? 'success' : 'neutral'}
              checked={haveDisableAltitudeOption}
              onChange={disableAltitudeChange}
              endDecorator={'Disable Altitude'}
            />
            <Tooltip
              arrow
              title='Disable altitude interpolation'
              className={'tooltip'}
              open={tooltipStates.at(5)}
            >
              <HelpIcon
                fontSize='small'
                className='helpIcon'
                onClick={() => handleHelpIconClick(5)}
              />
            </Tooltip>
          </div>
        </div>
        <div className={'allInputFiles'}>
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
      </div>
    </div>
  )
}

export default ScenarioEditor
