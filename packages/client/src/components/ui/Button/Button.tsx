import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string
  onClick: () => void
}

export enum ButtonTestIds {
  GENERATE_BUTTON = 'Button.action.generateButton',
}

function Button({ text, onClick, ...props }: ButtonProps) {
  return (
    <button {...props} className='build' onClick={onClick}>
      {' '}
      {text}{' '}
    </button>
  )
}

export default Button
