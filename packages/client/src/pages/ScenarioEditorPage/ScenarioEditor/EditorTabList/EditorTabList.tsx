import React, { useState } from 'react'
import './EditorTabList.css'
import Button from '../../../../components/ui/Button/Button'
import EditorTab from './EditorTab/EditorTab'

export enum EditorTabListTestIds {
  ADD_BUTTON = 'AddTabButton',
}

type EditorTabListProps = {
  tabs: string[]
  selected: number
  onAdd: () => void
  onClose: (index: number) => void
  onChange: (index: number, name: string) => void
  onSelect: (index: number) => void
}

const EditorTabList: React.FunctionComponent<EditorTabListProps> = ({
  onSelect,
  onAdd,
  onChange,
  onClose,
  tabs,
  selected,
}) => {
  const [names, setNames] = useState<string[]>(tabs)

  /*function onSaveScenario(scenarioName: string) {
    Client.createScenario(
      scenarioName,
      scenarios[selected],
      optionsAlteration
    ).then((response) => {
      unstable_batchedUpdates(() => {
        console.log(response)
      })
    })
  }*/

  const removeTabAtIndex = (indexToRemove: number) => {
    setNames((prevTabs) => {
      return [
        ...prevTabs.slice(0, indexToRemove),
        ...prevTabs.slice(indexToRemove + 1),
      ]
    })
  }

  const addTab = () => {
    setNames((prevTabs) => {
      return [...prevTabs, 'New scenario']
    })
  }

  const handleAdd = () => {
    addTab()
    onAdd()
  }

  const handleSelect = (index: number) => {
    if (index !== selected) {
      onSelect(index)
    }
  }

  function handleChange(index: number, value: string) {
    //onSaveScenario(editableText)
    /*setNames((prevTabs) => {
      const newTabs = [...prevTabs]
      newTabs[index] = editableText
      return newTabs
    })*/
    onChange(index, value)
  }

  const handleTabClose = (index: number) => {
    removeTabAtIndex(index)
    onClose(index)
  }

  return (
    <>
      <ul className='tabList'>
        {tabs.map((name, index) => (
          <EditorTab
            tabName={name}
            index={index}
            isSelected={selected === index}
            closable={tabs.length > 1}
            onSelect={handleSelect}
            onChange={handleChange}
            onClose={handleTabClose}
          />
        ))}
      </ul>
      <div className='addTabContainerButton'>
        <Button
          data-testid={EditorTabListTestIds.ADD_BUTTON}
          text={'+'}
          onClick={onAdd}
          className={'addTabButton'}
          disabled={tabs.length >= 10}
        />
      </div>
    </>
  )
}

export default EditorTabList
