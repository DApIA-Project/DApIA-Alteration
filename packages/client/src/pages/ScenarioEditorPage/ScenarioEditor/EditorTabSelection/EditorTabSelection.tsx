import React, { useRef, useState } from 'react'
import './EditorTabSelection.css'
import Button from '../../../../components/ui/Button/Button'

export enum EditorTabSelectionTestIds {
  ADD_BUTTON = 'AddTabButton',
  REMOVE_BUTTON = 'RemoveTabButton',
}

type EditorTabSelectionProps = {
  tabsLength: number
  selected: number
  onSelect: (index: number) => void
  onRemove: (index: number) => void
  onAdd: () => void
}

const EditorTabSelection: React.FunctionComponent<EditorTabSelectionProps> = ({
  onSelect,
  onRemove,
  onAdd,
  tabsLength,
  selected,
}) => {
  const [tabs, setTabs] = useState(() =>
    Array.from({ length: tabsLength }, (_, index) => `New scenario`)
  )
  const [editableText, setEditableText] = useState<string>(tabs[selected])
  const [isUpdateName, setIsUpdateName] = useState<boolean>(false)
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
    console.log(isUpdateName)
    setIsUpdateName(false)
    console.log(isUpdateName)
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs]
      newTabs[index] = editableText
      return newTabs
    })
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
              onClick={(event) => handleTabClick(index)}
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
                'New scenario'
              )}
            </div>
            {tabs.length > 1 && (
              <Button
                data-testid={`${EditorTabSelectionTestIds.REMOVE_BUTTON}-${index}`}
                text={'x'}
                onClick={() => onRemove(index)}
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
          onClick={() => onAdd()}
          className={'addTabButton'}
          disabled={tabsLength >= 10}
        />
      </div>
    </>
  )
}

export default EditorTabSelection
