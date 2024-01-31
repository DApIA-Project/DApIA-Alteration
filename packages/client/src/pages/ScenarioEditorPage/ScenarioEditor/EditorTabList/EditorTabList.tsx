import React from 'react'
import './EditorTabList.css'
import Button from '../../../../components/ui/Button/Button'
import EditorTab from './EditorTab/EditorTab'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'

export enum EditorTabListTestIds {
  ADD_BUTTON = 'AddTabButton',
}

type EditorTabListProps = {
  tabs: Scenario[]
  selected: number
  onAdd: () => void
  onClose: (index: number) => void
  onChange: (name: string) => void
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
  const handleSelect = (index: number) => {
    if (index !== selected) {
      onSelect(index)
    }
  }

  function handleChange(value: string) {
    onChange(value)
  }

  const handleTabClose = (index: number) => {
    onClose(index)
  }

  return (
    <>
      <ul className='tabList'>
        {tabs.map(({ name }, index) => (
          <EditorTab
            key={`${name}-${index}`}
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
