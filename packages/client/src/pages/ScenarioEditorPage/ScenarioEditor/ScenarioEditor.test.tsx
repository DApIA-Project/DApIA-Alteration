import React from 'react'
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import ScenarioEditor, { ScenarioEditorTestIds } from './ScenarioEditor'
import userEvent from '@testing-library/user-event'
import { OptionsAlteration, Recording } from '@smartesting/shared/src'

jest.mock('./MonacoEditor/MonacoEditor', () => () => (
  <div className={'view-lines monaco-mouse-cursor-text'} role={'code'}>
    hide all_planes at 0 seconds
  </div>
))

describe('ScenarioEditor', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('calls onGenerate callback if generate button is clicked with scenario content', async () => {
    const spiedCallback = jest.fn()
    render(<ScenarioEditor onGenerate={spiedCallback} />)

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
    const fileList = {
      files,
      length: files.length,
      item: (index: number) => files[index],
    }

    const fileList2 = {
      files2,
      length: files2.length,
      item: (index: number) => files2[index],
    }

    fireEvent.change(
      screen.getByTestId(ScenarioEditorTestIds.INPUT_FILE_RECORDING),
      {
        target: { files: fileList },
      }
    )

    fireEvent.change(
      screen.getByTestId(ScenarioEditorTestIds.INPUT_FILE_RECORDING_REPLAY),
      {
        target: { files: fileList2 },
      }
    )
    const generateButton = screen.getByTestId(
      ScenarioEditorTestIds.GENERATE_BUTTON
    )

    await waitFor(() =>
      screen.findByTestId(ScenarioEditorTestIds.RECORDING_IS_PRESENT)
    )
    await waitFor(() =>
      screen.findByTestId(ScenarioEditorTestIds.RECORDING_REPLAY_IS_PRESENT)
    )
    await userEvent.click(generateButton)
    //expect(spiedCallback).toHaveBeenCalledTimes(1)
    let recording: Recording = {
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      name: 'myfile.sbs',
    }
    let recordingToReplay: Recording = {
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      name: 'myfile2.sbs',
    }
    let optionsAlteration: OptionsAlteration = {
      haveLabel: false,
      haveRealism: false,
    }
    expect(spiedCallback).toBeCalledWith({
      scenario: 'hide all_planes at 0 seconds',
      recording,
      optionsAlteration,
      recordingToReplay,
    })
  })
})
