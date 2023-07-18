import React, { CSSProperties, useState } from 'react'
import InputFile from '../../../../../components/ui/InputFile/InputFile'
import { Recording } from '@smartesting/shared/dist'
import './RecordInputFile.css'
import { RecordInputFilesTestIds } from '../RecordInputFiles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faCheck,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

export type RecordInputFileProps = {
  onRead: (recording: Recording) => void
  testIdInput: string
}
export const RecordInputFile: React.FunctionComponent<RecordInputFileProps> = ({
  onRead,
  testIdInput,
}) => {
  const [isRecordingPresent, setIsRecordingPresent] = useState<boolean>(false)

  async function onRecordingSelected(files: FileList) {
    try {
      const recording = await readRecording(files, setIsRecordingPresent)
      onRead(recording)
    } catch (error) {
      console.error(error)
    }
  }

  async function readRecording(
    files: FileList,
    setIsPresent: React.Dispatch<boolean>
  ): Promise<Recording> {
    const file = files.item(0)
    if (!file) {
      return { name: '', content: '' }
    } else {
      return new Promise<Recording>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          setIsPresent(true)
          const content = reader.result as string
          resolve({ name: file.name, content })
        }
        reader.onerror = () => {
          setIsPresent(false)
          reject(new Error('Failed to read the file.'))
        }
        reader.readAsText(file)
      })
    }
  }

  function imageSelection(state: boolean): IconDefinition {
    return state ? faCheck : faXmark
  }

  function imageRecordingSelection(): IconDefinition {
    return imageSelection(isRecordingPresent)
  }

  function styleSelection(state: boolean): CSSProperties {
    return state ? { color: '#26b807' } : { color: '#ff060d' }
  }

  function styleImageSelection(): CSSProperties {
    return styleSelection(isRecordingPresent)
  }

  return (
    <div className={'zone_input_files'}>
      <InputFile
        name={'recording'}
        onChange={async (fileList) => {
          await onRecordingSelected(fileList)
        }}
        data-testid={testIdInput}
      />
      <FontAwesomeIcon
        icon={imageRecordingSelection()}
        data-testid={
          isRecordingPresent
            ? RecordInputFilesTestIds.RECORDING_IS_PRESENT
            : RecordInputFilesTestIds.RECORDING_IS_NOT_PRESENT
        }
        title={'Enregistrement requis'}
        size={'2xl'}
        style={styleImageSelection()}
      />
    </div>
  )
}
