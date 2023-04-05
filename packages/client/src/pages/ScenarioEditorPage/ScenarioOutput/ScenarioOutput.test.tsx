import React from 'react'
import { render, screen } from '@testing-library/react'
import ScenarioOutput, { ScenarioOutputTestIds } from './ScenarioOutput'
import { AlterRecordingError } from '@smartesting/shared/src'
describe('ScenarioOutput', () => {
  it('displays an error if error is set', async () => {
    const error = AlterRecordingError.invalidSyntax
    render(<ScenarioOutput response={{ error, alteredRecordings: [] }} />)

    const displayError = screen.getByTestId(ScenarioOutputTestIds.DISPLAY_ERROR)
    expect(displayError).toHaveTextContent(error)
  })

  it('displays an success and DownloadAlteredRecording if error is not set', async () => {
    render(
      <ScenarioOutput
        response={{
          error: null,
          alteredRecordings: [
            {
              name: 'modified__myfile_0.sbs',
              content:
                'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
            },
            {
              name: 'modified__myfile_1.sbs',
              content:
                'MSG,4,3,5022202,4CB1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
            },
          ],
        }}
      />
    )

    screen.getByTestId(ScenarioOutputTestIds.DISPLAY_SUCCESS)

    const displayDownloadRecordings = screen.getAllByTestId(
      ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDINGS
    )
    expect(displayDownloadRecordings.length).toEqual(2)
  })

  it('displays nothing if error is not set and recording is empty', async () => {
    render(<ScenarioOutput response={{ error: null, alteredRecordings: [] }} />)

    screen.getByTestId(ScenarioOutputTestIds.DISPLAY_SUCCESS)

    screen.getByTestId(ScenarioOutputTestIds.DISPLAY_DOWNLOAD_RECORDING_ZONE)
  })
})
