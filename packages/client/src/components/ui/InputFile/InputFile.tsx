import React from 'react'
import './InputFile.css'
import { ScenarioEditorTestIds } from '../../../pages/ScenarioEditorPage/ScenarioEditor/ScenarioEditor'

interface InputFileProps {
  name: string
  onChange: (fileList: FileList) => void
}

function InputFile({ name, onChange, ...props }: InputFileProps) {
  return (
    <input
      type='file'
      {...props}
      name={name}
      onChange={(event) => {
        if (event.target.files) onChange(event.target.files)
      }}
    />
  )
}

export default InputFile
