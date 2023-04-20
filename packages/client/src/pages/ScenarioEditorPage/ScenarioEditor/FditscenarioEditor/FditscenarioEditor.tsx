import React, { useEffect } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { editor, languages } from 'monaco-editor'
import * as parser from '@smartesting/fdit-scenario/dist/parser/parser'
import FDITSCENARIO_FORMAT from '../../../../fditscenario'
import './FditscenarioEditor.css'
import { CompletionList } from 'vscode-languageserver-types'
import IModel = editor.IModel
import CompletionItemProvider = languages.CompletionItemProvider

type FditscenarioEditorProps = {
  className: string
}

const FditscenarioEditor: React.FunctionComponent<FditscenarioEditorProps> = ({
  className,
}) => {
  const monaco = useMonaco()

  function createCompletionProvider(): CompletionItemProvider | undefined {
    if (!monaco) return
    return {
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

        console.log(completionList)
        const suggestions: monaco.languages.CompletionItem[] = []
        let wordList: string[] = []

        if (completionList?.items !== undefined) {
          for (const resultElement of completionList?.items) {
            console.log({ resultElement })
            suggestions.push({
              label: resultElement.label,
              kind:
                resultElement.kind || monaco.languages.CompletionItemKind.Text,
              insertText: 'test',
              range: monaco.Range.fromPositions(position),
            })
          }
          console.log(wordList)
          /*for (const wordListElement of wordList) {
                        suggestions.push(
                            {
                                label: wordListElement,
                                kind: monaco.languages.CompletionItemKind.Text,
                                insertText: wordListElement,
                                range: monaco.Range.fromPositions(position),
                            }
                        )
                    }*/
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
    if (!monaco) return
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
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
    <div id={'monaco-editor-root'} className={className}>
      <Editor defaultLanguage='fditscenario' theme={'vs-dark'} />
    </div>
  )
}
export default FditscenarioEditor
