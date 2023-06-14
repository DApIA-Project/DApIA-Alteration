import {
  ASTAllPlanes,
  ASTAlter,
  ASTAlterAndTrajectory,
  ASTAt,
  ASTDeclaration,
  ASTHide,
  ASTHideParameter,
  ASTInstruction,
  ASTListDeclaration,
  ASTParamDrift,
  ASTParamEdit,
  ASTParameter,
  ASTParameters,
  ASTParameterType,
  ASTParamNoise,
  ASTParamOffset,
  ASTPlane,
  ASTRangeDeclaration,
  ASTScenario,
  ASTTarget,
  ASTTime,
  ASTTimeScope,
} from '../language-server/generated/ast'
import { AstNode } from 'langium'

export abstract class FditScenarioVisitor<T> {
  doSwitch(node: AstNode): T {
    console.log(node.$type)
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
      case 'ASTAlterAndTrajectory': {
        let astAlterAndTrajectory: ASTAlterAndTrajectory =
          node as ASTAlterAndTrajectory
        let result: T = this.visitAlterAndTrajectory(astAlterAndTrajectory)
        if (result == null)
          result = this.visitInstruction(astAlterAndTrajectory)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTAlter': {
        let astAlter: ASTAlter = node as ASTAlter
        let result: T = this.visitAlter(astAlter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTHideParameter': {
        let astHideParameter: ASTHideParameter = node as ASTHideParameter
        let result: T = this.visitHideParameter(astHideParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTAt': {
        let astAt: ASTAt = node as ASTAt
        let result: T = this.visitAt(astAt)
        if (result == null) result = this.visitTimeScope(astAt)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTTimeScope': {
        let astTimeScope: ASTTimeScope = node as ASTTimeScope
        let result: T = this.visitTimeScope(astTimeScope)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTTime': {
        let astTime: ASTTime = node as ASTTime
        let result: T = this.visitTime(astTime)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTParameters': {
        let astParameters: ASTParameters = node as ASTParameters
        let result: T = this.visitParameters(astParameters)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTParameter': {
        let astParameter: ASTParameter = node as ASTParameter
        let result: T = this.visitParameter(astParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTParameterType': {
        let astParameterType: ASTParameterType = node as ASTParameterType
        let result: T = this.visitParameterType(astParameterType)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTParamEdit': {
        let astParamEdit: ASTParamEdit = node as ASTParamEdit
        let result: T = this.visitParamEdit(astParamEdit)
        if (result == null) result = this.visitParameter(astParamEdit)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTParamOffset': {
        let astParamOffset: ASTParamOffset = node as ASTParamOffset
        let result: T = this.visitParamOffset(astParamOffset)
        if (result == null) result = this.visitParameter(astParamOffset)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTParamNoise': {
        let astParamNoise: ASTParamNoise = node as ASTParamNoise
        let result: T = this.visitParamNoise(astParamNoise)
        if (result == null) result = this.visitParameter(astParamNoise)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTParamDrift': {
        let astParamDrift: ASTParamDrift = node as ASTParamDrift
        let result: T = this.visitParamDrift(astParamDrift)
        if (result == null) result = this.visitParameter(astParamDrift)
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
  abstract visitAlterAndTrajectory(node: ASTAlterAndTrajectory): T
  abstract visitAlter(node: ASTAlter): T

  abstract visitHideParameter(node: ASTHideParameter): T

  abstract visitTimeScope(node: ASTTimeScope): T

  abstract visitTime(node: ASTTime): T

  abstract visitAt(node: ASTAt): T
  abstract visitParameter(node: ASTParameter): T
  abstract visitParameters(node: ASTParameters): T
  abstract visitParameterType(node: ASTParameterType): T
  abstract visitParamEdit(node: ASTParamEdit): T
  abstract visitParamOffset(node: ASTParamOffset): T
  abstract visitParamNoise(node: ASTParamNoise): T
  abstract visitParamDrift(node: ASTParamDrift): T

  abstract defaultCase(node: Object): T
}
