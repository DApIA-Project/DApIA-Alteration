import React, { useState } from 'react'
import Button from '../../../../../components/ui/Button/Button'

export enum EditorTabTestIds {
  REMOVE_BUTTON = 'RemoveTabButton',
  DIV_TAB = 'DivTab',
}

type EditorTabProps = {
  index: number
  tabName: string
  isSelected: boolean
  closable: boolean
  onSelect: (index: number) => void
  onChange: (name: string) => void
  onClose: (index: number) => void
}

const EditorTab: React.FunctionComponent<EditorTabProps> = ({
  tabName,
  onSelect,
  onChange,
  onClose,
  isSelected,
  index,
  closable,
}) => {
  const [name, setName] = useState<string>(tabName)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleClick() {
    if (!isSelected) {
      onSelect(index)
    } else {
      setIsUpdated(true)
    }
  }

  function handleAuxClick(event: React.MouseEvent<HTMLDivElement>) {
    if (closable && event.button === 1) {
      onClose(index)
    }
  }

  function handleOnBlur() {
    setIsUpdated(false)
    onChange(name)
  }

  return (
    <>
      <li key={index} className={`li ${isSelected ? 'selected' : ''}`}>
        <div
          data-testid={`${EditorTabTestIds.DIV_TAB}-${index}`}
          onClick={() => handleClick()}
          onAuxClick={handleAuxClick}
          role='button'
          className={`tab ${isSelected ? 'selected' : ''}`}
        >
          {isSelected && isUpdated ? (
            <input
              autoFocus={true}
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              onBlur={() => handleOnBlur()}
              className={`input ${isSelected ? 'selected' : ''}`}
            />
          ) : (
            name
          )}
        </div>
        {closable && (
          <Button
            data-testid={`${EditorTabTestIds.REMOVE_BUTTON}-${index}`}
            text={'x'}
            onClick={() => onClose(index)}
            className={'tabCloseButton'}
          />
        )}
      </li>
    </>
  )
}

export default EditorTab
