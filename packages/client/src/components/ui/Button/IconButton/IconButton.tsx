import React from 'react'
import Button, { ButtonProps } from '../Button'

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode
}

function IconButton({ icon, text, ...props }: IconButtonProps) {
  return (
    <Button text={''} {...props}>
      {icon}
    </Button>
  )
}

export default IconButton
