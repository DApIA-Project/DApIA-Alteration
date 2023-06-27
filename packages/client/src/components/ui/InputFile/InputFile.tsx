import React from 'react'
import './InputFile.css'

export enum InputFileTestIds {
  INPUT_FILE_RECORDING_REPLAY = 'InputFile.action.selectRecordingReplay',
  INPUT_FILE_RECORDING = 'InputFile.action.selectRecording',
}

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
      accept={'.csv, .sbs, .bst'}
      onChange={(event) => {
        if (event.target.files) onChange(event.target.files)
      }}
    />
  )
}

export default InputFile
