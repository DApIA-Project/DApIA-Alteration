import { editor } from 'monaco-editor'
import IModel = editor.IModel
import {
  parseScenario,
  Suggestion,
} from '@smartesting/alteration-scenario/dist/parser/parser'
import * as monaco from 'monaco-editor'
import { getSemantic } from '../../components/business/AlterationScenarioEditor/utils/getSemantic'
import { SemanticError } from '@smartesting/alteration-scenario/dist/generators'
import { AlterationScenarioSemanticVisitor } from '@smartesting/alteration-scenario/dist/generators/AlterationScenarioSemanticVisitor'
import IMarkerData = editor.IMarkerData
import ITextModel = editor.ITextModel

type Monaco =
  typeof import('C:/Users/morga/Documents/Programmation/DApIA-Alteration/packages/client/node_modules/monaco-editor/esm/vs/editor/editor.api')

async function validate(
  monaco: Monaco,
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

  const scenarioAst = await callParseScenario(model, 1, 1, line, column)

  const visitor = new AlterationScenarioSemanticVisitor()
  const semanticErrors: SemanticError[] = visitor.visitScenario(scenarioAst)
  markers.push(...getSemantic(model, semanticErrors))

  monaco!.editor.setModelMarkers(model, 'owner', markers)
}

function validateSemantic(
  monaco: Monaco,
  model: IModel,
  semanticErrors: SemanticError[]
) {
  const markers = getSemantic(model, semanticErrors)
  monaco!.editor.setModelMarkers(model, 'owner', markers)
}

async function callParseScenario(
  model: ITextModel,
  startLineNumber: number,
  startColumn: number,
  endLineNumber: number,
  endColumn: number
) {
  const scenarioAst = await parseScenario(
    model.getValueInRange({
      startLineNumber: startLineNumber,
      startColumn: startColumn,
      endLineNumber: endLineNumber,
      endColumn: endColumn,
    })
  )

  return scenarioAst.value
}

export async function checkSemantic(
  monaco: Monaco,
  model: IModel,
  suggestion: Suggestion,
  position: monaco.IPosition
) {
  if (suggestion.errors.lexer.length !== 0) {
    await validate(
      monaco,
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
        monaco,
        model,
        token.startColumn || 0,
        length,
        suggestion.errors.parser[0].message,
        token.startLine || 0
      )
    } else {
      const scenarioAst = await callParseScenario(
        model,
        1,
        1,
        position.lineNumber,
        position.column
      )
      const visitor = new AlterationScenarioSemanticVisitor()
      const semanticErrors: SemanticError[] = visitor.visitScenario(scenarioAst)
      validateSemantic(monaco, model, semanticErrors)
    }
  }
}
