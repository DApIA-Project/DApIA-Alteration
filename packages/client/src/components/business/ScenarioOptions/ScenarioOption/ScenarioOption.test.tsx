import { render, screen } from '@testing-library/react'
import React from 'react'
import { ScenarioOption } from './ScenarioOption'
import userEvent from '@testing-library/user-event'
describe('ScenarioOption', () => {
  it('displays option name', () => {
    render(
      <ScenarioOption value={false} onChange={() => null} name={'Labeling'} />
    )
    expect(screen.getByText('Labeling')).toBeDefined()
  })

  it('displays tooltip if description is set', () => {
    render(
      <ScenarioOption
        value={false}
        onChange={() => null}
        name={'Labeling'}
        description={'It is a description'}
      />
    )
    expect(screen.getByTestId('HelpIcon')).toBeDefined()
  })

  it('does not display tooltip if description is undefined', () => {
    render(
      <ScenarioOption value={false} onChange={() => null} name={'Labeling'} />
    )
    expect(screen.queryByTestId('HelpIcon')).toBeNull()
  })

  it('calls onChange when value change', async () => {
    const callback = jest.fn()
    render(
      <ScenarioOption value={false} onChange={callback} name={'Labeling'} />
    )

    await userEvent.click(screen.getByRole('switch'))

    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(true)
  })
})
