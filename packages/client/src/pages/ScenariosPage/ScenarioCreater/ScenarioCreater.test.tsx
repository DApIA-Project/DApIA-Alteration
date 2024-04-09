import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ScenarioCreater, { ScenarioCreaterTestIds } from './ScenarioCreater'
import { useNavigate } from 'react-router-dom'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import Client from '../../../Client'
import { mockUseClient } from '../../../mocks/mockUseClient'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ScenarioCreater', () => {
  let mockNavigate: jest.Mock

  let client: Client
  beforeEach(() => {
    client = new Client()
    mockUseClient(client)

    jest.spyOn(client, 'createScenario').mockReturnValue(
      Promise.resolve({
        error: null,
        scenario: null,
      })
    )
    mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('renders ScenarioCreater component', () => {
    render(<ScenarioCreater onScenario={() => {}} />)

    const importButton = screen.getByTestId(
      ScenarioCreaterTestIds.BUTTON_IMPORT_SCENARIO
    )
    const addButton = screen.getByTestId(
      ScenarioCreaterTestIds.BUTTON_ADD_SCENARIO
    )

    expect(importButton).toBeInTheDocument()
    expect(addButton).toBeInTheDocument()
  })

  it('triggers handleAddScenario function when add scenario button is clicked', () => {
    render(<ScenarioCreater onScenario={() => {}} />)
    const addScenarioButton = screen.getByTestId(
      ScenarioCreaterTestIds.BUTTON_ADD_SCENARIO
    )
    fireEvent.click(addScenarioButton)
    expect(mockNavigate).toHaveBeenCalled()
  })

  it('Valid JSON file is imported', async () => {
    const file = new File(
      [
        '{"name":"Test Scenario","text":"Test text","options":{"haveLabel": false,\n' +
          '    "haveRealism": false,\n' +
          '    "haveNoise": false,\n' +
          '    "haveDisableLatitude": false,\n' +
          '    "haveDisableLongitude": false,\n' +
          '    "haveDisableAltitude": false}}',
      ],
      'scenario.json',
      { type: 'application/json' }
    )

    render(<ScenarioCreater onScenario={() => {}} />)

    fireEvent.change(
      screen.getByTestId(ScenarioCreaterTestIds.INPUT_IMPORT_SCENARIO),
      {
        target: {
          files: [file],
        },
      }
    )

    await waitFor(() => {
      expect(client.createScenario).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(client.createScenario).toBeCalledWith(
        'Test Scenario',
        'Test text',
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        }
      )
    })
  })

  it('displays an error alert when an invalid JSON file is imported with missing text or options', async () => {
    const invalidFile = new File(
      ['{"name":"Test Scenario"}'],
      'invalid_scenario.json',
      { type: 'application/json' }
    )

    render(<ScenarioCreater onScenario={() => {}} />)

    fireEvent.change(
      screen.getByTestId(ScenarioCreaterTestIds.INPUT_IMPORT_SCENARIO),
      {
        target: {
          files: [invalidFile],
        },
      }
    )

    await waitFor(() => {
      const errorAlert = screen.getByRole('alert')
      expect(errorAlert).toBeInTheDocument()
    })
    await waitFor(() => {
      const errorAlert = screen.getByRole('alert')
      expect(errorAlert).toHaveTextContent(
        'Error file content : Missing attribute name or text or options'
      )
    })
  })

  it('displays an error alert when an invalid JSON file is imported with missing attribute in options', async () => {
    const invalidFile = new File(
      [
        '{"name":"Test Scenario","text":"Test text","options":{"haveLabel": false,\n' +
          '    "errorTest": false,\n' +
          '    "haveNoise": false,\n' +
          '    "haveDisableLatitude": false,\n' +
          '    "haveDisableLongitude": false,\n' +
          '    "haveDisableAltitude": false}}',
      ],
      'invalid_scenario.json',
      { type: 'application/json' }
    )

    render(<ScenarioCreater onScenario={() => {}} />)

    fireEvent.change(
      screen.getByTestId(ScenarioCreaterTestIds.INPUT_IMPORT_SCENARIO),
      {
        target: {
          files: [invalidFile],
        },
      }
    )

    await waitFor(() => {
      const errorAlert = screen.getByRole('alert')
      expect(errorAlert).toBeInTheDocument()
    })
    await waitFor(() => {
      const errorAlert = screen.getByRole('alert')
      expect(errorAlert).toHaveTextContent(
        'Error file content : Missing attribute haveLabel or haveRealism or haveNoise or haveDisableLatitude or haveDisableLongitude or haveDisableAltitude'
      )
    })
  })
})
