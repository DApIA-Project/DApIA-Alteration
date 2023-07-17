import Button from '../../../../components/ui/Button/Button'
import React from 'react'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import { getMonacoEditorContent } from '../../../../utils/getMonacoEditorContent/getMonacoEditorContent'
import './GenerateAlterationButton.css'

export type OnGenerateOptions = {
  scenario: string
  recording: Recording
  optionsAlteration: OptionsAlteration
  recordingToReplay?: Recording
}

export type GenerateAlterationButtonProps = {
  recording: Recording
  recordingToReplay?: Recording
  optionsAlteration: OptionsAlteration
  onClicked: (options: OnGenerateOptions) => void
}

export enum GenerateAlterationButtonTestIds {
  COMPONENT = 'GenerateAlterationButton',
}

export const GenerateAlterationButton: React.FunctionComponent<
  GenerateAlterationButtonProps
> = ({ recording, optionsAlteration, recordingToReplay, onClicked }) => {
  function onGenerateClicked() {
    const scenario = getMonacoEditorContent()
    const options: OnGenerateOptions = {
      scenario,
      recording,
      optionsAlteration,
      recordingToReplay,
    }
    onClicked(options)
  }

  function validate(): boolean {
    const scenario = getMonacoEditorContent()
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
