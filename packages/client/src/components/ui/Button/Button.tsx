import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string
  disabled?: boolean
  className?: string
  onClick: () => void
}

export enum ButtonTestIds {
  GENERATE_BUTTON = 'Button.action.generateButton',
}

function Button({
  text,
  onClick,
  disabled = false,
  className = 'build',
  ...props
}: ButtonProps) {
  const disabledClass = disabled ? 'disabled' : ''
  return (
    <button
      {...props}
      className={`${className} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      &nbsp;{text}&nbsp;
    </button>
  )
}

export default Button
