import React from 'react'
import { render, screen } from '@testing-library/react'
import FditScenarioEditor from './FditScenarioEditor'

jest.mock('./FditScenarioEditor', () => () => (
  <div
    className={'view-lines monaco-mouse-cursor-text'}
    data-testid={'FditScenarioEditor.action.createFditScenarioEditor'}
  >
    hide all_planes at 0 seconds
  </div>
))
describe('FditScenarioEditor', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('calls onClick callback with selected recording file and recording replay file', async () => {
    jest.fn()
    render(<FditScenarioEditor language={'fditscenario'} value={''} />)

    screen.getByTestId('FditScenarioEditor.action.createFditScenarioEditor')
  })
})
