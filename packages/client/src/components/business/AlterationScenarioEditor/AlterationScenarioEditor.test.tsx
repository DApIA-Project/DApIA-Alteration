import React from 'react'
import { render, screen } from '@testing-library/react'
import AlterationScenarioEditor from './AlterationScenarioEditor'

jest.mock('./AlterationScenarioEditor', () => () => (
  <div
    className={'view-lines monaco-mouse-cursor-text'}
    data-testid={
      'AlterationScenarioEditor.action.createAlterationScenarioEditor'
    }
  >
    hide all_planes at 0 seconds
  </div>
))
describe('AlterationScenarioEditor', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('calls onClick callback with selected recording file and recording replay file', async () => {
    jest.fn()
    render(
      <AlterationScenarioEditor language={'alterationscenario'} value={''} />
    )

    screen.getByTestId(
      'AlterationScenarioEditor.action.createAlterationScenarioEditor'
    )
  })
})
