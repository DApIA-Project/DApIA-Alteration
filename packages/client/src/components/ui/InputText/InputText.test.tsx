import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import InputText, { InputTextTestIds } from './InputText'
import userEvent from '@testing-library/user-event'

describe('InputText', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('renders with provided props', async () => {
    const onChange = jest.fn()
    render(
      <InputText
        libelle={'Prénom'}
        value={''}
        onChange={onChange}
        data-testid={InputTextTestIds.INPUT_TEXT_ELEMENT}
        id={'prenom-input'}
      />
    )

    const input = await screen.findAllByTestId(
      InputTextTestIds.INPUT_TEXT_ELEMENT
    )
    expect(input[0]).toBeInTheDocument()
  })
})
