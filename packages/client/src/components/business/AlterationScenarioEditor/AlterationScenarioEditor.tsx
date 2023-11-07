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
import CompletionItemProvider = monaco.languages.CompletionItemProvider
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

  useEffect(
    () => {
      if (!monaco) return
      initLanguage()
      initCompletionProvider()
    },
    // eslint-disable-next-line
    [monaco]
  )

  function initLanguage() {
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
  }

  function initCompletionProvider() {
    const completionProvider = createCompletionProvider()
    if (!completionProvider) return
    monaco!.languages.registerCompletionItemProvider(
      'alterationscenario',
      completionProvider
    )
  }

  function createCompletionProvider(): CompletionItemProvider | undefined {
    if (!monaco) return
    return {
      triggerCharacters: [' ', '\b'],
      provideCompletionItems: async function (
        model: editor.ITextModel,
        position: monaco.IPosition
      ): Promise<monaco.languages.CompletionList | null | undefined> {
        // await initSemantic(model, position)
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
    }
  }

  return (
    <Editor
      defaultLanguage={language}
      theme={'vs-dark'}
      value={value}
      options={options}
      onChange={async (text) => {
        if (onChange) {
          onChange(text || '')
          if (monaco !== null) {
            if (window.timer) {
              clearTimeout(window.timer)
            }
            window.timer = setTimeout(async () => {
              await applyErrorColoring(monaco, text || '')
            }, 1000)
          }
        }
      }}
      {...props}
    />
  )
}
export default AlterationScenarioEditor
