import React from 'react'
import EditorTabSelection, {
  EditorTabSelectionTestIds,
} from './EditorTabSelection'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('EditorTabSelection', () => {
  beforeEach(() => {
    // Reset local storage before each test to isolate the tests
    localStorage.clear()
  })

  it('renders tab', async () => {
    render(
      <EditorTabSelection
        onSelect={() => {}}
        onAdd={() => {}}
        onRemove={() => {}}
        selected={0}
        tabsLength={1}
      />
    )
    const tab1 = screen.getByText('New scenario')
    expect(tab1).toBeInTheDocument()
  })

  it('add tab', async () => {
    const onAddItemMock = jest.fn()
    render(
      <EditorTabSelection
        onSelect={() => {}}
        onAdd={onAddItemMock}
        onRemove={() => {}}
        selected={0}
        tabsLength={1}
      />
    )
    const addButton = screen.getByTestId(EditorTabSelectionTestIds.ADD_BUTTON)
    await userEvent.click(addButton)
    expect(onAddItemMock).toBeCalledTimes(1)
  })

  it('add 10 tabs is possible', async () => {
    const onAddItemMock = jest.fn()
    render(
      <EditorTabSelection
        onSelect={() => {}}
        onAdd={onAddItemMock}
        onRemove={() => {}}
        selected={0}
        tabsLength={1}
      />
    )
    const addButton = screen.getByTestId(EditorTabSelectionTestIds.ADD_BUTTON)
    for (let i = 2; i <= 10; i++) {
      await userEvent.click(addButton)
    }
    expect(onAddItemMock).toBeCalledTimes(9)
  })

  it('remove tab', async () => {
    const onRemoveItemMock = jest.fn()
    render(
      <EditorTabSelection
        onSelect={() => {}}
        onAdd={() => {}}
        onRemove={onRemoveItemMock}
        selected={0}
        tabsLength={3}
      />
    )

    // Remove the second tab
    const closeButton2 = screen.getByTestId(
      EditorTabSelectionTestIds.REMOVE_BUTTON + '-2'
    )
    await userEvent.click(closeButton2)
    expect(onRemoveItemMock).toBeCalledWith(2)
    const closeButton = screen.getByTestId(
      EditorTabSelectionTestIds.REMOVE_BUTTON + '-1'
    )
    await userEvent.click(closeButton)
    expect(onRemoveItemMock).toBeCalledTimes(2)
    expect(onRemoveItemMock).lastCalledWith(1)
  })

  it('add 11 tabs is not possible', async () => {
    const onAddItemMock = jest.fn()
    render(
      <EditorTabSelection
        onSelect={() => {}}
        onAdd={onAddItemMock}
        onRemove={() => {}}
        selected={0}
        tabsLength={10}
      />
    )
    const addButton = screen.getByTestId(EditorTabSelectionTestIds.ADD_BUTTON)

    await userEvent.click(addButton)

    expect(onAddItemMock).toBeCalledTimes(0)
    expect(onAddItemMock).not.toBeCalledTimes(1)
  })

  it('select tab', async () => {
    const setSelectedItemMock = jest.fn()
    render(
      <EditorTabSelection
        onSelect={setSelectedItemMock}
        onAdd={() => {}}
        onRemove={() => {}}
        selected={0}
        tabsLength={4}
      />
    )

    const tab3 = await screen.findAllByTestId(
      EditorTabSelectionTestIds.DIV_TAB + '-2'
    )
    await userEvent.click(tab3[0])

    // Check if the setSelectedItem function was called with the correct argument
    expect(setSelectedItemMock).toHaveBeenCalledTimes(1)
    expect(setSelectedItemMock).toHaveBeenCalledWith(2)

    // Select a different tab
    const tab2 = await screen.findAllByTestId(
      EditorTabSelectionTestIds.DIV_TAB + '-1'
    )
    await userEvent.click(tab2[0])

    // Check if the setSelectedItem function was called with the correct argument
    expect(setSelectedItemMock).toHaveBeenCalledTimes(2)
    expect(setSelectedItemMock).toHaveBeenCalledWith(1)
  })
})
