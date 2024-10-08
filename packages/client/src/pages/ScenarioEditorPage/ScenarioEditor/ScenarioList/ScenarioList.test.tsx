import React from 'react'
import { render, screen } from '@testing-library/react'
import ScenarioList, { ScenarioListTestIds } from './ScenarioList'
import userEvent from '@testing-library/user-event'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'

const mockOnClick = jest.fn()

let scenarioA: Scenario = {
  name: 'Scenario 1',
  text: 'Texte du scenario 1',
  options: {
    haveLabel: false,
    haveNoise: false,
    haveRealism: false,
    haveDisableAltitude: false,
    haveDisableLatitude: false,
    haveDisableLongitude: false,
  },
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}
let scenarioB: Scenario = {
  name: 'Scenario 2',
  text: 'Texte du scenario 2',
  options: {
    haveLabel: false,
    haveNoise: false,
    haveRealism: false,
    haveDisableAltitude: false,
    haveDisableLatitude: false,
    haveDisableLongitude: false,
  },
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
}

let listScenario: Scenario[] = []
listScenario.push(scenarioA)
listScenario.push(scenarioB)
const mockScenarios: Scenario[] = listScenario

const mockScenariosEmpty: Scenario[] = []

describe('ScenarioList', () => {
  it('show scenario list', async () => {
    render(
      <ScenarioList
        scenarios={mockScenarios}
        onClick={mockOnClick}
        onRemove={() => {}}
      />
    )
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )
    expect(scenarioButtons).toHaveLength(mockScenarios!.length)
  })

  it('click on button of scenario', async () => {
    render(
      <ScenarioList
        scenarios={mockScenarios}
        onClick={mockOnClick}
        onRemove={() => {}}
      />
    )
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )
    await userEvent.click(scenarioButtons[0])
    expect(mockOnClick).toHaveBeenCalledWith(mockScenarios![0])
    await userEvent.click(scenarioButtons[1])
    expect(mockOnClick).toHaveBeenCalledWith(mockScenarios![1])
  })

  it('scenario list empty', async () => {
    render(
      <ScenarioList
        scenarios={mockScenariosEmpty}
        onClick={mockOnClick}
        onRemove={() => {}}
      />
    )
    const scenarioButtons = screen.queryAllByRole('button')
    expect(scenarioButtons).toHaveLength(0)
  })
})
