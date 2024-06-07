import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ScenarioEditor, { ScenarioEditorTestIds } from './ScenarioEditor'
import userEvent from '@testing-library/user-event'
import {
  FileFormat,
  OptionsAlteration,
  Recording,
} from '@smartesting/shared/dist'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import { RecordInputFilesTestIds } from './RecordInputFiles/RecordInputFiles'
import { GenerateAlterationButtonTestIds } from './GenerateAlterationButton/GenerateAlterationButton'
import * as getMonacoEditorContentModule from '../../../utils/getMonacoEditorContent/getMonacoEditorContent'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import { ScenarioListTestIds } from './ScenarioList/ScenarioList'
import { EditorTabTestIds } from './EditorTabList/EditorTab/EditorTab'
import { EditorTabListTestIds } from './EditorTabList/EditorTabList'
import Client from '../../../Client'
import { mockUseClient } from '../../../mocks/mockUseClient'

jest.mock(
  '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor',
  () => () => <div />
)

describe('ScenarioEditor', () => {
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
  }
  let client: Client
  let spiedCallback: jest.Mock
  const files = [
    new File(
      [
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      ],
      'myfile.sbs',
      {
        type: 'text/plain',
      }
    ),
  ]

  const fileList = {
    files,
    length: files.length,
    item: (index: number) => files[index],
  }
  beforeEach(() => {
    jest
      .spyOn(getMonacoEditorContentModule, 'getMonacoEditorContent')
      .mockReturnValue('hide all_planes at 0 seconds')
    spiedCallback = jest.fn()
    client = new Client()
    mockUseClient(client)
    client.updateScenario = jest.fn()
    jest.spyOn(client, 'listUserScenario').mockReturnValue(
      Promise.resolve({
        error: null,
        scenarios: [scenario1, scenario2, scenario3],
      })
    )
    jest.spyOn(client, 'createScenario').mockReturnValue(
      Promise.resolve({
        error: null,
        scenario: scenario1,
      })
    )
    jest.spyOn(client, 'updateScenario').mockReturnValue(
      Promise.resolve({
        error: null,
        scenario: scenario1,
      })
    )
    jest.spyOn(client, 'deleteScenario').mockReturnValue(
      Promise.resolve({
        error: null,
      })
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays scenarios returned by client', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )
    expect(scenarioButtons).toHaveLength(3)
    expect(scenarioButtons[0]).toHaveTextContent(scenario1.name)
    expect(scenarioButtons[1]).toHaveTextContent(scenario2.name)
    expect(scenarioButtons[2]).toHaveTextContent(scenario3.name)
    expect(client.listUserScenario).toHaveBeenCalledTimes(1)
  })

  it('opens scenarios in tab', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )

    await userEvent.click(scenarioButtons[2])

    let tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(1)
    expect(tabs[0]).toHaveTextContent(scenario3.name)

    await userEvent.click(scenarioButtons[0])

    tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(2)
    expect(tabs[0]).toHaveTextContent(scenario3.name)
    expect(tabs[1]).toHaveTextContent(scenario1.name)
  })

  it('does not open scenario tab twice', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )

    await userEvent.click(scenarioButtons[2])
    await userEvent.click(scenarioButtons[2])

    let tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(1)
    expect(tabs[0]).toHaveTextContent(scenario3.name)
  })

  it('removes scenario from tabs', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )

    await userEvent.click(scenarioButtons[0])
    await userEvent.click(scenarioButtons[1])
    await userEvent.click(scenarioButtons[2])

    const removeButtons = await screen.findAllByTestId(
      EditorTabTestIds.REMOVE_BUTTON
    )
    expect(removeButtons).toHaveLength(3)
    await userEvent.click(removeButtons[1])

    const tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(2)
    expect(tabs[0]).toHaveTextContent(scenario1.name)
    expect(tabs[1]).toHaveTextContent(scenario3.name)
  })

  it('rename scenario from tabs', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )

    await userEvent.click(scenarioButtons[0])
    await userEvent.click(scenarioButtons[1])
    await userEvent.click(scenarioButtons[2])

    let tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(3)

    await userEvent.click(tabs[2])

    const input1 = await screen.findByTestId(EditorTabTestIds.INPUT_NAME)
    expect(input1).toHaveValue(scenario3.name)

    await userEvent.clear(input1)
    await userEvent.type(input1, 'Scenario A')
    await userEvent.click(tabs[1])

    expect(client.updateScenario).toHaveBeenCalledTimes(1)
    expect(client.updateScenario).toHaveBeenCalledWith(
      scenario3.id,
      scenario1.name,
      scenario3.text,
      scenario3.options
    )
    tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs[0]).toHaveTextContent('Scenario A')
  })

  it('create scenario', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const addButton = await screen.findByTestId(EditorTabListTestIds.ADD_BUTTON)

    await userEvent.click(addButton)
    expect(client.createScenario).toHaveBeenCalledWith('New scenario', '', {
      haveLabel: false,
      haveNoise: false,
      haveRealism: false,
      haveDisableAltitude: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
    })
    let tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(1)
    expect(tabs[0]).toHaveTextContent('Scenario A')
    await userEvent.click(addButton)
    expect(client.createScenario).toHaveBeenCalledWith('New scenario', '', {
      haveLabel: false,
      haveNoise: false,
      haveRealism: false,
      haveDisableAltitude: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
    })
    await userEvent.click(addButton)
    expect(client.createScenario).toHaveBeenCalledWith('New scenario', '', {
      haveLabel: false,
      haveNoise: false,
      haveRealism: false,
      haveDisableAltitude: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
    })

    tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(3)
    expect(tabs[0]).toHaveTextContent('Scenario A')
    expect(tabs[1]).toHaveTextContent('Scenario A')
    expect(tabs[2]).toHaveTextContent('Scenario A')

    expect(client.createScenario).toHaveBeenCalledTimes(3)
  })

  it('delete scenario saved', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    let scenarioRemoveButtons = await screen.findAllByTestId(
      ScenarioListTestIds.REMOVE_BUTTON
    )

    expect(scenarioRemoveButtons).toHaveLength(3)
    await userEvent.click(scenarioRemoveButtons[0])
    expect(client.deleteScenario).toHaveBeenCalledTimes(1)
    expect(client.deleteScenario).toHaveBeenCalledWith(scenario1.id)
  })

  it('delete scenario saved and opened', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const scenarioButtons = await screen.findAllByTestId(
      ScenarioListTestIds.BUTTON
    )
    await userEvent.click(scenarioButtons[0])
    let tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(1)

    const scenarioRemoveButtons = await screen.findAllByTestId(
      ScenarioListTestIds.REMOVE_BUTTON
    )
    expect(scenarioRemoveButtons).toHaveLength(3)
    await userEvent.click(scenarioRemoveButtons[0])

    tabs = screen.queryAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(0)

    expect(client.deleteScenario).toHaveBeenCalledTimes(1)
    expect(client.deleteScenario).toHaveBeenCalledWith(scenario1.id)
  })

  it('create more than 10 scenarios', async () => {
    render(<ScenarioEditor onGenerate={() => null} />)
    const addButton = await screen.findByTestId(EditorTabListTestIds.ADD_BUTTON)

    for (let i: number = 0; i < 10; i++) {
      await userEvent.click(addButton)
    }

    let tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs).toHaveLength(10)

    for (let i: number = 0; i < 10; i++) {
      expect(tabs[i]).toHaveTextContent('Scenario A')
    }
    await userEvent.click(addButton)
    expect(tabs).toHaveLength(10)

    expect(client.createScenario).toHaveBeenCalledTimes(10)
  })

  it('calls onGenerate callback if generate button is clicked with no scenario', async () => {
    render(<ScenarioEditor onGenerate={spiedCallback} />)

    fireEvent.change(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING),
      {
        target: { files: fileList },
      }
    )

    await screen.findByTestId(RecordInputFilesTestIds.RECORDING_IS_PRESENT)

    await userEvent.click(
      screen.getByTestId(GenerateAlterationButtonTestIds.COMPONENT)
    )

    await waitFor(() => {
      expect(spiedCallback).toBeCalledTimes(0)
    })
  })
})
