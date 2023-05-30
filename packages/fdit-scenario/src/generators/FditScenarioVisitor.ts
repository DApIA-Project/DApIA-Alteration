import {
  ASTAllPlanes,
  ASTDeclaration,
  ASTHide,
  ASTHideParameter,
  ASTInstruction,
  ASTListDeclaration,
  ASTPlane,
  ASTRangeDeclaration,
  ASTScenario,
  ASTTarget,
} from '../language-server/generated/ast'
import { AstNode } from 'langium'

export abstract class FditScenarioVisitor<T> {
  doSwitch(node: AstNode): T {
    switch (node.$type) {
      case 'ASTScenario': {
        let astScenario: ASTScenario = node as ASTScenario
        let result: T = this.visitScenario(astScenario)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTDeclaration': {
        let astDeclaration: ASTDeclaration = node as ASTDeclaration
        let result: T = this.visitDeclaration(astDeclaration)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTInstruction': {
        let astInstruction: ASTInstruction = node as ASTInstruction
        let result: T = this.visitInstruction(astInstruction)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTListDeclaration': {
        let astListDeclaration: ASTListDeclaration = node as ASTListDeclaration
        let result: T = this.visitListDeclaration(astListDeclaration)
        if (result == null) result = this.visitDeclaration(astListDeclaration)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTRangeDeclaration': {
        let astRangeDeclaration: ASTRangeDeclaration =
          node as ASTRangeDeclaration
        let result: T = this.visitRangeDeclaration(astRangeDeclaration)
        if (result == null) result = this.visitDeclaration(astRangeDeclaration)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTTarget': {
        let astTarget: ASTTarget = node as ASTTarget
        let result: T = this.visitTarget(astTarget)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTAllPlanes': {
        let astAllPlanes: ASTAllPlanes = node as ASTAllPlanes
        let result: T = this.visitAllPlanes(astAllPlanes)
        if (result == null) result = this.visitTarget(astAllPlanes)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTPlane': {
        let astPlane: ASTPlane = node as ASTPlane
        let result: T = this.visitPlane(astPlane)
        if (result == null) result = this.visitTarget(astPlane)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTHide': {
        let astHide: ASTHide = node as ASTHide
        let result: T = this.visitHide(astHide)
        if (result == null) result = this.visitInstruction(astHide)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTHideParameter': {
        let astHideParameter: ASTHideParameter = node as ASTHideParameter
        let result: T = this.visitHideParameter(astHideParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      default:
        throw new Error('Unsupported node')
    }
  }
  abstract visitScenario(node: ASTScenario): T
  abstract visitDeclaration(node: ASTDeclaration): T

  abstract visitInstruction(node: ASTInstruction): T

  abstract visitListDeclaration(node: ASTListDeclaration): T
  abstract visitRangeDeclaration(node: ASTRangeDeclaration): T

  abstract visitTarget(node: ASTTarget): T
  abstract visitAllPlanes(node: ASTAllPlanes): T
  abstract visitPlane(node: ASTPlane): T
  abstract visitHide(node: ASTHide): T

  abstract visitHideParameter(node: ASTHideParameter): T

  abstract defaultCase(node: Object): T
}
