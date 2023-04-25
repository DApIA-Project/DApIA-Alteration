import { render, screen } from '@testing-library/react'
import ScenarioEditorPage, {
  ScenarioEditorPageTestIds,
} from './ScenarioEditorPage'

jest.mock('./ScenarioEditor/ScenarioEditor', () => {
  return function MockedScenarioEditor() {
    return <div data-testid='scenario-editor-mock'>Mocked Scenario Editor</div>
  }
})

jest.mock('./ScenarioOutput/ScenarioOutput', () => {
  return function MockedScenarioOutput() {
    return <div data-testid='scenario-output-mock'>Mocked Scenario Output</div>
  }
})
describe('ScenarioEditorPage', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('calls ScenarioEditor and ScenarioOutput', async () => {
    render(<ScenarioEditorPage />)

    screen.getByTestId('scenario-editor-mock')

    screen.getByTestId('scenario-output-mock')
  })
})
