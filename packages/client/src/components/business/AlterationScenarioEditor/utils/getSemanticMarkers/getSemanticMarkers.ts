import { SemanticError } from '@smartesting/alteration-scenario/dist/generators'
import { editor, MarkerSeverity } from 'monaco-editor'
import IMarkerData = editor.IMarkerData

export function getSemanticMarkers(
  semanticErrors: SemanticError[]
): IMarkerData[] {
  const markers: IMarkerData[] = []
  for (const error of semanticErrors) {
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
        severity: MarkerSeverity.Info,
        startLineNumber: range2.startLineNumber,
        startColumn: range2.startColumn,
        endLineNumber: range2.endLineNumber,
        endColumn: range2.endColumn,
      })
    }
  }
  return markers
}
