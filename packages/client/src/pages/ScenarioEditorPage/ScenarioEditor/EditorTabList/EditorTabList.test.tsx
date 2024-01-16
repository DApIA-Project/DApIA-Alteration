import React from 'react'
import EditorTabList, { EditorTabListTestIds } from './EditorTabList'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OptionsAlteration } from '@smartesting/shared/dist/models'
import { EditorTabTestIds } from './EditorTab/EditorTab'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'

describe('EditorTabList', () => {
  let options: OptionsAlteration = {
    haveLabel: false,
    haveDisableAltitude: false,
    haveDisableLongitude: false,
    haveNoise: false,
    haveRealism: false,
    haveDisableLatitude: false,
  }
  let scenario: Scenario = {
    id: 'id1',
    name: 'New scenario',
    text: 'hide all_planes at 6 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario2: Scenario = {
    id: 'id2',
    name: 'New scenario A',
    text: 'cut all_planes at 6 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario3: Scenario = {
    id: 'id3',
    name: 'New scenario B',
    text: 'alter all_planes at 6 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario4: Scenario = {
    id: 'id4',
    name: 'New scenario C',
    text: 'alter all_planes at 7 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario5: Scenario = {
    id: 'id5',
    name: 'New scenario D',
    text: 'alter all_planes at 8 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario6: Scenario = {
    id: 'id6',
    name: 'New scenario E',
    text: 'alter all_planes at 9 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario7: Scenario = {
    id: 'id7',
    name: 'New scenario F',
    text: 'alter all_planes at 19 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario8: Scenario = {
    id: 'id8',
    name: 'New scenario G',
    text: 'alter all_planes at 20 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario9: Scenario = {
    id: 'id9',
    name: 'New scenario H',
    text: 'alter all_planes at 21 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }
  let scenario10: Scenario = {
    id: 'id10',
    name: 'New scenario I',
    text: 'alter all_planes at 22 seconds',
    options: options,
    update_at: new Date(),
    create_at: new Date(),
  }

  beforeEach(() => {
    // Reset local storage before each test to isolate the tests
    localStorage.clear()
  })

  it('renders tab', async () => {
    render(
      <EditorTabList
        onSelect={() => {}}
        onAdd={() => {}}
        onClose={() => {}}
        selected={0}
        tabs={[scenario]}
        onChange={() => {}}
      />
    )
    const tab1 = screen.getByText('New scenario')
    expect(tab1).toBeInTheDocument()
  })

  it('add tab', async () => {
    const onAddItemMock = jest.fn()
    render(
      <EditorTabList
        onSelect={() => {}}
        onAdd={onAddItemMock}
        onClose={() => {}}
        selected={0}
        tabs={[scenario]}
        onChange={() => {}}
      />
    )
    const addButton = screen.getByTestId(EditorTabListTestIds.ADD_BUTTON)
    await userEvent.click(addButton)
    expect(onAddItemMock).toBeCalledTimes(1)
  })

  it('add 10 tabs is possible', async () => {
    const onAddItemMock = jest.fn()
    render(
      <EditorTabList
        onSelect={() => {}}
        onAdd={onAddItemMock}
        onClose={() => {}}
        selected={0}
        tabs={[scenario]}
        onChange={() => {}}
      />
    )
    const addButton = screen.getByTestId(EditorTabListTestIds.ADD_BUTTON)
    for (let i = 2; i <= 10; i++) {
      await userEvent.click(addButton)
    }
    expect(onAddItemMock).toBeCalledTimes(9)
  })

  it('remove tab', async () => {
    const onRemoveItemMock = jest.fn()
    render(
      <EditorTabList
        onSelect={() => {}}
        onAdd={() => {}}
        onClose={onRemoveItemMock}
        selected={0}
        tabs={[scenario, scenario2, scenario3]}
        onChange={() => {}}
      />
    )

    const tabs = await screen.findAllByTestId(EditorTabTestIds.REMOVE_BUTTON)
    // Remove the second tab

    await userEvent.click(tabs[2])
    expect(onRemoveItemMock).toBeCalledWith(2)

    await userEvent.click(tabs[1])
    expect(onRemoveItemMock).toBeCalledTimes(2)
    expect(onRemoveItemMock).lastCalledWith(1)
  })

  it('remove tab middle', async () => {
    const onRemoveItemMock = jest.fn()
    render(
      <EditorTabList
        onSelect={() => {}}
        onAdd={() => {}}
        onClose={onRemoveItemMock}
        selected={0}
        tabs={[scenario, scenario2, scenario3]}
        onChange={() => {}}
      />
    )

    // Remove the second tab
    const tabs = await screen.findAllByTestId(EditorTabTestIds.REMOVE_BUTTON)
    await userEvent.click(tabs[1])
    expect(onRemoveItemMock).toBeCalledWith(1)
  })

  it('remove tab when tab is alone is not possible', async () => {
    const onRemoveItemMock = jest.fn()
    render(
      <EditorTabList
        onSelect={() => {}}
        onAdd={() => {}}
        onClose={onRemoveItemMock}
        selected={0}
        tabs={[scenario]}
        onChange={() => {}}
      />
    )

    // Remove the second tab
    let removeButtons = screen.queryAllByTestId(EditorTabTestIds.REMOVE_BUTTON)
    expect(removeButtons).toHaveLength(0)
  })

  it('add 11 tabs is not possible', async () => {
    const onAddItemMock = jest.fn()
    render(
      <EditorTabList
        onSelect={() => {}}
        onAdd={onAddItemMock}
        onClose={() => {}}
        selected={0}
        tabs={[
          scenario,
          scenario2,
          scenario3,
          scenario4,
          scenario5,
          scenario6,
          scenario7,
          scenario8,
          scenario9,
          scenario10,
        ]}
        onChange={() => {}}
      />
    )
    const addButton = screen.getByTestId(EditorTabListTestIds.ADD_BUTTON)

    await userEvent.click(addButton)

    expect(onAddItemMock).toBeCalledTimes(0)
    expect(onAddItemMock).not.toBeCalledTimes(1)
  })

  it('select tab', async () => {
    const setSelectedItemMock = jest.fn()
    render(
      <EditorTabList
        onSelect={setSelectedItemMock}
        onAdd={() => {}}
        onClose={() => {}}
        selected={0}
        tabs={[scenario, scenario2, scenario3, scenario4]}
        onChange={() => {}}
      />
    )

    let tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    await userEvent.click(tabs[2])

    // Check if the setSelectedItem function was called with the correct argument
    expect(setSelectedItemMock).toHaveBeenCalledTimes(1)
    expect(setSelectedItemMock).toHaveBeenCalledWith(2)

    // Select a different tab
    tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    await userEvent.click(tabs[1])

    // Check if the setSelectedItem function was called with the correct argument
    expect(setSelectedItemMock).toHaveBeenCalledTimes(2)
    expect(setSelectedItemMock).toHaveBeenCalledWith(1)
  })
})
