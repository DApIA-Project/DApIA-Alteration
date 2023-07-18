import React, { useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import { editor } from 'monaco-editor'
import * as parser from '@smartesting/alteration-scenario/dist/parser/parser'
import {
  parseScenario,
  Suggestion,
} from '@smartesting/alteration-scenario/dist/parser/parser'
import ALTERATION_SCENARIO_FORMAT, {
  getDocumentationLabel,
} from '../../../alterationscenario'
import './AlterationScenarioEditor.css'
import { TextEdit } from 'vscode-languageserver-types'
import { InsertReplaceEdit } from 'vscode-languageserver'
import { AlterationScenarioSemanticVisitor } from '@smartesting/alteration-scenario/dist/generators/AlterationScenarioSemanticVisitor'
import { SemanticError } from '@smartesting/alteration-scenario/dist/generators'
import { getSemantic } from './utils/getSemantic'
import IModel = monaco.editor.IModel
import CompletionItemProvider = monaco.languages.CompletionItemProvider
import ILanguageExtensionPoint = monaco.languages.ILanguageExtensionPoint
import IMarkerData = editor.IMarkerData

type AlterationScenarioEditorProps = {
  language: string
  value: string
  options?: {}
}
const AlterationScenarioEditor: React.FunctionComponent<
  AlterationScenarioEditorProps
> = ({ language, value, options, ...props }) => {
  const monaco = useMonaco()

  useEffect(
    () => {
      if (!monaco) return
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
      const languages: ILanguageExtensionPoint[] =
        monaco.languages.getLanguages()
      let haveLanguage = false
      for (const language of languages) {
        if (language.id === 'alterationscenario') {
          haveLanguage = true
        }
      }
      if (haveLanguage) return
      monaco.languages.register({ id: 'alterationscenario' })
      monaco.languages.setMonarchTokensProvider(
        'alterationscenario',
        ALTERATION_SCENARIO_FORMAT
      )

      const completionProvider = createCompletionProvider()
      if (!completionProvider) return
      monaco.languages.registerCompletionItemProvider(
        'alterationscenario',
        completionProvider
      )
    },
    // eslint-disable-next-line
    [monaco]
  )

  async function validate(
    model: IModel,
    column: number,
    length: number,
    message: string,
    line: number
  ) {
    const range = {
      startLineNumber: line,
      startColumn: column,
      endLineNumber: line,
      endColumn: column + length,
    }
    const markers: IMarkerData[] = []
    markers.push({
      message: message,
      severity: monaco!.MarkerSeverity.Error,
      startLineNumber: range.startLineNumber,
      startColumn: range.startColumn,
      endLineNumber: range.endLineNumber,
      endColumn: range.endColumn,
    })

    const { value } = await parseScenario(
      model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: line,
        endColumn: column,
      })
    )

    const visitor = new AlterationScenarioSemanticVisitor()
    const semanticErrors: SemanticError[] = visitor.visitScenario(value)
    markers.push(...getSemantic(model, semanticErrors))

    monaco!.editor.setModelMarkers(model, 'owner', markers)
  }

  function validateSemantic(model: IModel, semanticErrors: SemanticError[]) {
    const markers = getSemantic(model, semanticErrors)
    monaco!.editor.setModelMarkers(model, 'owner', markers)
  }

  function isTextEdit(edit: any): edit is TextEdit {
    return 'range' in edit && 'newText' in edit
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
        console.log(suggestion)
        if (suggestion.errors.lexer.length !== 0) {
          await validate(
            model,
            suggestion.errors.lexer[0].column || 0,
            suggestion.errors.lexer[0].length,
            suggestion.errors.lexer[0].message,
            suggestion.errors.lexer[0].line || 0
          )
        } else {
          if (suggestion.errors.parser.length !== 0) {
            const { token } = suggestion.errors.parser[0]
            const length =
              token.startColumn !== undefined && token.endColumn !== undefined
                ? token.endColumn - token.startColumn
                : 0

            await validate(
              model,
              token.startColumn || 0,
              length,
              suggestion.errors.parser[0].message,
              token.startLine || 0
            )
          } else {
            const { value } = await parseScenario(
              model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              })
            )
            const visitor = new AlterationScenarioSemanticVisitor()
            const result: SemanticError[] = visitor.visitScenario(value)
            validateSemantic(model, result)
          }
        }

        if (suggestion.suggestions?.items.length === 0) {
          return {
            suggestions: [],
          }
        }
        const suggestions: monaco.languages.CompletionItem[] = []
        if (suggestion?.suggestions!.items !== undefined) {
          for (const resultElement of suggestion?.suggestions.items) {
            const textEdit: TextEdit | InsertReplaceEdit | undefined =
              resultElement.textEdit
            if (isTextEdit(textEdit)) {
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
                documentation: getDocumentationLabel(resultElement.label),
                detail: resultElement.detail,
              })
            }
          }
        }
        suggestion.suggestions!.items = []
        return {
          suggestions: suggestions,
          incomplete: true,
        }
      },
    }
  }

  if (value === '') {
    if (window.localStorage.getItem('lastScenario') == null) {
      value = ''
    } else {
      value = window.localStorage.getItem('lastScenario') ?? ''
    }
  }
  return (
    <Editor
      defaultLanguage={language}
      theme={'vs-dark'}
      value={value}
      options={options}
      onChange={(text) => {
        window.localStorage.setItem('lastScenario', text || '')
      }}
      {...props}
    />
  )
}
export default AlterationScenarioEditor
