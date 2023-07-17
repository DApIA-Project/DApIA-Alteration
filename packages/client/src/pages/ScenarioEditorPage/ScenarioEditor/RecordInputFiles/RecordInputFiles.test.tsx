import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RecordInputFiles, RecordInputFilesTestIds } from './RecordInputFiles'

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

const files2 = [
  new File(
    [
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
    ],
    'myfile2.sbs',
    {
      type: 'text/plain',
    }
  ),
]

const fileList2 = {
  files2,
  length: files2.length,
  item: (index: number) => files2[index],
}

describe('RecordInputFiles', () => {
  it('display Image no selected when no have recording and no have recording replay', async () => {
    render(
      <RecordInputFiles
        onChangeRecord={() => null}
        onChangeReplayRecord={() => null}
      />
    )
    expect(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING)
    ).toBeDefined()
    expect(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING_REPLAY)
    ).toBeDefined()
    const elements = screen.queryAllByTestId(
      RecordInputFilesTestIds.RECORDING_IS_NOT_PRESENT
    )
    expect(elements.length).toEqual(2)
  })

  it('callback is valid when call recording', async () => {
    const callback = jest.fn()
    render(
      <RecordInputFiles
        onChangeRecord={callback}
        onChangeReplayRecord={() => null}
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

  it('callback is valid when call recording and call recording replay', async () => {
    const callback = jest.fn()
    const callback2 = jest.fn()
    render(
      <RecordInputFiles
        onChangeRecord={callback}
        onChangeReplayRecord={callback2}
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

    fireEvent.change(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING_REPLAY),
      {
        target: {
          files: fileList2,
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

    await waitFor(() => {
      expect(callback2).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(callback2).toBeCalledWith({
        name: 'myfile2.sbs',
        content:
          'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      })
    })
  })
})
