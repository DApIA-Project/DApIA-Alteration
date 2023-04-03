import React from 'react'
import '../styles/InputFile.css'

interface InputFileProps {
  name: string
  onChange: (fileList: FileList) => void
}

function InputFile({ name, onChange, ...props }: InputFileProps) {
  return (
    <div className={'zone_input_files'}>
      <input
        type='file'
        {...props}
        name={name}
        onChange={(event) => {
          if (event.target.files) onChange(event.target.files)
        }}
        multiple
      />
    </div>
  )
}

export default InputFile
