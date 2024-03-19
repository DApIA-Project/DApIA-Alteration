import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { grey } from '@mui/material/colors'

interface CheckBoxProps {
  label: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export enum CheckBoxTestIds {
  CHECK_BOX_COMPONENT = 'CheckBox.component',
}
function CheckBox({ label, checked, onChange }: CheckBoxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          data-testid={CheckBoxTestIds.CHECK_BOX_COMPONENT}
          checked={checked}
          onChange={onChange}
          sx={{
            color: grey[50],
            '&.Mui-checked': {
              color: grey[50],
            },
          }}
        />
      }
      label={label}
    />
  )
}

export default CheckBox
