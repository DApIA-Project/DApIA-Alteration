import {
  getParserErrors,
  ParserErrors,
  parseScenario,
} from '@smartesting/alteration-scenario/dist/parser/parser'
import { getSemanticMarkers } from '../getSemanticMarkers/getSemanticMarkers'
import { SemanticError } from '@smartesting/alteration-scenario/dist/generators'
import { AlterationScenarioSemanticVisitor } from '@smartesting/alteration-scenario/dist/generators/AlterationScenarioSemanticVisitor'
import { URI } from 'vscode-uri'
import { getParserMarkers } from '../getParserMarkers/getParserMarkers'

type Monaco =
  typeof import('../../../../../../../client/node_modules/monaco-editor/esm/vs/editor/editor.api')

export async function applyErrorColoring(monaco: Monaco, scenario: string) {
  const scenarioAst = await parseScenario(scenario)
  const visitor = new AlterationScenarioSemanticVisitor()
  const parserErrors: ParserErrors = await getParserErrors(scenario)
  const parserMarkers = getParserMarkers(parserErrors)
  const semanticErrors: SemanticError[] = visitor.visitScenario(
    scenarioAst.value
  )
  const semanticMarkers = getSemanticMarkers(semanticErrors)
  const model = monaco.editor.getModel(URI.parse('inmemory://model/1'))
  const allErrors = parserMarkers.concat(semanticMarkers)

  if (model !== null) {
    monaco!.editor.setModelMarkers(model, 'owner', allErrors)
  }
}
