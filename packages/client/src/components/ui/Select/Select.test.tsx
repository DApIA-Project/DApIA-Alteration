import React from 'react'
import Select from './Select'
import { SelectTestIds } from './Select'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileFormat } from '@smartesting/shared/dist'

describe('Select', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', async () => {
    const onChange = jest.fn()
    const formats = [
      { value: FileFormat.sbs, label: 'sbs' },
      { value: FileFormat.openskyCsv, label: 'openskyCsv' },
      { value: FileFormat.droneCsv, label: 'droneCsv' },
      { value: FileFormat.json, label: 'json' },
      { value: FileFormat.ndjson, label: 'ndjson' },
    ]
    render(
      <Select
        data-testid={SelectTestIds.SELECT_FORMAT}
        value={FileFormat.sbs}
        options={formats}
        onChange={onChange}
      />
    )

    const selectElement = screen.getByTestId(SelectTestIds.SELECT_FORMAT)

    expect(selectElement).toBeInTheDocument()
    expect(selectElement).toHaveValue(FileFormat.sbs)
  })

  it('calls onChange when a new option is selected', async () => {
    const onChange = jest.fn()
    const formats = [
      { value: FileFormat.sbs, label: 'sbs' },
      { value: FileFormat.openskyCsv, label: 'openskyCsv' },
      { value: FileFormat.droneCsv, label: 'droneCsv' },
      { value: FileFormat.json, label: 'json' },
      { value: FileFormat.ndjson, label: 'ndjson' },
    ]
    render(
      <Select
        data-testid={SelectTestIds.SELECT_FORMAT}
        value={FileFormat.sbs}
        options={formats}
        onChange={onChange}
      />
    )

    const selectElement = screen.getByTestId(SelectTestIds.SELECT_FORMAT)
    await userEvent.selectOptions(selectElement, FileFormat.json)
    expect(onChange).toHaveBeenCalledWith(FileFormat.json)
    expect(selectElement).toHaveValue(FileFormat.json)
  })
})
