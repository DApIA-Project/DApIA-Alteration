import React, { useEffect } from 'react'
import './MonacoEditor.css'
import { ScenarioEditorTestIds } from '../ScenarioEditor'

const MonacoEditor: React.FunctionComponent = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/monacoCanva.js'
    script.async = true
    script.type = 'module'

    document.body.appendChild(script)
  }, [])

  return (
    <div
      data-testid={ScenarioEditorTestIds.EDITOR_MONACO}
      id='monaco-editor-root'
    ></div>
  )
}
export default MonacoEditor
