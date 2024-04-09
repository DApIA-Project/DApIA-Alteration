import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ScenarioManager, { ScenarioManagerTestIds } from './ScenarioManager'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ScenarioManager', () => {
  let mockNavigate: jest.Mock

  beforeEach(() => {
    mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
  })
  afterAll(() => {
    jest.clearAllMocks()
  })
  const scenario = {
    id: 1,
    name: 'Test Scenario',
    text: 'Scenario content',
    options: {
      haveLabel: false,
      haveRealism: true,
      haveNoise: false,
      haveDisableLatitude: true,
      haveDisableLongitude: false,
      haveDisableAltitude: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('calls onDeleteScenario function when delete button is clicked', () => {
    const onDeleteScenarioMock = jest.fn()

    render(
      <ScenarioManager
        scenario={scenario}
        onDeleteScenario={onDeleteScenarioMock}
      />
    )

    const deleteButton = screen.getByTestId(
      ScenarioManagerTestIds.BUTTON_REMOVE_SCENARIO
    )

    fireEvent.click(deleteButton)
    expect(onDeleteScenarioMock).toHaveBeenCalledWith(scenario.id)
  })

  it('navigates to edit scenario page when edit button is clicked', () => {
    const navigateMock = jest.fn()
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockReturnValue(navigateMock)

    render(<ScenarioManager scenario={scenario} onDeleteScenario={() => {}} />)

    const editButton = screen.getByTestId(
      ScenarioManagerTestIds.BUTTON_EDIT_SCENARIO
    )

    fireEvent.click(editButton)
    expect(navigateMock).toHaveBeenCalledWith('/edit-scenario/1')
  })

  it('downloads scenario when export button is clicked', () => {
    render(<ScenarioManager scenario={scenario} onDeleteScenario={() => {}} />)

    const exportButton = screen.getByTestId(
      ScenarioManagerTestIds.BUTTON_EXPORT_SCENARIO
    )

    URL.createObjectURL = jest.fn(() => 'http://fakeurl.com')
    fireEvent.click(exportButton)
    expect(URL.createObjectURL).toHaveBeenCalledWith(
      new Blob(
        [
          JSON.stringify(
            {
              name: scenario.name,
              text: scenario.text,
              options: scenario.options,
            },
            null,
            2
          ),
        ],
        { type: 'text/plain' }
      )
    )
  })
})
