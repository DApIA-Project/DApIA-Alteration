import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ScenarioEditor, { ScenarioEditorTestIds } from './ScenarioEditor'
import userEvent from '@testing-library/user-event'
import {
  OptionsAlteration,
  OptionsAlterationName,
  Recording,
} from '@smartesting/shared/src'
import { RecordInputFilesTestIds } from './RecordInputFiles/RecordInputFiles'
import { GenerateAlterationButtonTestIds } from './GenerateAlterationButton/GenerateAlterationButton'
import * as getMonacoEditorContentModule from '../../../utils/getMonacoEditorContent/getMonacoEditorContent'
import {
  ListScenarioError,
  ListScenarioResponse,
} from '@smartesting/shared/dist/responses/listScenario'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import { ScenarioListTestIds } from './ScenarioList/ScenarioList'
import { EditorTabTestIds } from './EditorTabList/EditorTab/EditorTab'
import EditorTabList, {
  EditorTabListTestIds,
} from './EditorTabList/EditorTabList'

jest.mock('../../../Client')
//jest.mock('./ScenarioList/ScenarioList')
jest.mock(
  '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor',
  () => () => <div />
)

describe('ScenarioEditor', () => {
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
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls onGenerate callback if generate button is clicked with scenario content', async () => {
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

    let recording: Recording = {
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      name: 'myfile.sbs',
    }
    let optionsAlteration: OptionsAlteration = {
      haveLabel: false,
      haveRealism: false,
      haveNoise: false,
      haveDisableLatitude: false,
      haveDisableLongitude: false,
      haveDisableAltitude: false,
    }

    await waitFor(() => {
      expect(spiedCallback).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(spiedCallback).toBeCalledWith({
        scenario: 'hide all_planes at 0 seconds',
        recording,
        optionsAlteration,
      })
    })
  })

  it('calls onGenerate callback if generate button is clicked with scenario content and labeling and realism', async () => {
    render(<ScenarioEditor onGenerate={spiedCallback} />)

    fireEvent.change(
      screen.getByTestId(RecordInputFilesTestIds.INPUT_FILE_RECORDING),
      {
        target: { files: fileList },
      }
    )

    await screen.findByTestId(RecordInputFilesTestIds.RECORDING_IS_PRESENT)
    const checkboxs = screen.getAllByRole('checkbox')
    checkboxs.forEach((checkbox) => {
      userEvent.click(checkbox)
    })

    await userEvent.click(
      screen.getByTestId(GenerateAlterationButtonTestIds.COMPONENT)
    )

    let recording: Recording = {
      content:
        'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,',
      name: 'myfile.sbs',
    }
    let optionsAlteration: OptionsAlteration = {
      haveLabel: true,
      haveRealism: true,
      haveNoise: true,
      haveDisableLatitude: true,
      haveDisableLongitude: true,
      haveDisableAltitude: true,
    }

    await waitFor(() => {
      expect(spiedCallback).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(spiedCallback).toBeCalledWith({
        scenario: 'hide all_planes at 0 seconds',
        recording,
        optionsAlteration,
      })
    })
  })

  it('show scenario list', async () => {
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
      id: '1',
      create_at: new Date(),
      update_at: new Date(),
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
      id: '2',
      create_at: new Date(),
      update_at: new Date(),
    }

    let listScenario: Scenario[] = []
    listScenario.push(scenarioA)
    listScenario.push(scenarioB)
    const mockScenarios: ListScenarioResponse = {
      scenarios: listScenario,
      error: null,
    }

    require('../../../Client').default.listScenario.mockResolvedValue(
      mockScenarios
    )

    render(<ScenarioEditor onGenerate={spiedCallback} />)
    await waitFor(async () => {
      const scenarioButtons = await screen.findAllByTestId(
        ScenarioListTestIds.BUTTON
      )
      expect(scenarioButtons).toHaveLength(mockScenarios.scenarios!.length)
    })
  })

  it('remove one tab middle', async () => {
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
      id: '1',
      create_at: new Date(),
      update_at: new Date(),
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
      id: '2',
      create_at: new Date(),
      update_at: new Date(),
    }
    let scenarioC: Scenario = {
      name: 'Scenario 3',
      text: 'Texte du scenario 3',
      options: {
        haveLabel: false,
        haveNoise: false,
        haveRealism: false,
        haveDisableAltitude: false,
        haveDisableLatitude: false,
        haveDisableLongitude: false,
      },
      id: '3',
      create_at: new Date(),
      update_at: new Date(),
    }

    let listScenario: Scenario[] = []
    listScenario.push(scenarioA)
    listScenario.push(scenarioB)
    const mockScenarios: ListScenarioResponse = {
      scenarios: listScenario,
      error: null,
    }

    require('../../../Client').default.listScenario.mockResolvedValue(
      mockScenarios
    )

    render(<ScenarioEditor onGenerate={spiedCallback} />)

    await userEvent.click(screen.getByTestId(EditorTabListTestIds.ADD_BUTTON))
    await userEvent.click(screen.getByTestId(EditorTabTestIds.DIV_TAB + '-0'))

    await userEvent.type(screen.getByRole('input'), scenarioA.name)

    await userEvent.click(screen.getByTestId(EditorTabListTestIds.ADD_BUTTON))
    await userEvent.click(screen.getByTestId(EditorTabTestIds.DIV_TAB + '-1'))

    await userEvent.type(screen.getByRole('input'), scenarioB.name)
    await userEvent.click(screen.getByTestId(EditorTabListTestIds.ADD_BUTTON))
    await userEvent.click(screen.getByTestId(EditorTabTestIds.DIV_TAB + '-2'))

    await userEvent.type(screen.getByRole('input'), scenarioC.name)
  })
  /*
  it('click on scenario on scenario list', async () => {
    let scenarioA : Scenario = { name: 'Scenario 1', text: 'Texte du scenario 1', options : { haveLabel : false, haveNoise : false, haveRealism : false, haveDisableAltitude : false, haveDisableLatitude : false, haveDisableLongitude : false}, id : '1', create_at : new Date(), update_at : new Date()}
    let scenarioB : Scenario = { name: 'Scenario 2', text: 'Texte du scenario 2', options : { haveLabel : false, haveNoise : false, haveRealism : false, haveDisableAltitude : false, haveDisableLatitude : false, haveDisableLongitude : false}, id : '2' , create_at : new Date(), update_at : new Date()}

    let listScenario : Scenario[] = []
    listScenario.push(scenarioA)
    listScenario.push(scenarioB)
    const mockScenarios : ListScenarioResponse = {scenarios : listScenario,error : null}
    const mockOnClick = () => {}
    require('../../../Client').default.listScenario.mockResolvedValue(mockScenarios)
    require('./ScenarioList/ScenarioList.tsx').default.listScenario.mockResolvedValue(mockOnClick)

    render(<ScenarioEditor onGenerate={spiedCallback} />);
    await waitFor(async() => {
      const scenarioButtons = await screen.findAllByTestId(ScenarioListTestIds.BUTTON);
      await userEvent.click(scenarioButtons[0]);

    });

    expect(mockOnClick).toHaveBeenCalledWith(mockScenarios.scenarios![0].text);
    await waitFor(async() => {
      const scenarioButtons = await screen.findAllByTestId(ScenarioListTestIds.BUTTON);
      await userEvent.click(scenarioButtons[1]);

    });

    expect(mockOnClick).toHaveBeenCalledWith(mockScenarios.scenarios![1].text);
  });

 */
})
