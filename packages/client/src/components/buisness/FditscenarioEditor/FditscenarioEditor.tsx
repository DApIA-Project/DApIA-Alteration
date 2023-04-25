import React, { useEffect, useState } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import * as parser from '@smartesting/fdit-scenario/dist/parser/parser'
import FDITSCENARIO_FORMAT from '../../../fditscenario'
import './FditscenarioEditor.css'
import { CompletionList, TextEdit } from 'vscode-languageserver-types'
import IModel = monaco.editor.IModel
import CompletionItemProvider = monaco.languages.CompletionItemProvider
import { InsertReplaceEdit } from 'vscode-languageserver'
import ILanguageExtensionPoint = monaco.languages.ILanguageExtensionPoint

type FditscenarioEditorProps = {
  language: string
  value: string
  options?: {}
}
const FditscenarioEditor: React.FunctionComponent<FditscenarioEditorProps> = ({
  language,
  value,
  options,
  ...props
}) => {
  const monaco = useMonaco()
  function isTextEdit(edit: any): edit is TextEdit {
    return 'range' in edit && 'newText' in edit
  }
  function createCompletionProvider(): CompletionItemProvider | undefined {
    if (!monaco) return
    return {
      triggerCharacters: [' '],
      provideCompletionItems: async function (
        model: IModel,
        position: monaco.IPosition
      ): Promise<monaco.languages.CompletionList | null | undefined> {
        const completionList: CompletionList | undefined =
          await parser.getSuggestions(
            model.getValueInRange({
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            }),
            position.lineNumber,
            position.column
          )
        if (!completionList)
          return {
            suggestions: [],
          }

        const suggestions: monaco.languages.CompletionItem[] = []
        if (completionList?.items !== undefined) {
          for (const resultElement of completionList?.items) {
            const textEdit: TextEdit | InsertReplaceEdit | undefined =
              resultElement.textEdit
            if (isTextEdit(textEdit)) {
              console.log(textEdit.range)

              console.log({ resultElement })
              console.log('POSITION : ' + position)
              suggestions.push({
                label: resultElement.label,
                kind:
                  resultElement.kind ||
                  monaco.languages.CompletionItemKind.Text,
                insertText: resultElement.label,
                range: monaco.Range.fromPositions({
                  lineNumber: textEdit.range.start.line + 1,
                  column: textEdit.range.start.character + 1,
                }),
                documentation: resultElement.documentation,
              })
            }
          }
        }
        completionList.items = []
        return {
          suggestions: suggestions,
          incomplete: true,
        }
      },
    }
  }

  useEffect(() => {
    console.log('USE EFFECT')
    if (!monaco) return
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    console.log(monaco.languages.getLanguages())
    const languages: ILanguageExtensionPoint[] = monaco.languages.getLanguages()
    let have_language: boolean = false
    for (const language of languages) {
      if (language.id === 'fditscenario') {
        have_language = true
      }
    }
    if (have_language) return
    monaco.languages.register({ id: 'fditscenario' })
    monaco.languages.setMonarchTokensProvider(
      'fditscenario',
      FDITSCENARIO_FORMAT
    )
    const completionProvider = createCompletionProvider()
    if (!completionProvider) return
    monaco.languages.registerCompletionItemProvider(
      'fditscenario',
      completionProvider
    )
  }, [monaco])

  return (
    <Editor
      defaultLanguage={language}
      theme={'vs-dark'}
      value={value}
      options={options}
      {...props}
    />
  )
}
export default FditscenarioEditor
