import { ParserErrors } from '@smartesting/alteration-scenario/dist/parser/parser'
import { editor, MarkerSeverity } from 'monaco-editor'
import IMarkerData = editor.IMarkerData

export function getParserMarkers(parserErrors: ParserErrors): IMarkerData[] {
  let markers: IMarkerData[] = []
  if (parserErrors.lexer.length !== 0) {
    for (const lexerError of parserErrors.lexer) {
      let range = {
        startLineNumber: lexerError.line || 0,
        startColumn: lexerError.column || 0,
        endLineNumber: lexerError.line || 0,
        endColumn: (lexerError.column || 0) + lexerError.length,
      }

      markers.push({
        message: lexerError.message,
        severity: MarkerSeverity.Error,
        startLineNumber: range.startLineNumber,
        startColumn: range.startColumn,
        endLineNumber: range.endLineNumber,
        endColumn: range.endColumn,
      })
    }
  }

  if (parserErrors.parser.length !== 0) {
    for (const parserError of parserErrors.parser) {
      let range = {
        startLineNumber:
          parserError.token.startLine ||
          (parserErrors.lexer.length !== 0
            ? parserErrors.lexer[0].line
            : parserErrors.parser.length !== 0
            ? parserErrors.parser[0].token.startLine
            : 0),
        startColumn: parserError.token.startColumn || 0,
        endLineNumber:
          parserError.token.endLine ||
          (parserErrors.lexer.length !== 0
            ? parserErrors.lexer[0].line
            : parserErrors.parser.length !== 0
            ? parserErrors.parser[0].token.endLine
            : 0),
        endColumn: parserError.token.endColumn || 0,
      }
      if (range.startLineNumber === undefined) {
        range.startLineNumber = 0
      }
      if (range.endLineNumber === undefined) {
        range.endLineNumber = 0
      }
      markers.push({
        message: parserError.message,
        severity: MarkerSeverity.Error,
        startLineNumber: range.startLineNumber,
        startColumn: range.startColumn,
        endLineNumber: range.endLineNumber,
        endColumn: range.endColumn,
      })
    }
  }

  return markers
}
