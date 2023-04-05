import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string
  onClick: () => void
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
