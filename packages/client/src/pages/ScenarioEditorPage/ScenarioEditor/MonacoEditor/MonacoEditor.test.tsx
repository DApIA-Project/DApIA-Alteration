import React from 'react'
import Button from './MonacoEditor'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MonacoEditor from './MonacoEditor'
import { ScenarioEditorTestIds } from '../ScenarioEditor'

describe('Button', () => {
  it('calls onChange callback with selected recording file and recording replay file', () => {
    render(
      <MonacoEditor
        className={'test-editor'}
        data-testid={ScenarioEditorTestIds.EDITOR_MONACO}
      />
    )

    screen.getByTestId(ScenarioEditorTestIds.EDITOR_MONACO)
  })
})
