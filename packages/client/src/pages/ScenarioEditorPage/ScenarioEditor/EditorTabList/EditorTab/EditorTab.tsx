import React, { useState } from 'react'
import Button from '../../../../../components/ui/Button/Button'
import IconButton from '../../../../../components/ui/Button/IconButton/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import './EditorTab.css'

export enum EditorTabTestIds {
  REMOVE_BUTTON = 'RemoveTabButton',
  DIV_TAB = 'DivTab',
  INPUT_NAME = 'InputName',
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
  const [editedName, setEditedName] = useState<string>(tabName)
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
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleOnBlur()
    }
  }

  function handleOnBlur() {
    setIsUpdated(false)
    onChange(editedName)
  }

  return (
    <>
      <li
        key={`${tabName}-${index}`}
        className={`li ${isSelected ? 'selected' : ''}`}
      >
        <div
          data-testid={EditorTabTestIds.DIV_TAB}
          onClick={() => handleClick()}
          onAuxClick={handleAuxClick}
          role='button'
          className={`tab ${isSelected ? 'selected' : ''}`}
        >
          {isSelected && isUpdated ? (
            <input
              autoFocus={true}
              type='text'
              value={editedName}
              onChange={(e) => {
                setEditedName(e.target.value)
              }}
              onBlur={() => handleOnBlur()}
              onKeyDown={(e) => handleKeyDown(e)}
              className={`input ${isSelected ? 'selected' : ''}`}
              data-testid={EditorTabTestIds.INPUT_NAME}
            />
          ) : (
            tabName
          )}
        </div>
        {closable && (
          <IconButton
            data-testid={EditorTabTestIds.REMOVE_BUTTON}
            text={'x'}
            onClick={() => onClose(index)}
            className={'tabCloseButton'}
            icon={<CloseIcon fontSize={'small'} />}
          />
        )}
      </li>
    </>
  )
}

export default EditorTab
