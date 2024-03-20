import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CheckBox from './CheckBox'

describe('CheckBox', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('render CheckBox', () => {
    render(<CheckBox label={'Test'} checked={true} onChange={() => {}} />)

    const checkboxElement = screen.getByText('Test')

    expect(checkboxElement).toBeInTheDocument()
  })

  it('CheckBox is checked', () => {
    render(<CheckBox label={'Test'} checked={true} onChange={() => {}} />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toBeChecked()
  })

  it('CheckBox is not checked', () => {
    render(<CheckBox label={'Test'} checked={false} onChange={() => {}} />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).not.toBeChecked()
  })

  it('onChange function should be called when checkbox is clicked', () => {
    const onChangeMock = jest.fn()
    render(<CheckBox label='Test' checked={false} onChange={onChangeMock} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })
})
