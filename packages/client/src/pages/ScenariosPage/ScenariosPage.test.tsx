import { render, screen, waitFor } from '@testing-library/react'
import ScenariosPage, { ScenariosPageTestIds } from './ScenariosPage'
import Client from '../../Client'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import { User } from '@smartesting/shared/dist/models/User'
import { mockUseClient } from '../../mocks/mockUseClient'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { CheckBoxTestIds } from '../../components/ui/CheckBox/CheckBox'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

jest.mock(
  '../../components/business/AlterationScenarioEditor/AlterationScenarioEditor',
  () => () => <div />
)
describe('ScenariosPage', () => {
  let scenarioAttributes = {
    text: '',
    options: {
      haveLabel: false,
      haveNoise: false,
      haveRealism: false,
      haveDisableAltitude: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  let scenario1: Scenario = {
    ...scenarioAttributes,
    name: 'Scenario A',
    id: 1,
  }
  let scenario2: Scenario = {
    ...scenarioAttributes,
    name: 'Scenario B',
    id: 2,
  }
  let scenario3: Scenario = {
    ...scenarioAttributes,
    name: 'Scenario C',
    id: 3,
    options: {
      haveLabel: true,
      haveNoise: true,
      haveRealism: true,
      haveDisableAltitude: false,
      haveDisableLongitude: false,
      haveDisableLatitude: false,
    },
  }
  let userAttributes: User = {
    id: 1,
    //firstname: 'Bob',
    //lastname: 'Dupont',
    //email: 'bob.dupont@mail.fr',
    password: 'password',
    //isAdmin: false,
    token: uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  let client: Client

  beforeEach(() => {
    client = new Client()
    mockUseClient(client)
    client.updateScenario = jest.fn()
    jest.spyOn(client, 'listUserScenario').mockReturnValue(
      Promise.resolve({
        error: null,
        scenarios: [scenario1, scenario2, scenario3],
      })
    )
    jest.spyOn(client, 'deleteScenario').mockReturnValue(
      Promise.resolve({
        error: null,
      })
    )
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
  it('renders scenarios correctly', async () => {
    render(
      <BrowserRouter>
        <ScenariosPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Scenario A')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Scenario B')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Scenario C')).toBeInTheDocument()
    })
  })

  it('renders elements correctly', async () => {
    render(
      <BrowserRouter>
        <ScenariosPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(
        screen.getByTestId(ScenariosPageTestIds.DIV_FILTERS)
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(
        screen.getByTestId(ScenariosPageTestIds.INPUT_SEARCH_BAR)
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(
        screen.getByTestId(ScenariosPageTestIds.INPUT_SELECT_SORT)
      ).toBeInTheDocument()
    })
  })

  it('renders filters correctly', async () => {
    render(
      <BrowserRouter>
        <ScenariosPage />
      </BrowserRouter>
    )

    let divFilterElement = screen.getByTestId(ScenariosPageTestIds.DIV_FILTERS)
    await userEvent.click(divFilterElement)

    await waitFor(() => {
      expect(
        screen.getAllByTestId(CheckBoxTestIds.CHECK_BOX_COMPONENT)
      ).toHaveLength(7)
    })

    await waitFor(() => {
      expect(
        screen.getAllByTestId(ScenariosPageTestIds.INPUT_DATE)
      ).toHaveLength(2)
    })
  })

  it('delete scenario', async () => {
    render(
      <BrowserRouter>
        <ScenariosPage />
      </BrowserRouter>
    )
    let scenarioRemoveButtons = await screen.findAllByTestId(
      ScenariosPageTestIds.BUTTON_REMOVE_SCENARIO
    )

    expect(scenarioRemoveButtons).toHaveLength(3)
    await userEvent.click(scenarioRemoveButtons[0])
    expect(client.deleteScenario).toHaveBeenCalledTimes(1)
    expect(client.deleteScenario).toHaveBeenCalledWith(scenario1.id)
  })

  it('redirects to /edit-scenario when click on add scenario button', async () => {
    render(
      <BrowserRouter>
        <ScenariosPage />
      </BrowserRouter>
    )
    let scenarioRemoveButtons = await screen.findAllByTestId(
      ScenariosPageTestIds.BUTTON_ADD_SCENARIO
    )

    expect(scenarioRemoveButtons).toHaveLength(1)
    await userEvent.click(scenarioRemoveButtons[0])
    expect(window.location.pathname).toBe('/edit-scenario')
  })

  it('redirects to /edit-scenario/2 when click on edit button of scenario 2', async () => {
    render(
      <BrowserRouter>
        <ScenariosPage />
      </BrowserRouter>
    )
    let scenarioRemoveButtons = await screen.findAllByTestId(
      ScenariosPageTestIds.BUTTON_EDIT_SCENARIO
    )

    expect(scenarioRemoveButtons).toHaveLength(3)
    await userEvent.click(scenarioRemoveButtons[1])
    expect(window.location.pathname).toBe('/edit-scenario/2')
  })
})
