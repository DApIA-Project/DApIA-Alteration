import Button from '../../../../components/ui/Button/Button'
import React from 'react'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import { getMonacoEditorContent } from '../../../../utils/getMonacoEditorContent/getMonacoEditorContent'
import './GenerateAlterationButton.css'

export type OnGenerateOptions = {
  scenario: string
  recording: Recording
  optionsAlteration: OptionsAlteration
  outputFormat: string
  recordingToReplay?: Recording
}

export type GenerateAlterationButtonProps = {
  scenario?: string
  recording: Recording
  recordingToReplay?: Recording
  optionsAlteration: OptionsAlteration
  outputFormat: string
  onClicked: (options: OnGenerateOptions) => void
}

export enum GenerateAlterationButtonTestIds {
  COMPONENT = 'GenerateAlterationButton',
}

export const GenerateAlterationButton: React.FunctionComponent<
  GenerateAlterationButtonProps
> = ({
  scenario,
  recording,
  optionsAlteration,
  recordingToReplay,
  outputFormat,
  onClicked,
}) => {
  function onGenerateClicked() {
    if (!scenario) return
    const options: OnGenerateOptions = {
      scenario,
      recording,
      optionsAlteration,
      outputFormat,
      recordingToReplay,
    }
    onClicked(options)
  }

  function validate(): boolean {
    console.log(scenario)
    return !(!scenario || !recording.content || !recording.name)
  }

  return (
    <div className={'zoneButton'}>
      <Button
        data-testid={GenerateAlterationButtonTestIds.COMPONENT}
        text='Generate alteration'
        onClick={onGenerateClicked}
        disabled={!validate()}
      />
    </div>
  )
}
