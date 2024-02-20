import React from 'react'
import './Select.css'

export interface SelectProps {
  value: string
  options: { value: string; label: string }[]
  className?: string
  onChange: (value: string) => void
}

export enum SelectTestIds {
  SELECT_FORMAT = 'Select.action.selectFormat',
}

function Select({
  value,
  options,
  onChange,
  className = 'selectFormat',
  ...props
}: SelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    onChange(selectedValue)
  }

  return (
    <select {...props} className={`${className}`} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
