import React, { useState } from 'react'
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
  value: string | number
  onChange: (valueInput: string) => void
  isPassword?: boolean
  id: string
}

function InputText({
  libelle,
  value,
  onChange,
  isPassword,
  id,
  ...props
}: InputTextProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

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
          {...props}
        ></TextField>
      )}
    </div>
  )
}

export default InputText
