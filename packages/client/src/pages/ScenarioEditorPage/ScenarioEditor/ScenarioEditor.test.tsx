import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ScenarioEditor, { ScenarioEditorTestIds } from './ScenarioEditor'
import userEvent from '@testing-library/user-event'
import {
  OptionsAlteration,
  OptionsAlterationName,
  Recording,
} from '@smartesting/shared/src'
import { RecordInputFilesTestIds } from './RecordInputFiles/RecordInputFiles'
import { GenerateAlterationButtonTestIds } from './GenerateAlterationButton/GenerateAlterationButton'
import * as getMonacoEditorContentModule from '../../../utils/getMonacoEditorContent/getMonacoEditorContent'

jest.mock(
  '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor',
  () => () => <div />
)

describe('ScenarioEditor', () => {
  let spiedCallback: jest.Mock
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

  beforeEach(() => {
    jest
      .spyOn(getMonacoEditorContentModule, 'getMonacoEditorContent')
      .mockReturnValue('hide all_planes at 0 seconds')
    spiedCallback = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls onGenerate callback if generate button is clicked with scenario content', async () => {
    render(<ScenarioEditor onGenerate={spiedCallback} />)

    fireEvent.change(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING),
      {
        target: { files: fileList },
      }
    )

    await screen.findByTestId(RecordInputFilesTestIds.RECORDING_IS_PRESENT)

    await userEvent.click(
      screen.getByTestId(GenerateAlterationButtonTestIds.COMPONENT)
    )

    let recording: Recording = {
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      name: 'myfile.sbs',
    }
    let optionsAlteration: OptionsAlteration = {
      haveLabel: false,
      haveRealism: false,
      haveNoise: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
      haveDisableAltitude: false,
    }

    await waitFor(() => {
      expect(spiedCallback).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(spiedCallback).toBeCalledWith({
        scenario: 'hide all_planes at 0 seconds',
        recording,
        optionsAlteration,
      })
    })
  })

  it('calls onGenerate callback if generate button is clicked with scenario content and labeling and realism', async () => {
    render(<ScenarioEditor onGenerate={spiedCallback} />)

    fireEvent.change(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING),
      {
        target: { files: fileList },
      }
    )

    await screen.findByTestId(RecordInputFilesTestIds.RECORDING_IS_PRESENT)
    const checkboxs = screen.getAllByRole('checkbox')
    checkboxs.forEach((checkbox) => {
      userEvent.click(checkbox)
    })

    await userEvent.click(
      screen.getByTestId(GenerateAlterationButtonTestIds.COMPONENT)
    )

    let recording: Recording = {
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      name: 'myfile.sbs',
    }
    let optionsAlteration: OptionsAlteration = {
      haveLabel: true,
      haveRealism: true,
      haveNoise: true,
      haveDisableLatitude: true,
      haveDisableLongitude: true,
      haveDisableAltitude: true,
    }

    await waitFor(() => {
      expect(spiedCallback).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(spiedCallback).toBeCalledWith({
        scenario: 'hide all_planes at 0 seconds',
        recording,
        optionsAlteration,
      })
    })
  })
})
