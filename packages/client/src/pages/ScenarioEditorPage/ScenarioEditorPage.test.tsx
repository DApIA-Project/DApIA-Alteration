import { render, screen } from '@testing-library/react'
import ScenarioEditorPage, {
  ScenarioEditorPageTestIds,
} from './ScenarioEditorPage'

describe('ScenarioEditorPage', () => {
  it('calls ScenarioEditor and ScenarioOutput', async () => {
    render(<ScenarioEditorPage />)

    screen.getByTestId(ScenarioEditorPageTestIds.SCENARIO_EDITOR)

    screen.getByTestId(ScenarioEditorPageTestIds.SCENARIO_OUTPUT)
  })
})
