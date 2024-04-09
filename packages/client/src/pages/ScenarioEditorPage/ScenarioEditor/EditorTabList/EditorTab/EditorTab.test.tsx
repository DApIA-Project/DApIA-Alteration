import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import { render, screen } from '@testing-library/react'
import EditorTabList from '../EditorTabList'
import React from 'react'
import EditorTab, { EditorTabTestIds } from './EditorTab'
import userEvent from '@testing-library/user-event'
describe('EditorTab', () => {
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

  it('renders tab', async () => {
    render(
      <EditorTab
        index={0}
        tabName={'New scenario'}
        isSelected={false}
        closable={false}
        onClose={() => {}}
        onSelect={() => {}}
        onChange={() => {}}
      />
    )
    const tab = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tab).toHaveLength(1)
    expect(tab[0]).toHaveTextContent('New scenario')
  })

  it('renders tab closable', async () => {
    render(
      <EditorTab
        index={0}
        tabName={'New scenario'}
        isSelected={false}
        closable={true}
        onClose={() => {}}
        onSelect={() => {}}
        onChange={() => {}}
      />
    )
    const removeButtons = await screen.findAllByTestId(
      EditorTabTestIds.REMOVE_BUTTON
    )
    expect(removeButtons).toHaveLength(1)
  })

  it('renders tab is Selected', async () => {
    render(
      <EditorTab
        index={0}
        tabName={'New scenario'}
        isSelected={true}
        closable={false}
        onClose={() => {}}
        onSelect={() => {}}
        onChange={() => {}}
      />
    )
    const tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs[0]).toHaveClass('selected')
  })

  it('renders tab is not Selected', async () => {
    render(
      <EditorTab
        index={0}
        tabName={'New scenario'}
        isSelected={false}
        closable={false}
        onClose={() => {}}
        onSelect={() => {}}
        onChange={() => {}}
      />
    )
    const tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    expect(tabs[0]).not.toHaveClass('selected')
  })

  it('select the div tab', async () => {
    const onSelectItemMock = jest.fn()
    render(
      <EditorTab
        index={0}
        tabName={'New scenario'}
        isSelected={false}
        closable={false}
        onClose={() => {}}
        onSelect={onSelectItemMock}
        onChange={() => {}}
      />
    )

    const tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    await userEvent.click(tabs[0])

    expect(onSelectItemMock).toHaveBeenCalledTimes(1)
    expect(onSelectItemMock).toHaveBeenCalledWith(0)
  })

  it('close the div tab', async () => {
    const onCloseItemMock = jest.fn()
    render(
      <EditorTab
        index={0}
        tabName={'New scenario'}
        isSelected={false}
        closable={true}
        onClose={onCloseItemMock}
        onSelect={() => {}}
        onChange={() => {}}
      />
    )

    const removeButtons = await screen.findAllByTestId(
      EditorTabTestIds.REMOVE_BUTTON
    )
    await userEvent.click(removeButtons[0])

    expect(onCloseItemMock).toHaveBeenCalledTimes(1)
    expect(onCloseItemMock).toHaveBeenCalledWith(0)
  })

  it('change the div tab name', async () => {
    const onChangeItemMock = jest.fn()
    render(
      <EditorTab
        index={0}
        tabName={'New scenario'}
        isSelected={true}
        closable={false}
        onClose={() => {}}
        onSelect={() => {}}
        onChange={onChangeItemMock}
      />
    )

    const tabs = await screen.findAllByTestId(EditorTabTestIds.DIV_TAB)
    await userEvent.click(tabs[0])

    const input = await screen.findAllByTestId(EditorTabTestIds.INPUT_NAME)
    await userEvent.clear(input[0])
    await userEvent.type(input[0], 'Scenario A')
    await userEvent.click(tabs[0])
    expect(onChangeItemMock).toHaveBeenCalledTimes(1)
    expect(onChangeItemMock).toHaveBeenCalledWith('Scenario A')
  })
})
