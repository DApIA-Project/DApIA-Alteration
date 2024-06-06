import React, { useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { editor } from 'monaco-editor'
import * as parser from '@smartesting/alteration-scenario/dist/parser/parser'
import { Suggestion } from '@smartesting/alteration-scenario/dist/parser/parser'
import ALTERATION_SCENARIO_FORMAT from '../../../alterationscenario'
import './AlterationScenarioEditor.css'
import { showSuggestions } from './utils/showSuggestions/showSuggestions'
import { applyErrorColoring } from './utils/applyErrorColoring/applyErrorColoring'
import ILanguageExtensionPoint = monaco.languages.ILanguageExtensionPoint

type AlterationScenarioEditorProps = {
  language: string
  value: string
  onChange?: (value: string) => void
  options?: { readOnly: boolean; hideCursorInOverviewRuler: boolean }
}

declare global {
  interface Window {
    timer: NodeJS.Timeout | undefined
    completionProviderRegistered: boolean
    languageInitialized: boolean
  }
}
const AlterationScenarioEditor: React.FunctionComponent<
  AlterationScenarioEditorProps
> = ({
  language,
  value,
  onChange,
  options = { readOnly: false, hideCursorInOverviewRuler: false },
  ...props
}) => {
  const monaco = useMonaco()

  function initLanguage() {
    if (!monaco || window.languageInitialized) return
    monaco!.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    const languages: ILanguageExtensionPoint[] =
      monaco!.languages.getLanguages()
    let haveLanguage = false
    for (const language of languages) {
      if (language.id === 'alterationscenario') {
        haveLanguage = true
      }
    }
    if (haveLanguage) return
    monaco!.languages.register({ id: 'alterationscenario' })
    monaco!.languages.setMonarchTokensProvider(
      'alterationscenario',
      ALTERATION_SCENARIO_FORMAT
    )
    window.languageInitialized = true
  }

  function initCompletionProvider() {
    if (!monaco || window.completionProviderRegistered) return
    monaco.languages.registerCompletionItemProvider('alterationscenario', {
      triggerCharacters: [' ', '\b'],
      provideCompletionItems: async function (
        model: editor.ITextModel,
        position: monaco.IPosition
      ): Promise<monaco.languages.CompletionList | null | undefined> {
        const suggestion: Suggestion = await parser.getSuggestions(
          model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          }),
          position.lineNumber,
          position.column
        )

        if (suggestion.suggestions?.items.length === 0) {
          return {
            suggestions: [],
          }
        }
        const suggestions: monaco.languages.CompletionItem[] = showSuggestions(
          monaco,
          suggestion
        )
        suggestion.suggestions!.items = []
        return {
          suggestions: suggestions,
          incomplete: true,
        }
      },
    })
    window.completionProviderRegistered = true
  }

  async function handleChange(text: string | undefined) {
    if (onChange && monaco) onChange(text || '')
  }

  useEffect(
    () => {
      if (!monaco) return
      window.onerror = (err) => console.error(err)
      initLanguage()
      initCompletionProvider()
      if (value) {
        if (window.timer) {
          clearTimeout(window.timer)
        }
        window.timer = setTimeout(async () => {
          await applyErrorColoring(monaco, value)
        }, 500)
      }
    },
    // eslint-disable-next-line
    [monaco, value]
  )

  return (
    <Editor
      defaultLanguage={language}
      theme={'vs-dark'}
      value={value}
      options={options}
      onChange={handleChange}
      {...props}
    />
  )
}
export default AlterationScenarioEditor
