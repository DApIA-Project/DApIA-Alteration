import React from 'react'
import Button from './Button'
import { ScenarioEditorTestIds } from '../../../pages/ScenarioEditorPage/ScenarioEditor/ScenarioEditor'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('calls onChange callback with selected recording file and recording replay file', async () => {
    const onGenerateClicked = jest.fn()

    render(
      <Button
        data-testid={ScenarioEditorTestIds.GENERATE_BUTTON}
        text='Generate alteration'
        onClick={onGenerateClicked}
      />
    )

    const generateButton = screen.getByTestId(
      ScenarioEditorTestIds.GENERATE_BUTTON
    )

    await userEvent.click(generateButton)

    expect(onGenerateClicked).toBeCalledTimes(1)
  })
})
