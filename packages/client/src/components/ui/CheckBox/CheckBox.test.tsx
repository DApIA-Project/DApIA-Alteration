import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CheckBox, { CheckBoxTestIds } from './CheckBox'
import InputFile, { InputFileTestIds } from '../InputFile/InputFile'
import { SelectTestIds } from '../Select/Select'

describe('CheckBox', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('render CheckBox', () => {
    render(<CheckBox label={'Test'} checked={true} onChange={() => {}} />)

    const checkboxElement = screen.getByText('Test')

    expect(checkboxElement).toBeInTheDocument()
  })

  it('onChange function should be called when checkbox is clicked', () => {
    const onChangeMock = jest.fn()
    render(<CheckBox label='Test' checked={false} onChange={onChangeMock} />)
    const checkbox = screen.getByTestId(CheckBoxTestIds.CHECK_BOX_COMPONENT)
    fireEvent.click(checkbox)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })
})
