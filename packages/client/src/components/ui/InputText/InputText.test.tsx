import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import InputText, { InputTextTestIds } from './InputText'
import userEvent from '@testing-library/user-event'

describe('InputText', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('calls onChange callback with selected recording file and recording replay file', async () => {
    const onChange = jest.fn()
    render(
      <InputText
        libelle={'Prénom'}
        value={''}
        onChange={onChange}
        data-testid={InputTextTestIds.INPUT_TEXT_ELEMENT}
      />
    )

    const input = screen.getByTestId(InputTextTestIds.INPUT_TEXT_ELEMENT)
    fireEvent.change(input, { target: { value: 'Bob' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('Bob')
  })
})
