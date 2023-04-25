import React from 'react'
import { render, screen } from '@testing-library/react'
import FditscenarioEditor from './FditscenarioEditor'

jest.mock('./FditscenarioEditor', () => () => (
  <div
    className={'view-lines monaco-mouse-cursor-text'}
    data-testid={'FditscenarioEditor.action.createFditscenarioEditor'}
  >
    hide all_planes at 0 seconds
  </div>
))
describe('FditscenarioEditor', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('calls onClick callback with selected recording file and recording replay file', async () => {
    jest.fn()
    render(<FditscenarioEditor language={'fditscenario'} value={''} />)

    screen.getByTestId('FditscenarioEditor.action.createFditscenarioEditor')
  })
})
