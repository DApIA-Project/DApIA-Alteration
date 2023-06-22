import React from 'react'
import { render, screen } from '@testing-library/react'
import DocumentationPage, {
  DocumentationPageTestIds,
} from './DocumentationPage'
import userEvent from '@testing-library/user-event'

jest.mock(
  '../../components/business/FditScenarioEditor/FditScenarioEditor',
  () => () =>
    (
      <div
        className={'view-lines monaco-mouse-cursor-text'}
        role={'code'}
        data-testid={'DocumentationPage.action.setButtonDeletion.showEditor'}
      >
        hide all_planes at 0 seconds
      </div>
    )
)
describe('DocumentationPage', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('displays documentationPage', async () => {
    jest.fn()
    render(<DocumentationPage />)

    const buttonDeletion = screen.getByTestId(
      DocumentationPageTestIds.BUTTON_DELETION
    )

    await userEvent.click(buttonDeletion)

    screen.getByTestId('DocumentationPage.action.setButtonDeletion.showEditor')
  })
})
