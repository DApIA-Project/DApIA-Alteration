import React from 'react'
import { render, screen } from '@testing-library/react'
import ScenarioTile, { ScenarioTileTestIds } from './ScenarioTile'
import { useNavigate } from 'react-router-dom'

jest.mock(
  '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor',
  () => () =>
    (
      <div
        className={'view-lines monaco-mouse-cursor-text'}
        role={'code'}
        data-testid={'DocumentationPage.action.setButtonDeletion.showEditor'}
      >
        hide all_planes at 0 seconds
      </div>
    )
)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ScenarioTile', () => {
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
    text: 'hide all_planes at 0 seconds',
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

  it('renders scenario tile correctly', () => {
    render(
      <ScenarioTile scenario={scenario} index={0} onDeleteScenario={() => {}} />
    )

    expect(
      screen.getByTestId(ScenarioTileTestIds.DIV_SCENARIO)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(ScenarioTileTestIds.DIV_INFO_SCENARIO)
    ).toBeInTheDocument()
    expect(screen.getByText(scenario.name)).toBeInTheDocument()
    expect(screen.getByText(scenario.text)).toBeInTheDocument()
    expect(
      screen.getByTestId(ScenarioTileTestIds.DIV_OPTIONS_SCENARIO)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(ScenarioTileTestIds.DIV_EDITION_SCENARIO)
    ).toBeInTheDocument()
  })
})
