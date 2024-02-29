import React, { useState } from 'react'
import './InputText.css'

export enum InputTextTestIds {
  INPUT_TEXT_ELEMENT = 'InputText.element',
}

interface InputTextProps {
  libelle: string
  value: string | number
  onChange: (valueInput: string) => void
}

function InputText({ libelle, value, onChange, ...props }: InputTextProps) {
  const [editedInput, setEditedInput] = useState<string>(String(value))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedInput(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div>
      {libelle}
      <input
        type='text'
        value={editedInput}
        {...props}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default InputText
