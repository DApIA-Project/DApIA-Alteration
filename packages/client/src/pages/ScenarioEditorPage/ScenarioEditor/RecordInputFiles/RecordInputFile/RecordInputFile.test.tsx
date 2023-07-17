import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RecordInputFile } from './RecordInputFile'
import { RecordInputFilesTestIds } from '../RecordInputFiles'

const files = [
  new File(
    [
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
    ],
    'myfile.sbs',
    {
      type: 'text/plain',
    }
  ),
]

const fileList = {
  files,
  length: files.length,
  item: (index: number) => files[index],
}

describe('RecordInputFile', () => {
  it('display Image no selected when no have recording', async () => {
    render(
      <RecordInputFile
        onRead={() => null}
        testIdInput={RecordInputFilesTestIds.INPUT_FILE_RECORDING}
      />
    )
    expect(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING)
    ).toBeDefined()
    expect(
      screen.getByTestId(RecordInputFilesTestIds.RECORDING_IS_NOT_PRESENT)
    ).toBeDefined()
  })

  it('display Image selected when have recording', async () => {
    render(
      <RecordInputFile
        onRead={() => null}
        testIdInput={RecordInputFilesTestIds.INPUT_FILE_RECORDING_REPLAY}
      />
    )
    fireEvent.change(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING_REPLAY),
      {
        target: {
          files: fileList,
        },
      }
    )
    expect(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING_REPLAY)
    ).toBeDefined()

    await screen.findByTestId(RecordInputFilesTestIds.RECORDING_IS_PRESENT)
  })

  it('callback is valid when have recording', async () => {
    const callback = jest.fn()
    render(
      <RecordInputFile
        onRead={callback}
        testIdInput={RecordInputFilesTestIds.INPUT_FILE_RECORDING}
      />
    )
    fireEvent.change(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING),
      {
        target: {
          files: fileList,
        },
      }
    )
    await waitFor(() => {
      expect(callback).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(callback).toBeCalledWith({
        name: 'myfile.sbs',
        content:
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      })
    })
  })
})
