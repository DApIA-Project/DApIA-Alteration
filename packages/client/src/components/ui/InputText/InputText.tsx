import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import './InputText.css'
import { TextField } from '@mui/material'

export enum InputTextTestIds {
  INPUT_TEXT_ELEMENT = 'InputText.element',
}

interface InputTextProps {
  libelle: string
  value?: string | number
  onChange: (valueInput: string) => void
  isPassword?: boolean
  id: string
  onSubmit?: () => void
}

function InputText({
  libelle,
  value,
  onChange,
  isPassword,
  id,
  onSubmit,
  ...props
}: InputTextProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && onSubmit) {
        onSubmit() // Appelle la fonction de soumission lorsque la touche "Entrée" est pressée
      }
    }

    if (inputRef.current) {
      inputRef.current.addEventListener('keypress', handleKeyPress)
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keypress', handleKeyPress)
      }
    }
  }, [onSubmit])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <div className={'inputTextDiv'}>
      <label htmlFor={id}>{libelle}</label>
      {isPassword && (
        <FormControl className={'input'}>
          <OutlinedInput
            className='outlined-adornment-password'
            id={id}
            inputRef={inputRef}
            value={value}
            {...props}
            onChange={handleInputChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}

      {!isPassword && (
        <TextField
          className={'input'}
          onChange={handleInputChange}
          id={id}
          inputRef={inputRef}
          value={value}
          {...props}
        ></TextField>
      )}
    </div>
  )
}

export default InputText
