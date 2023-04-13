import React, { useEffect, useState } from 'react'
import './MonacoEditor.css'
import { ScenarioEditorTestIds } from '../ScenarioEditor'

type MonacoEditorProps = {
  className: string
}
const MonacoEditor: React.FunctionComponent<MonacoEditorProps> = ({
  className,
}) => {
  const [counterScript, setCounterScript] = useState(Date.now())
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `/monacoCanva.js?time=${counterScript}`
    script.async = true
    script.type = 'module'

    document.body.appendChild(script)
    return () => {
      // Nettoyage du script lorsque le composant est démonté
      document.body.removeChild(script)
      setCounterScript(Date.now())
    }
  }, [])

  return (
    <div
      data-testid={ScenarioEditorTestIds.EDITOR_MONACO}
      id={'monaco-editor-root'}
      className={className}
    ></div>
  )
}
export default MonacoEditor
