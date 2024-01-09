import React from 'react'
import EditorTabSelection, {
  EditorTabSelectionTestIds,
} from './EditorTabSelection'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OptionsAlteration } from '@smartesting/shared/dist/models'

describe('EditorTabSelection', () => {
  let options: OptionsAlteration = {
    haveLabel: false,
    haveDisableAltitude: false,
    haveDisableLongitude: false,
    haveNoise: false,
    haveRealism: false,
    haveDisableLatitude: false,
  }
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
        scenarios={['hide all_planes at 6 seconds']}
        optionsAlteration={options}
        onEditorUpdate={() => {}}
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
        scenarios={['hide all_planes at 6 seconds']}
        optionsAlteration={options}
        onEditorUpdate={() => {}}
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
        scenarios={['hide all_planes at 6 seconds']}
        optionsAlteration={options}
        onEditorUpdate={() => {}}
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
        scenarios={[
          'hide all_planes at 6 seconds',
          'cut all_planes at 18 seconds',
          'hide all_planes at 652 seconds',
        ]}
        optionsAlteration={options}
        onEditorUpdate={() => {}}
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
        scenarios={[
          'hide all_planes at 60 seconds',
          'hide all_planes at 61 seconds',
          'hide all_planes at 62 seconds',
          'hide all_planes at 63 seconds',
          'hide all_planes at 64 seconds',
          'hide all_planes at 65 seconds',
          'hide all_planes at 66 seconds',
          'hide all_planes at 67 seconds',
          'hide all_planes at 68 seconds',
          'hide all_planes at 69 seconds',
        ]}
        optionsAlteration={options}
        onEditorUpdate={() => {}}
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
        scenarios={[
          'hide all_planes at 6 seconds',
          'hide all_planes at 61 seconds',
          'hide all_planes at 62 seconds',
          'hide all_planes at 63 seconds',
        ]}
        optionsAlteration={options}
        onEditorUpdate={() => {}}
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
