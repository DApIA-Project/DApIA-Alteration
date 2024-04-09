import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ScenariosFilters, { ScenariosFiltersTestIds } from './ScenariosFilters'
import Client from '../../../Client'
import { mockUseClient } from '../../../mocks/mockUseClient'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ScenariosFilters', () => {
  let client: Client
  beforeEach(() => {
    client = new Client()
    mockUseClient(client)

    jest.spyOn(client, 'listUserScenario').mockReturnValue(
      Promise.resolve({
        error: null,
        scenarios: [],
      })
    )
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('opens and closes filters when the filters div is clicked', () => {
    render(<ScenariosFilters onScenarios={() => {}} />)

    const filtersDiv = screen.getByTestId(ScenariosFiltersTestIds.DIV_FILTERS)

    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(
      screen.queryAllByTestId(ScenariosFiltersTestIds.INPUT_DATE)
    ).toHaveLength(0)
    expect(
      screen.queryByTestId(ScenariosFiltersTestIds.DIV_CHECKBOX_LIST)
    ).toBeNull()

    fireEvent.click(filtersDiv)

    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(
      screen.getAllByTestId(ScenariosFiltersTestIds.INPUT_DATE)
    ).toHaveLength(2)
    expect(
      screen.getByTestId(ScenariosFiltersTestIds.DIV_CHECKBOX_LIST)
    ).toBeInTheDocument()

    fireEvent.click(filtersDiv)

    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(
      screen.queryAllByTestId(ScenariosFiltersTestIds.INPUT_DATE)
    ).toHaveLength(0)
    expect(
      screen.queryByTestId(ScenariosFiltersTestIds.DIV_CHECKBOX_LIST)
    ).toBeNull()
  })

  it('triggers the search callback when typing in the search bar', async () => {
    render(<ScenariosFilters onScenarios={() => {}} />)

    fireEvent.change(
      screen.getByTestId(ScenariosFiltersTestIds.INPUT_SEARCH_BAR),
      { target: { value: 'Scenario Test' } }
    )

    await waitFor(() => {
      expect(client.listUserScenario).toBeCalledTimes(1)
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        'Scenario Test',
        undefined,
        undefined,
        undefined,
        undefined
      )
    })
  })

  it('triggers the dates callback when selected start and end dates', async () => {
    render(<ScenariosFilters onScenarios={() => {}} />)
    const filtersDiv = screen.getByTestId(ScenariosFiltersTestIds.DIV_FILTERS)
    fireEvent.click(filtersDiv)

    const datesInput = screen.getAllByTestId(ScenariosFiltersTestIds.INPUT_DATE)

    fireEvent.change(datesInput[0], { target: { value: '2024-02-01' } })

    await waitFor(() => {
      expect(client.listUserScenario).toBeCalledTimes(1)
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '2024-02-01 00:00:00',
        '',
        undefined,
        undefined
      )
    })

    fireEvent.change(datesInput[1], { target: { value: '2024-03-01' } })

    await waitFor(() => {
      expect(client.listUserScenario).toBeCalledTimes(2)
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '2024-02-01 00:00:00',
        '2024-03-01 00:00:00',
        undefined,
        undefined
      )
    })
  })

  it('sorts scenarios based on selected sort option', () => {
    render(<ScenariosFilters onScenarios={() => {}} />)

    const selectSort = screen.getByTestId(
      ScenariosFiltersTestIds.INPUT_SELECT_SORT
    )

    fireEvent.change(selectSort, { target: { value: 'dateDescending' } })
    expect(client.listUserScenario).toHaveBeenCalledWith(
      '',
      '',
      '',
      undefined,
      'dateDescending'
    )

    fireEvent.change(selectSort, { target: { value: 'dateAscending' } })
    expect(client.listUserScenario).toHaveBeenCalledWith(
      '',
      '',
      '',
      undefined,
      'dateAscending'
    )

    fireEvent.change(selectSort, { target: { value: 'alphabeticalOrder' } })
    expect(client.listUserScenario).toHaveBeenCalledWith(
      '',
      '',
      '',
      undefined,
      'alphabeticalOrder'
    )

    fireEvent.change(selectSort, { target: { value: 'antialphabeticalOrder' } })
    expect(client.listUserScenario).toHaveBeenCalledWith(
      '',
      '',
      '',
      undefined,
      'antialphabeticalOrder'
    )

    fireEvent.change(selectSort, { target: { value: 'noSort' } })
    expect(client.listUserScenario).toHaveBeenCalledWith(
      '',
      '',
      '',
      undefined,
      'noSort'
    )
  })

  it('filters scenarios based on checkbox selections options filter checked in first', async () => {
    render(<ScenariosFilters onScenarios={() => {}} />)
    const filtersDiv = screen.getByTestId(ScenariosFiltersTestIds.DIV_FILTERS)
    fireEvent.click(filtersDiv)

    const optionsFilterCheckbox = screen.getByLabelText('Options filter')
    const labelingCheckbox = screen.getByLabelText('Labeling')
    const realismCheckbox = screen.getByLabelText('Realism')
    const noiseCheckbox = screen.getByLabelText('Noise')
    const disableLatitudeCheckbox = screen.getByLabelText('Disable latitude')
    const disableLongitudeCheckbox = screen.getByLabelText('Disable longitude')
    const disableAltitudeCheckbox = screen.getByLabelText('Disable altitude')

    fireEvent.click(optionsFilterCheckbox)
    fireEvent.click(labelingCheckbox)
    fireEvent.click(realismCheckbox)
    fireEvent.click(noiseCheckbox)
    fireEvent.click(disableLatitudeCheckbox)
    fireEvent.click(disableLongitudeCheckbox)
    fireEvent.click(disableAltitudeCheckbox)

    await waitFor(() => {
      expect(client.listUserScenario).toBeCalledTimes(7)
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: false,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        undefined
      )
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: true,
          haveRealism: false,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        undefined
      )
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: true,
          haveRealism: true,
          haveNoise: false,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        undefined
      )
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: true,
          haveRealism: true,
          haveNoise: true,
          haveDisableLatitude: false,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        undefined
      )
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: true,
          haveRealism: true,
          haveNoise: true,
          haveDisableLatitude: true,
          haveDisableLongitude: false,
          haveDisableAltitude: false,
        },
        undefined
      )
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: true,
          haveRealism: true,
          haveNoise: true,
          haveDisableLatitude: true,
          haveDisableLongitude: true,
          haveDisableAltitude: false,
        },
        undefined
      )
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: true,
          haveRealism: true,
          haveNoise: true,
          haveDisableLatitude: true,
          haveDisableLongitude: true,
          haveDisableAltitude: true,
        },
        undefined
      )
    })
  })

  it('filters scenarios based on checkbox selections options filter checked in last', async () => {
    render(<ScenariosFilters onScenarios={() => {}} />)
    const filtersDiv = screen.getByTestId(ScenariosFiltersTestIds.DIV_FILTERS)
    fireEvent.click(filtersDiv)

    const optionsFilterCheckbox = screen.getByLabelText('Options filter')
    const labelingCheckbox = screen.getByLabelText('Labeling')
    const realismCheckbox = screen.getByLabelText('Realism')
    const noiseCheckbox = screen.getByLabelText('Noise')
    const disableLatitudeCheckbox = screen.getByLabelText('Disable latitude')
    const disableLongitudeCheckbox = screen.getByLabelText('Disable longitude')
    const disableAltitudeCheckbox = screen.getByLabelText('Disable altitude')

    fireEvent.click(labelingCheckbox)
    fireEvent.click(realismCheckbox)
    fireEvent.click(noiseCheckbox)
    fireEvent.click(disableLatitudeCheckbox)
    fireEvent.click(disableLongitudeCheckbox)
    fireEvent.click(disableAltitudeCheckbox)
    fireEvent.click(optionsFilterCheckbox)

    await waitFor(() => {
      expect(client.listUserScenario).toBeCalledTimes(1)
    })

    await waitFor(() => {
      expect(client.listUserScenario).toHaveBeenCalledWith(
        '',
        '',
        '',
        {
          haveLabel: true,
          haveRealism: true,
          haveNoise: true,
          haveDisableLatitude: true,
          haveDisableLongitude: true,
          haveDisableAltitude: true,
        },
        undefined
      )
    })
  })
})
