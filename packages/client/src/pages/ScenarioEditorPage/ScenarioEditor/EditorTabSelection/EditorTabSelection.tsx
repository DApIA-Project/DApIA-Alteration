import React, { useState } from 'react'
import './EditorTabSelection.css'
import Button from '../../../../components/ui/Button/Button'
import { ScenariosStorage } from '../../types'

type EditorTabSelectionProps = {
  setSelectedItem: any
}
export enum EditorTabSelectionTestIds {
  ADD_BUTTON = 'AddTabButton',
  REMOVE_BUTTON = 'RemoveTabButton',
}
const EditorTabSelection: React.FunctionComponent<EditorTabSelectionProps> = ({
  setSelectedItem,
}) => {
  if (
    window.localStorage.getItem('selectedItem') === undefined ||
    window.localStorage.getItem('selectedItem') === null ||
    window.localStorage.getItem('selectedItem') === ''
  ) {
    window.localStorage.setItem('selectedItem', '1')
  }

  if (
    window.localStorage.getItem('lengthEditor') === undefined ||
    window.localStorage.getItem('lengthEditor') === null ||
    window.localStorage.getItem('lengthEditor') === ''
  ) {
    window.localStorage.setItem('lengthEditor', '1')
  }
  if (
    window.localStorage.getItem('scenarios') === undefined ||
    window.localStorage.getItem('scenarios') === null ||
    window.localStorage.getItem('scenarios') === ''
  ) {
    window.localStorage.setItem(
      'scenarios',
      JSON.stringify({ scenarios: [''] })
    )
  }

  const initialLength = Number(window.localStorage.getItem('lengthEditor'))
  const defaultItems = initialLength
    ? Array.from({ length: initialLength }, (_, index) => index + 1)
    : [1]
  const [tabs, setTabs] = useState(defaultItems)

  function validate(): boolean {
    return Number(window.localStorage.getItem('lengthEditor')) < 15
      ? true
      : false
  }

  const addTab = () => {
    window.localStorage.setItem('lengthEditor', String(tabs.length + 1))
    setTabs([...tabs, Number(tabs[tabs.length - 1]) + 1])
  }

  const removeTab = (index: any) => {
    if (tabs.length > 1) {
      const selectedItem = index + 1
      const selectedIndex = tabs.indexOf(selectedItem)
      const updatedItems = tabs.filter((tab) => tab !== selectedItem)
      const updatedItemsWithAdjustedNumbers = updatedItems.map(
        (item, index_map) => {
          if (index_map < selectedIndex) {
            return item
          }
          return item - 1
        }
      )
      setTabs(updatedItemsWithAdjustedNumbers)
      window.localStorage.setItem(
        'lengthEditor',
        String(updatedItemsWithAdjustedNumbers.length)
      )
      let actualStorage: ScenariosStorage = JSON.parse(
        window.localStorage.getItem('scenarios')!
      )
      actualStorage['scenarios'].splice(index, 1)
      window.localStorage.setItem('scenarios', JSON.stringify(actualStorage))
      // Mise à jour de l'élément sélectionné dans localStorage (si nécessaire)
      const newSelectedItem =
        selectedIndex === 0
          ? updatedItemsWithAdjustedNumbers[0]
          : updatedItemsWithAdjustedNumbers[selectedIndex - 1]
      window.localStorage.setItem('selectedItem', String(newSelectedItem))
    }
  }

  const handleItemClick = (item: number) => {
    setSelectedItem(item)
    window.localStorage.setItem('selectedItem', String(item))
  }

  return (
    <>
      <ul className='tabList'>
        {tabs.map((title, index) => (
          <li
            key={index}
            className={`tab ${
              Number(window.localStorage.getItem('selectedItem')) === title
                ? 'selected'
                : ''
            }`}
            onClick={() => handleItemClick(title)}
          >
            {title}
            <Button
              data-testid={
                EditorTabSelectionTestIds.REMOVE_BUTTON + String(index + 1)
              }
              text={'x'}
              onClick={() => removeTab(index)}
              className={'tabCloseButton'}
            />
          </li>
        ))}
      </ul>
      <div className='addTabContainerButton'>
        <Button
          data-testid={EditorTabSelectionTestIds.ADD_BUTTON}
          text={'+'}
          onClick={addTab}
          className={'addTabButton'}
          disabled={!validate()}
        />
      </div>
    </>
  )
}

export default EditorTabSelection
