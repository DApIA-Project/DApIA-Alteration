import React from 'react'
import Switch from '@mui/joy/Switch'
import { Tooltip } from '@mui/joy'
import HelpIcon from '@mui/icons-material/Help'
import './ScenarioOption.css'

export type ScenarioOptionProps = {
  value: boolean
  onChange: (newValue: boolean) => void
  name: string
  description?: string
}

export const ScenarioOption: React.FunctionComponent<ScenarioOptionProps> = ({
  value,
  onChange,
  name,
  description,
}) => {
  return (
    <div className={'scenario-option'}>
      <Switch
        data-testid={name}
        className={'switchButton'}
        color={value ? 'success' : 'neutral'}
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked)
        }}
        endDecorator={name}
      />
      {description && (
        <Tooltip arrow title={description} className={'tooltip'}>
          <HelpIcon fontSize='small' className='helpIcon' />
        </Tooltip>
      )}
    </div>
  )
}
