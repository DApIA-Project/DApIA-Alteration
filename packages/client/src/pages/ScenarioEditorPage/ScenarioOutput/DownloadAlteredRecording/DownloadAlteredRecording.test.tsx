import React from 'react'
import { render, screen } from '@testing-library/react'
import DownloadAlteredRecording from './DownloadAlteredRecording'
import userEvent from '@testing-library/user-event'
import { ScenarioOutputTestIds } from '../ScenarioOutput'

describe('DownloadAlteredRecording', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('calls onChange callback with selected recording file and recording replay file', () => {
    const onClick = jest.fn()
    render(
      <DownloadAlteredRecording
        data-testid={ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDINGS}
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
      ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDINGS
    )

    userEvent.click(downloadRecording)
    expect(onClick).toHaveBeenCalledWith({
      name: 'modified__myfile.sbs',
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
    })
  })
})
