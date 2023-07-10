import { DefaultCompletionProvider } from 'langium/lib/lsp/completion/completion-provider'
import * as ast from 'langium/lib/grammar/generated/ast'
import { MaybePromise } from 'langium/lib/utils/promise-util'
import { CompletionItemKind } from 'vscode-languageserver'
import {
  CompletionAcceptor,
  CompletionContext,
} from 'langium/lib/lsp/completion/completion-provider'

export class AlterationscenarioCompletionProvider extends DefaultCompletionProvider {
  protected completionForKeyword(
    context: CompletionContext,
    keyword: ast.Keyword,
    acceptor: CompletionAcceptor
  ): MaybePromise<void> {
    // Filter out keywords that do not contain any word character
    if (!keyword.value.match(/^.+$/)) {
      return
    }
    acceptor({
      label: keyword.value,
      kind: CompletionItemKind.Keyword,
      detail: 'Keyword',
      sortText: '1',
    })
  }
}
