import React from 'react'
import Button from './Button'
import { ButtonTestIds } from './Button'
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
        data-testid={ButtonTestIds.GENERATE_BUTTON}
        text='Generate alteration'
        onClick={onGenerateClicked}
      />
    )

    const generateButton = screen.getByTestId(ButtonTestIds.GENERATE_BUTTON)

    await userEvent.click(generateButton)

    expect(onGenerateClicked).toBeCalledTimes(1)
  })
})
