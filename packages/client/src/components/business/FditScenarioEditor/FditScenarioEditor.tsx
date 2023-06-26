import React, { useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import { editor } from 'monaco-editor'
import * as parser from '@smartesting/fdit-scenario/dist/parser/parser'
import {
  parseScenario,
  Suggestion,
} from '@smartesting/fdit-scenario/dist/parser/parser'
import FDIT_SCENARIO_FORMAT, {
  getDocumentationLabel,
} from '../../../fditscenario'
import './FditScenarioEditor.css'
import { TextEdit } from 'vscode-languageserver-types'
import { InsertReplaceEdit } from 'vscode-languageserver'
import { FditScenarioSemanticVisitor } from '@smartesting/fdit-scenario/dist/generators/FditScenarioSemanticVisitor'
import { SemanticError } from '@smartesting/fdit-scenario/dist/generators'
import { Memory } from '@smartesting/fdit-scenario/dist/generators/Memory/Memory'
import { RangeConstant } from '@smartesting/fdit-scenario/dist/generators/Memory/RangeConstant'
import { ListConstant } from '@smartesting/fdit-scenario/dist/generators/Memory/ListConstant'
import {
  ASTListDeclaration,
  ASTRangeDeclaration,
  isASTListDeclaration,
  isASTOffsetList,
  isASTRangeDeclaration,
  isASTStringList,
} from '@smartesting/fdit-scenario/dist/language-server/generated/ast'
import { getSemantic } from './utils/getSemantic'
import IModel = monaco.editor.IModel
import CompletionItemProvider = monaco.languages.CompletionItemProvider
import ILanguageExtensionPoint = monaco.languages.ILanguageExtensionPoint
import IMarkerData = editor.IMarkerData

type FditScenarioEditorProps = {
  language: string
  value: string
  options?: {}
}
const FditScenarioEditor: React.FunctionComponent<FditScenarioEditorProps> = ({
  language,
  value,
  options,
  ...props
}) => {
  const monaco = useMonaco()
  let memory: Memory = new Memory()

  useEffect(
    () => {
      if (!monaco) return
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
      const languages: ILanguageExtensionPoint[] =
        monaco.languages.getLanguages()
      let haveLanguage = false
      for (const language of languages) {
        if (language.id === 'fditscenario') {
          haveLanguage = true
        }
      }
      if (haveLanguage) return
      monaco.languages.register({ id: 'fditscenario' })
      monaco.languages.setMonarchTokensProvider(
        'fditscenario',
        FDIT_SCENARIO_FORMAT
      )

      const completionProvider = createCompletionProvider()
      if (!completionProvider) return
      monaco.languages.registerCompletionItemProvider(
        'fditscenario',
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

    window.localStorage.setItem(
      'lastScenario',
      model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: line,
        endColumn: column,
      })
    )

    if (value.declarations.length !== 0) {
      console.log(value.declarations)
      for (const decl of value.declarations) {
        if (isASTRangeDeclaration(decl)) {
          let rangeDecl: ASTRangeDeclaration = decl as ASTRangeDeclaration
          console.log(decl.constant)
          let constant: RangeConstant = new RangeConstant(
            decl.constant,
            rangeDecl.range.range.start,
            rangeDecl.range.range.end
          )
          memory.addConstant(constant)
          console.log(memory.getConstant('$var'))
        }

        if (isASTListDeclaration(decl)) {
          let listDecl: ASTListDeclaration = decl as ASTListDeclaration
          console.log(listDecl)
          let valuesList = []
          if (isASTStringList(listDecl.list.list)) {
            for (const valuesListElement of listDecl.list.list.items) {
              valuesList.push(valuesListElement)
            }
          }
          if (isASTOffsetList(listDecl.list.list)) {
            for (const valuesListElement of listDecl.list.list.items) {
              valuesList.push(valuesListElement.content)
            }
          }

          let constant: ListConstant = new ListConstant(
            decl.constant,
            valuesList
          )
          memory.addConstant(constant)
        }
      }
    }

    const visitor = new FditScenarioSemanticVisitor(memory)
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
      triggerCharacters: [' '],
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

            const visitor = new FditScenarioSemanticVisitor()
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
      {...props}
    />
  )
}
export default FditScenarioEditor
