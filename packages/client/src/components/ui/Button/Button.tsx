import React from 'react'
import './Button.css'

export interface ButtonProps {
  text: string
  disabled?: boolean
  className?: string
  onClick: () => void
  children?: React.ReactNode
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
      {text}
      {props.children}
    </button>
  )
}

export default Button
