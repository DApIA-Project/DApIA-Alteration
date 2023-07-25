import { TextEdit } from 'vscode-languageserver-types'
import { InsertReplaceEdit } from 'vscode-languageserver'
import { getDocumentationLabel } from '../../../../../alterationscenario'
import { Suggestion } from '@smartesting/alteration-scenario/dist/parser/parser'
import * as monaco from 'monaco-editor'

function isTextEdit(edit: any): edit is TextEdit {
  return 'range' in edit && 'newText' in edit
}
type Monaco =
  typeof import('C:/Users/morga/Documents/Programmation/DApIA-Alteration/packages/client/node_modules/monaco-editor/esm/vs/editor/editor.api')

export function showSuggestions(
  monaco: Monaco,
  suggestion: Suggestion
): monaco.languages.CompletionItem[] {
  const suggestions: monaco.languages.CompletionItem[] = []
  if (suggestion?.suggestions!.items !== undefined) {
    for (const resultElement of suggestion?.suggestions.items) {
      const textEdit: TextEdit | InsertReplaceEdit | undefined =
        resultElement.textEdit
      if (isTextEdit(textEdit)) {
        suggestions.push({
          label: resultElement.label,
          kind: resultElement.kind || monaco!.languages.CompletionItemKind.Text,
          insertText: resultElement.label,
          range: monaco!.Range.fromPositions({
            lineNumber: textEdit.range.start.line + 1,
            column: textEdit.range.start.character + 1,
          }),
          documentation: getDocumentationLabel(resultElement.label),
          detail: resultElement.detail,
        })
      }
    }
  }

  return suggestions
}
