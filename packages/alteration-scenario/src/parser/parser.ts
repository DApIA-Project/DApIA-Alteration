import { EmptyFileSystem, LangiumDocument, ParseResult } from 'langium'
import { ASTScenario } from '../language-server/generated/ast'
import { createAlterationscenarioServices } from '../language-server/alterationscenario-module'
import { URI } from 'vscode-uri'
import { CompletionList } from 'vscode-languageserver-types'
import { ILexingError, IRecognitionException } from 'chevrotain'

/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @returns A promise for the parsed result of the document
 */
export async function parseScenario(
  content: string
): Promise<ParseResult<ASTScenario>> {
  const services =
    createAlterationscenarioServices(EmptyFileSystem).Alterationscenario
  const document: LangiumDocument =
    services.shared.workspace.LangiumDocumentFactory.fromString(
      content,
      URI.parse('memory://alterationscenario.document')
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

export type Suggestion = {
  suggestions?: CompletionList
  errors: { parser: IRecognitionException[]; lexer: ILexingError[] }
}

export type ParserErrors = {
  lexer: ILexingError[]
  parser: IRecognitionException[]
}

export async function getSuggestions(
  content: string,
  line: number,
  column: number
): Promise<Suggestion> {
  const services =
    createAlterationscenarioServices(EmptyFileSystem).Alterationscenario
  const document: LangiumDocument =
    services.shared.workspace.LangiumDocumentFactory.fromString(
      content,
      URI.parse('memory://alterationscenario.document')
    )

  const suggestions: CompletionList | undefined =
    await services.lsp.CompletionProvider?.getCompletion(document, {
      textDocument: document.textDocument,
      position: { line: line, character: column },
    })

  return {
    suggestions: suggestions,
    errors: {
      lexer: document.parseResult.lexerErrors,
      parser: document.parseResult.parserErrors,
    },
  }
}

export async function getParserErrors(content: string): Promise<ParserErrors> {
  const services =
    createAlterationscenarioServices(EmptyFileSystem).Alterationscenario
  const document: LangiumDocument =
    services.shared.workspace.LangiumDocumentFactory.fromString(
      content,
      URI.parse('memory://alterationscenario.document')
    )

  return {
    lexer: document.parseResult.lexerErrors,
    parser: document.parseResult.parserErrors,
  }
}
