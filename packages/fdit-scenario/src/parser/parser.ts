import { EmptyFileSystem, LangiumDocument, ParseResult } from 'langium'
import { ASTScenario } from '../language-server/generated/ast'
import { createFditscenarioServices } from '../language-server/fditscenario-module'
import { URI } from 'vscode-uri'
import { CompletionList } from 'vscode-languageserver-types'

/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @returns A promise for the parsed result of the document
 */
export async function parseScenario(
  content: string
): Promise<ParseResult<ASTScenario>> {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario
  const document: LangiumDocument =
    services.shared.workspace.LangiumDocumentFactory.fromString(
      content,
      URI.parse('memory://fditscenario.document')
    )

  // proceed with build & validation
  await services.shared.workspace.DocumentBuilder.build([document], {
    validationChecks: 'all',
  })
  return {
    ...document.parseResult,
    value: document.parseResult.value as ASTScenario,
  }
}

export async function getSuggestions(
  content: string,
  line: number,
  column: number
): Promise<CompletionList | undefined> {
  const services = createFditscenarioServices(EmptyFileSystem).Fditscenario
  const document: LangiumDocument =
    services.shared.workspace.LangiumDocumentFactory.fromString(
      content,
      URI.parse('memory://fditscenario.document')
    )

  return services.lsp.CompletionProvider?.getCompletion(document, {
    textDocument: document.textDocument,
    position: { line: line, character: column },
  })
}
