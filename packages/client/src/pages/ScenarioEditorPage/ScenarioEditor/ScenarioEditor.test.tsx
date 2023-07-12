import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ScenarioEditor, { ScenarioEditorTestIds } from './ScenarioEditor'
import userEvent from '@testing-library/user-event'
import { OptionsAlteration, Recording } from '@smartesting/shared/src'

jest.mock(
  '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor',
  () => () =>
    (
      <div className={'view-lines monaco-mouse-cursor-text'} role={'code'}>
        hide all_planes at 0 seconds
      </div>
    )
)

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
      haveNoise: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
      haveDisableAltitude: false,
    }
    expect(spiedCallback).toBeCalledWith({
      scenario: 'hide all_planes at 0 seconds',
      recording,
      optionsAlteration,
      recordingToReplay,
    })
  })

  it('calls onGenerate callback if generate button is clicked with scenario content and labeling and realism', async () => {
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

    const labelingCheck = screen.getByTestId(
      ScenarioEditorTestIds.OPTION_LABELING
    )
    const realismCheck = screen.getByTestId(
      ScenarioEditorTestIds.OPTION_REALISM
    )

    const noiseCheck = screen.getByTestId(ScenarioEditorTestIds.OPTION_NOISE)

    const disableLatitudeCheck = screen.getByTestId(
      ScenarioEditorTestIds.OPTION_DISABLE_LATITUDE
    )
    const disableLongitudeCheck = screen.getByTestId(
      ScenarioEditorTestIds.OPTION_DISABLE_LONGITUDE
    )
    const disableAltitudeCheck = screen.getByTestId(
      ScenarioEditorTestIds.OPTION_DISABLE_ALTITUDE
    )

    await userEvent.click(labelingCheck)
    await userEvent.click(realismCheck)
    await userEvent.click(noiseCheck)
    await userEvent.click(disableLatitudeCheck)
    await userEvent.click(disableLongitudeCheck)
    await userEvent.click(disableAltitudeCheck)

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
      haveLabel: true,
      haveRealism: true,
      haveNoise: true,
      haveDisableLatitude: true,
      haveDisableLongitude: true,
      haveDisableAltitude: true,
    }
    expect(spiedCallback).toBeCalledWith({
      scenario: 'hide all_planes at 0 seconds',
      recording,
      optionsAlteration,
      recordingToReplay,
    })
  })
})
