import React from 'react'
import { render, screen } from '@testing-library/react'
import DownloadAlteredRecording, {
  DownloadAlteredRecordingTestIds,
} from './DownloadAlteredRecording'
import userEvent from '@testing-library/user-event'
import { ScenarioOutputTestIds } from '../AlterationOutput'

describe('DownloadAlteredRecording', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('calls onClick callback with selected recording file and recording replay file', async () => {
    const onClick = jest.fn()
    const recording = {
      name: 'modified__myfile.sbs',
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
    }
    render(
      <DownloadAlteredRecording
        data-testid={ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDINGS}
        key={recording.name}
        recording={recording}
        onClick={onClick}
      />
    )

    const downloadRecording = screen.getByTestId(
      ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDINGS
    )

    await userEvent.click(downloadRecording)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(recording)
  })
})
