import React, { useEffect } from 'react'
import '../../../styles/MonacoEditor.css'

const MonacoEditor: React.FunctionComponent = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/monacoCanva.js'
    script.async = true
    script.type = 'module'

    document.body.appendChild(script)
  }, [])

  return <div id='monaco-editor-root'></div>
}
export default MonacoEditor
