import {
  OptionsAlteration,
  OptionsAlterationName,
} from '@smartesting/shared/dist/models/index'
import { render, screen, waitFor, within } from '@testing-library/react'
import { ScenarioOptions } from './ScenarioOptions'
import userEvent from '@testing-library/user-event'

describe('ScenarioOptions', () => {
  const options: OptionsAlteration = {
    haveLabel: false,
    haveNoise: false,
    haveRealism: false,
    haveDisableLatitude: false,
    haveDisableLongitude: false,
    haveDisableAltitude: false,
  }

  for (const optionName of Object.keys(options)) {
    testOption(optionName, options)
  }
})

async function testOption(optionName: string, options: OptionsAlteration) {
  it(`changes ${optionName} value when click on ${optionName}`, async () => {
    const onChange = jest.fn()
    render(<ScenarioOptions optionsAlteration={options} onChange={onChange} />)
    // @ts-ignore
    const parent = screen.getByTestId(OptionsAlterationName[optionName])
    await userEvent.click(within(parent).getByRole('switch'))
    await waitFor(() => {
      expect(onChange).toBeCalledTimes(1)
    })
    expect(onChange).toBeCalledWith({ ...options, [optionName]: true })
  })
}
