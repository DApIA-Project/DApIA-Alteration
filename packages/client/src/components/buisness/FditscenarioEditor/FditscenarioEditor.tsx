import React, { useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import * as parser from '@smartesting/fdit-scenario/dist/parser/parser'
import FDITSCENARIO_FORMAT, {
  getDocumentationLabel,
} from '../../../fditscenario'
import './FditscenarioEditor.css'
import { CompletionList, TextEdit } from 'vscode-languageserver-types'
import IModel = monaco.editor.IModel
import CompletionItemProvider = monaco.languages.CompletionItemProvider
import { InsertReplaceEdit } from 'vscode-languageserver'
import ILanguageExtensionPoint = monaco.languages.ILanguageExtensionPoint
//import { FditScenarioSemanticVisitor } from '@smartesting/fdit-scenario/dist/generators/FditScenarioSemanticVisitor'
//import { SemanticError } from '@smartesting/fdit-scenario/dist/generators/index'
import { parseScenario } from '@smartesting/fdit-scenario/dist/parser/parser'

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

  async function validate(
    model: IModel,
    column: number,
    length: number,
    message: string,
    line: number
  ) {
    const markers = []
    const range = {
      startLineNumber: line,
      startColumn: column,
      endLineNumber: line,
      endColumn: column + length,
    }
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
    //TODO ENLEVER DES COMMENTAIRES POUR SEMANTIC ANALYSE
    /*const visitor = new FditScenarioSemanticVisitor()
    const result: SemanticError[] = visitor.visitScenario(value)

    for (const error of result) {
      if (
        error.position.startline !== undefined &&
        error.position.endline !== undefined &&
        error.position.startcolumn !== undefined &&
        error.position.endcolumn !== undefined &&
        error.errors !== ''
      ) {
        const range2 = {
          startLineNumber: error.position.startline + 1,
          startColumn: error.position.startcolumn + 1,
          endLineNumber: error.position.endline + 1,
          endColumn: error.position.endcolumn + 1,
        }
        markers.push({
          message: error.errors,
          severity: monaco!.MarkerSeverity.Info,
          startLineNumber: range2.startLineNumber,
          startColumn: range2.startColumn,
          endLineNumber: range2.endLineNumber,
          endColumn: range2.endColumn,
        })
      }
    }*/

    monaco!.editor.setModelMarkers(model, 'owner', markers)
  }

  //TODO ENLEVER DES COMMENTAIRES POUR SEMANTIC ANALYSE
  /*function validateSemantic(
      model: IModel,
      semanticErrors : SemanticError[]
  ) {
    const markers = []
    for (const error of semanticErrors) {
      if(error.position.startline !== undefined
          && error.position.endline !== undefined
          && error.position.startcolumn !== undefined
          && error.position.endcolumn !== undefined
          && error.errors !== ""){
        const range2 = {
          startLineNumber: error.position.startline+1,
          startColumn: error.position.startcolumn +1,
          endLineNumber: error.position.endline+1,
          endColumn: error.position.endcolumn+1,
        }
        markers.push({
          message: error.errors,
          severity: monaco!.MarkerSeverity.Info,
          startLineNumber: range2.startLineNumber,
          startColumn: range2.startColumn,
          endLineNumber: range2.endLineNumber,
          endColumn: range2.endColumn,
        })
      }
    }
    monaco!.editor.setModelMarkers(model, 'owner', markers)
  }*/

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
        const completionList: {
          suggestions: CompletionList | undefined
          errors: { parser: any; lexer: any }
        } = await parser.getSuggestions(
          model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          }),
          position.lineNumber,
          position.column
        )

        if (completionList.errors.lexer.length !== 0) {
          let messageError: string =
            completionList.errors.lexer[0].message + '\n'
          if (completionList.errors.parser.length !== 0) {
            messageError += completionList.errors.parser[0].message
          }
          validate(
            model,
            completionList.errors.lexer[0].column,
            completionList.errors.lexer[0].length,
            messageError,
            completionList.errors.lexer[0].line
          )
        } else {
          if (completionList.errors.parser.length !== 0) {
            validate(
              model,
              position.column,
              1,
              completionList.errors.parser[0].message,
              position.lineNumber
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
            //TODO ENLEVER DES COMMENTAIRES POUR SEMANTIC ANALYSE
            /*
            const visitor = new FditScenarioSemanticVisitor()
            const result: SemanticError[] = visitor.visitScenario(value)
            validateSemantic(model,result)*/
          }
        }

        if (completionList.suggestions?.items.length === 0) {
          return {
            suggestions: [],
          }
        }
        const suggestions: monaco.languages.CompletionItem[] = []
        if (completionList?.suggestions!.items !== undefined) {
          for (const resultElement of completionList?.suggestions.items) {
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
        completionList.suggestions!.items = []
        return {
          suggestions: suggestions,
          incomplete: true,
        }
      },
    }
  }

  useEffect(() => {
    if (!monaco) return
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
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
