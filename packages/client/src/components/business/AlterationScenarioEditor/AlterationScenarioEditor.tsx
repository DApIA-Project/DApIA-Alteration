import React, { useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import * as parser from '@smartesting/alteration-scenario/dist/parser/parser'
import { Suggestion } from '@smartesting/alteration-scenario/dist/parser/parser'
import ALTERATION_SCENARIO_FORMAT from '../../../alterationscenario'
import './AlterationScenarioEditor.css'
import IModel = monaco.editor.IModel
import CompletionItemProvider = monaco.languages.CompletionItemProvider
import ILanguageExtensionPoint = monaco.languages.ILanguageExtensionPoint
import { showSuggestions } from '../../../utils/showSuggestions/showSuggestions'
import { checkSemantic } from '../../../utils/checkSemantic/checkSemantic'
import { ScenariosStorage } from '../../../pages/ScenarioEditorPage/types'

type AlterationScenarioEditorProps = {
  language: string
  value: string
  options?: { readOnly: boolean; hideCursorInOverviewRuler: boolean }
}
const AlterationScenarioEditor: React.FunctionComponent<
  AlterationScenarioEditorProps
> = ({ language, value, options, ...props }) => {
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
        model: IModel,
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

        await checkSemantic(monaco, model, suggestion, position)
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

  if (value === '') {
    const selectedNavItem = window.localStorage.getItem('selectedItem')
    if (selectedNavItem != null) {
      let actualStorage: ScenariosStorage = JSON.parse(
        window.localStorage.getItem('scenarios')!
      )
      if (actualStorage == null) {
        value = ''
      } else {
        if (actualStorage['scenarios'][Number(selectedNavItem) - 1] == null) {
          value = ''
        } else {
          value = actualStorage['scenarios'][Number(selectedNavItem) - 1]
        }
      }
    }
  }
  return (
    <Editor
      defaultLanguage={language}
      theme={'vs-dark'}
      value={value}
      options={options}
      onChange={(text) => {
        if (
          (options !== undefined && options.readOnly !== true) ||
          options === undefined
        ) {
          const selectedNavItem = window.localStorage.getItem('selectedItem')
          if (selectedNavItem != null) {
            let actualStorage: ScenariosStorage = JSON.parse(
              window.localStorage.getItem('scenarios')!
            )
            actualStorage['scenarios'][Number(selectedNavItem) - 1] = text || ''
            window.localStorage.setItem(
              'scenarios',
              JSON.stringify(actualStorage)
            )
          }
        }
      }}
      {...props}
    />
  )
}
export default AlterationScenarioEditor
