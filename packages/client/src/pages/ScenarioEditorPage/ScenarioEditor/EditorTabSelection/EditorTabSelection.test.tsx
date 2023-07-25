import React from 'react'
import EditorTabSelection, {
  EditorTabSelectionTestIds,
} from './EditorTabSelection'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ScenariosStorage } from '../../types'

describe('EditorTabSelection', () => {
  beforeEach(() => {
    // Reset local storage before each test to isolate the tests
    localStorage.clear()
  })
  describe('Component rendering', () => {
    describe('Must be in document', () => {
      it('renders tab', async () => {
        render(<EditorTabSelection setSelectedItem={() => {}} />)
        const tab1 = screen.getByText('1')
        expect(tab1).toBeInTheDocument()
      })

      it('add tab', async () => {
        render(<EditorTabSelection setSelectedItem={() => {}} />)
        const addButton = screen.getByTestId(
          EditorTabSelectionTestIds.ADD_BUTTON
        )
        await userEvent.click(addButton)
        const tab2 = screen.getByText('2')
        expect(tab2).toBeInTheDocument()
      })

      it('add 15 tabs is possible', async () => {
        render(<EditorTabSelection setSelectedItem={() => {}} />)
        const addButton = screen.getByTestId(
          EditorTabSelectionTestIds.ADD_BUTTON
        )
        await userEvent.click(addButton)
        const tab2 = screen.getByText('2')
        expect(tab2).toBeInTheDocument()
        for (let i = 3; i <= 15; i++) {
          await userEvent.click(addButton)
        }
        for (let j = 3; j <= 15; j++) {
          expect(
            screen.getByTestId(EditorTabSelectionTestIds.REMOVE_BUTTON + j)
          ).toBeInTheDocument()
        }
      })

      it('remove tab', async () => {
        render(<EditorTabSelection setSelectedItem={() => {}} />)
        const addButton = screen.getByTestId(
          EditorTabSelectionTestIds.ADD_BUTTON
        )
        await userEvent.click(addButton)
        await userEvent.click(addButton)
        expect(
          screen.getByTestId(EditorTabSelectionTestIds.REMOVE_BUTTON + '1')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId(EditorTabSelectionTestIds.REMOVE_BUTTON + '2')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId(EditorTabSelectionTestIds.REMOVE_BUTTON + '3')
        ).toBeInTheDocument()
        // Remove the second tab
        const closeButton = screen.getByTestId(
          EditorTabSelectionTestIds.REMOVE_BUTTON + '2'
        )
        await userEvent.click(closeButton)
        // The second tab should be removed
        expect(
          screen.queryByTestId(EditorTabSelectionTestIds.REMOVE_BUTTON + '3')
        ).not.toBeInTheDocument()
        // Check if remaining tabs are adjusted correctly
        const tab1 = screen.getByText('1')
        const tab2 = screen.getByText('2')
        expect(tab1).toBeInTheDocument()
        expect(tab2).toBeInTheDocument()
        const tab1CloseButton = screen.getByTestId(
          EditorTabSelectionTestIds.REMOVE_BUTTON + '1'
        )
        await userEvent.click(tab1CloseButton)
        expect(tab2).not.toBeInTheDocument()
        // Removing the last tab should not leave the list empty; one tab should remain
        const remainingTab = screen.queryByText('1')
        expect(remainingTab).toBeInTheDocument()
      })
    })

    describe('Must not be in document', () => {
      it('add 16 tabs is not possible', async () => {
        render(<EditorTabSelection setSelectedItem={() => {}} />)
        const addButton = screen.getByTestId(
          EditorTabSelectionTestIds.ADD_BUTTON
        )
        for (let i = 2; i <= 16; i++) {
          await userEvent.click(addButton)
        }
        expect(
          screen.queryByTestId(EditorTabSelectionTestIds.REMOVE_BUTTON + '16')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Callback tests', () => {
    it('select tab', async () => {
      const setSelectedItemMock = jest.fn()
      render(<EditorTabSelection setSelectedItem={setSelectedItemMock} />)

      const addButton = screen.getByTestId(EditorTabSelectionTestIds.ADD_BUTTON)
      await userEvent.click(addButton)

      const tab1 = screen.getByText('1')
      await userEvent.click(tab1)

      // Check if the setSelectedItem function was called with the correct argument
      expect(setSelectedItemMock).toHaveBeenCalledTimes(1)
      expect(setSelectedItemMock).toHaveBeenCalledWith(1)

      // Select a different tab
      const tab2 = screen.getByText('2')
      await userEvent.click(tab2)

      // Check if the setSelectedItem function was called with the correct argument
      expect(setSelectedItemMock).toHaveBeenCalledTimes(2)
      expect(setSelectedItemMock).toHaveBeenCalledWith(2)
    })

    it('remove tab and data in localStorage', async () => {
      render(<EditorTabSelection setSelectedItem={() => {}} />)
      window.localStorage.setItem(
        'scenarios',
        JSON.stringify({ scenarios: ['a', 'b', 'c'] })
      )
      window.localStorage.setItem('lengthEditor', '3')
      window.localStorage.setItem('selectedItem', '1')
      const addButton = screen.getByTestId(EditorTabSelectionTestIds.ADD_BUTTON)
      await userEvent.click(addButton)
      await userEvent.click(addButton)

      const closeButton = screen.getByTestId(
        EditorTabSelectionTestIds.REMOVE_BUTTON + '2'
      )
      await userEvent.click(closeButton)

      let storageAfter: ScenariosStorage = JSON.parse(
        window.localStorage.getItem('scenarios')!
      )
      let values: string[] = storageAfter['scenarios']
      expect(values).toEqual(['a', 'c'])
      expect(window.localStorage.getItem('lengthEditor')).toEqual('2')
      expect(window.localStorage.getItem('selectedItem')).toEqual('2')
    })
  })
})
