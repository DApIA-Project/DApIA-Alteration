import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string
  disabled?: boolean
  onClick: () => void
}

export enum ButtonTestIds {
  GENERATE_BUTTON = 'Button.action.generateButton',
}

function Button({ text, onClick, disabled = false, ...props }: ButtonProps) {
  return (
    <button {...props} className='build' onClick={onClick} disabled={disabled}>
      &nbsp;{text}&nbsp;
    </button>
  )
}

export default Button
