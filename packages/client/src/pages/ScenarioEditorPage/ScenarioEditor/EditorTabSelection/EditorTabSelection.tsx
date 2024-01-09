import React, { useState } from 'react'
import './EditorTabSelection.css'
import Button from '../../../../components/ui/Button/Button'
import Client from '../../../../Client'
import { unstable_batchedUpdates } from 'react-dom'
import { OptionsAlteration } from '@smartesting/shared/dist/models'

export enum EditorTabSelectionTestIds {
  ADD_BUTTON = 'AddTabButton',
  REMOVE_BUTTON = 'RemoveTabButton',
  DIV_TAB = 'DivTab',
}

type EditorTabSelectionProps = {
  scenarios: string[]
  selected: number
  optionsAlteration: OptionsAlteration
  onSelect: (index: number) => void
  onRemove: (index: number) => void
  onAdd: () => void
  onEditorUpdate: () => void
}

const EditorTabSelection: React.FunctionComponent<EditorTabSelectionProps> = ({
  onSelect,
  onRemove,
  onAdd,
  onEditorUpdate,
  scenarios,
  selected,
  optionsAlteration,
}) => {
  const tabsLength: number = scenarios.length === 0 ? 1 : scenarios.length
  const [tabs, setTabs] = useState(() =>
    Array.from({ length: tabsLength }, (_, index) => `New scenario`)
  )

  const [editableText, setEditableText] = useState<string>(tabs[selected])
  const [isUpdateName, setIsUpdateName] = useState<boolean>(false)

  function onSaveScenario(scenarioName: string) {
    Client.createScenario(
      scenarioName,
      scenarios[selected],
      optionsAlteration
    ).then((response) => {
      unstable_batchedUpdates(() => {
        console.log(response)
      })
    })
  }

  const handleTabClick = (index: number) => {
    if (selected === index) {
      setIsUpdateName(true)
    } else {
      onSelect(index)
      setEditableText(tabs[index])
      setIsUpdateName(false)
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableText(event.target.value)
  }

  const handleTextBlur = (index: number) => {
    setIsUpdateName(false)
    onSaveScenario(editableText)
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs]
      newTabs[index] = editableText
      return newTabs
    })
    onEditorUpdate()
  }

  const removeTabAtIndex = (indexToRemove: number) => {
    setTabs((prevTabs) => {
      return [
        ...prevTabs.slice(0, indexToRemove),
        ...prevTabs.slice(indexToRemove + 1),
      ]
    })
  }

  const addTab = () => {
    setTabs((prevTabs) => {
      return [...prevTabs, 'New scenario']
    })
  }

  const handleAdd = () => {
    setEditableText('New scenario')
    addTab()
    onAdd()
  }

  const handleTabClose = (index: number) => {
    removeTabAtIndex(index)
    if (index !== 0) {
      setEditableText(tabs[index - 1])
    }

    onRemove(index)
  }

  const handleTabClickMol = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.button === 1 && tabsLength > 1) {
      handleTabClose(index)
    }
  }

  return (
    <>
      <ul className='tabList'>
        {tabs.map((_, index) => (
          <li
            key={index}
            className={`li ${index === selected ? 'selected' : ''}`}
          >
            <div
              data-testid={`${EditorTabSelectionTestIds.DIV_TAB}-${index}`}
              onClick={(event) => handleTabClick(index)}
              onAuxClick={(event) => handleTabClickMol(index, event)}
              role='button'
              className={`tab ${index === selected ? 'selected' : ''}`}
            >
              {editableText !== null && selected === index && isUpdateName ? (
                <input
                  autoFocus={true}
                  type='text'
                  value={editableText}
                  onChange={handleTextChange}
                  onBlur={() => handleTextBlur(index)}
                  className={`input ${index === selected ? 'selected' : ''}`}
                />
              ) : (
                tabs[index]
              )}
            </div>
            {tabs.length > 1 && (
              <Button
                data-testid={`${EditorTabSelectionTestIds.REMOVE_BUTTON}-${index}`}
                text={'x'}
                onClick={() => handleTabClose(index)}
                className={'tabCloseButton'}
              />
            )}
          </li>
        ))}
      </ul>
      <div className='addTabContainerButton'>
        <Button
          data-testid={EditorTabSelectionTestIds.ADD_BUTTON}
          text={'+'}
          onClick={() => handleAdd()}
          className={'addTabButton'}
          disabled={tabsLength >= 10}
        />
      </div>
    </>
  )
}

export default EditorTabSelection
