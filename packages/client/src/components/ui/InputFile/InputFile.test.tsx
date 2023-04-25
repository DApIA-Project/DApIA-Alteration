import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import InputFile from './InputFile'
import { InputFileTestIds } from './InputFile'

describe('InputFile', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('calls onChange callback with selected recording file and recording replay file', () => {
    const onChange = jest.fn()
    render(
      <>
        <InputFile
          name='test-file-input'
          onChange={onChange}
          data-testid={InputFileTestIds.INPUT_FILE_RECORDING}
        />
        <InputFile
          name='test-file-input'
          onChange={onChange}
          data-testid={InputFileTestIds.INPUT_FILE_RECORDING_REPLAY}
        />
      </>
    )
    const file1 = new File(
      [
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      ],
      'myfile.sbs',
      {
        type: 'text/plain',
      }
    )
    const file2 = new File(
      [
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      ],
      'myfile.sbs',
      {
        type: 'text/plain',
      }
    )
    fireEvent.change(
      screen.getByTestId(InputFileTestIds.INPUT_FILE_RECORDING),
      {
        target: { files: [file1] },
      }
    )
    fireEvent.change(
      screen.getByTestId(InputFileTestIds.INPUT_FILE_RECORDING_REPLAY),
      {
        target: { files: [file2] },
      }
    )
    expect(onChange).toHaveBeenCalledWith([file1])
    expect(onChange).toHaveBeenCalledWith([file2])
  })
})
