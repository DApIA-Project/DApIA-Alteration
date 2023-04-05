import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import InputFile from '../../../../components/ui/InputFile/InputFile'
import { ScenarioEditorTestIds } from '../../ScenarioEditor/ScenarioEditor'
import DownloadAlteredRecording, {
  DownloadAlteredRecordingTestIds,
} from './DownloadAlteredRecording'
import userEvent from '@testing-library/user-event'

describe('DownloadAlteredRecording', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('calls onChange callback with selected recording file and recording replay file', () => {
    const onClick = jest.fn()
    render(
      <DownloadAlteredRecording
        key={'modified__myfile.sbs'}
        recording={{
          name: 'modified__myfile.sbs',
          content:
            'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
        }}
        onClick={onClick}
      />
    )

    const downloadRecording = screen.getByTestId(
      DownloadAlteredRecordingTestIds.DOWNLOAD_RECORDING
    )

    userEvent.click(downloadRecording)
    expect(onClick).toHaveBeenCalledWith({
      name: 'modified__myfile.sbs',
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
    })
  })
})
