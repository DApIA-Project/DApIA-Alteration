import React from 'react'
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
  const tabs = Array.from({ length: tabsLength }, () => null)

  return (
    <>
      <ul className='tabList'>
        {tabs.map((_, index) => (
          <li
            key={index}
            className={`li ${index === selected ? 'selected' : ''}`}
          >
            <div
              onClick={() => onSelect(index)}
              role='button'
              className={`tab ${index === selected ? 'selected' : ''}`}
            >
              {`Tab ${index + 1}`}
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
