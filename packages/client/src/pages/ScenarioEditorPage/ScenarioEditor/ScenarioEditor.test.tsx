import React from 'react'
import { render, screen } from '@testing-library/react'
import ScenarioEditor, { ScenarioEditorTestIds } from './ScenarioEditor'
import userEvent from '@testing-library/user-event'

jest.mock('../CodeArea/MonacoEditor', () => () => (
  <div className={'view-lines monaco-mouse-cursor-text'} role={'code'}>
    hide all_planes at 0 seconds
  </div>
))

describe('ScenarioEditor', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('calls onGenerate callback if generate button is clicked with scenario content', async () => {
    const spiedCallback = jest.fn()
    render(<ScenarioEditor onGenerate={spiedCallback} />)

    const generateButton = await screen.findByTestId(
      ScenarioEditorTestIds.GENERATE_BUTTON
    )
    await userEvent.click(generateButton)

    expect(spiedCallback).toBeCalledWith('hide all_planes at 0 seconds', '')
  })
})
