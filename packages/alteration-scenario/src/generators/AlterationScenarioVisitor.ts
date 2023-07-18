import {
  ASTAllPlanes,
  ASTAlter,
  ASTAlterAndTrajectory,
  ASTAt,
  ASTAtFor,
  ASTCreate,
  ASTCreationParameter,
  ASTCreationParameters,
  ASTCut,
  ASTDeclaration,
  ASTDelay,
  ASTDelayParameter,
  ASTDoubleRange,
  ASTFilters,
  ASTHide,
  ASTHideParameter,
  ASTInstruction,
  ASTIntegerRange,
  ASTList,
  ASTListDeclaration,
  ASTOffsetList,
  ASTParamDrift,
  ASTParamEdit,
  ASTParameter,
  ASTParameters,
  ASTParamNoise,
  ASTParamOffset,
  ASTPlane,
  ASTRange,
  ASTRangeDeclaration,
  ASTReplay,
  ASTRotate,
  ASTRotateParameter,
  ASTSaturate,
  ASTSaturationParameter,
  ASTSaturationParameters,
  ASTScenario,
  ASTStringList,
  ASTTime,
  ASTTrajectory,
  ASTTrigger,
  ASTWayPoint,
  ASTWayPoints,
  ASTWindow,
} from '../language-server/generated/ast'
import { AstNode } from 'langium'

export abstract class AlterationScenarioVisitor<T> {
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
      case 'ASTList': {
        let astList: ASTList = node as ASTList
        let result: T = this.visitList(astList)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTOffsetList': {
        let astOffsetList: ASTOffsetList = node as ASTOffsetList
        let result: T = this.visitOffsetList(astOffsetList)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTStringList': {
        let astStringList: ASTStringList = node as ASTStringList
        let result: T = this.visitStringList(astStringList)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTRange': {
        let astRange: ASTRange = node as ASTRange
        let result: T = this.visitRange(astRange)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTIntegerRange': {
        let astIntegerRange: ASTIntegerRange = node as ASTIntegerRange
        let result: T = this.visitIntegerRange(astIntegerRange)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTDoubleRange': {
        let astDoubleRange: ASTDoubleRange = node as ASTDoubleRange
        let result: T = this.visitDoubleRange(astDoubleRange)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTAllPlanes': {
        let astAllPlanes: ASTAllPlanes = node as ASTAllPlanes
        let result: T = this.visitAllPlanes(astAllPlanes)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTPlane': {
        let astPlane: ASTPlane = node as ASTPlane
        let result: T = this.visitPlane(astPlane)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTTrigger': {
        let astTrigger: ASTTrigger = node as ASTTrigger
        let result: T = this.visitTrigger(astTrigger)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTFilters': {
        let astFilters: ASTFilters = node as ASTFilters
        let result: T = this.visitFilters(astFilters)
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
      case 'ASTTrajectory': {
        let astTrajectory: ASTTrajectory = node as ASTTrajectory
        let result: T = this.visitTrajectory(astTrajectory)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTCreate': {
        let astCreate: ASTCreate = node as ASTCreate
        let result: T = this.visitCreate(astCreate)
        if (result == null) result = this.visitInstruction(astCreate)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTSaturate': {
        let astSaturate: ASTSaturate = node as ASTSaturate
        let result: T = this.visitSaturate(astSaturate)
        if (result == null) result = this.visitInstruction(astSaturate)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTReplay': {
        let astReplay: ASTReplay = node as ASTReplay
        let result: T = this.visitReplay(astReplay)
        if (result == null) result = this.visitInstruction(astReplay)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTDelay': {
        let astDelay: ASTDelay = node as ASTDelay
        let result: T = this.visitDelay(astDelay)
        if (result == null) result = this.visitInstruction(astDelay)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTRotate': {
        let astRotate: ASTRotate = node as ASTRotate
        let result: T = this.visitRotate(astRotate)
        if (result == null) result = this.visitInstruction(astRotate)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTCut': {
        let astCut: ASTCut = node as ASTCut
        let result: T = this.visitCut(astCut)
        if (result == null) result = this.visitInstruction(astCut)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTHideParameter': {
        let astHideParameter: ASTHideParameter = node as ASTHideParameter
        let result: T = this.visitHideParameter(astHideParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTDelayParameter': {
        let astDelayParameter: ASTDelayParameter = node as ASTDelayParameter
        let result: T = this.visitDelayParameter(astDelayParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTRotateParameter': {
        let astRotateParameter: ASTRotateParameter = node as ASTRotateParameter
        let result: T = this.visitRotateParameter(astRotateParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTCreationParameters': {
        let astCreationParameters: ASTCreationParameters =
          node as ASTCreationParameters
        let result: T = this.visitCreationParameters(astCreationParameters)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTCreationParameter': {
        let astCreationParameter: ASTCreationParameter =
          node as ASTCreationParameter
        let result: T = this.visitCreationParameter(astCreationParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTSaturationParameters': {
        let astSaturationParameters: ASTSaturationParameters =
          node as ASTSaturationParameters
        let result: T = this.visitSaturationParameters(astSaturationParameters)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTSaturationParameter': {
        let astSaturationParameter: ASTSaturationParameter =
          node as ASTSaturationParameter
        let result: T = this.visitSaturationParameter(astSaturationParameter)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTAt': {
        let astAt: ASTAt = node as ASTAt
        let result: T = this.visitAt(astAt)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTWindow': {
        let astWindow: ASTWindow = node as ASTWindow
        let result: T = this.visitWindow(astWindow)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTAtFor': {
        let astAtFor: ASTAtFor = node as ASTAtFor
        let result: T = this.visitAtFor(astAtFor)
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
      case 'ASTWayPoints': {
        let astWayPoints: ASTWayPoints = node as ASTWayPoints
        let result: T = this.visitWayPoints(astWayPoints)
        if (result == null) result = this.defaultCase(node)
        return result
      }
      case 'ASTWayPoint': {
        let astWayPoint: ASTWayPoint = node as ASTWayPoint
        let result: T = this.visitWayPoint(astWayPoint)
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
  abstract visitList(node: ASTList): T
  abstract visitOffsetList(node: ASTOffsetList): T
  abstract visitStringList(node: ASTStringList): T
  abstract visitRange(node: ASTRange): T
  abstract visitIntegerRange(node: ASTIntegerRange): T
  abstract visitDoubleRange(node: ASTDoubleRange): T
  abstract visitTrigger(node: ASTTrigger): T
  abstract visitFilters(node: ASTFilters): T

  abstract visitAllPlanes(node: ASTAllPlanes): T
  abstract visitPlane(node: ASTPlane): T
  abstract visitHide(node: ASTHide): T
  abstract visitAlterAndTrajectory(node: ASTAlterAndTrajectory): T
  abstract visitAlter(node: ASTAlter): T
  abstract visitTrajectory(node: ASTTrajectory): T
  abstract visitCreate(node: ASTCreate): T
  abstract visitSaturate(node: ASTSaturate): T
  abstract visitReplay(node: ASTReplay): T
  abstract visitDelay(node: ASTDelay): T
  abstract visitRotate(node: ASTRotate): T
  abstract visitCut(node: ASTCut): T

  abstract visitHideParameter(node: ASTHideParameter): T
  abstract visitDelayParameter(node: ASTDelayParameter): T
  abstract visitRotateParameter(node: ASTRotateParameter): T
  abstract visitCreationParameters(node: ASTCreationParameters): T
  abstract visitCreationParameter(node: ASTCreationParameter): T

  abstract visitSaturationParameters(node: ASTSaturationParameters): T
  abstract visitSaturationParameter(node: ASTSaturationParameter): T

  abstract visitTime(node: ASTTime): T

  abstract visitAt(node: ASTAt): T
  abstract visitAtFor(node: ASTAtFor): T
  abstract visitWindow(node: ASTWindow): T
  abstract visitParameter(node: ASTParameter): T
  abstract visitParameters(node: ASTParameters): T
  abstract visitParamEdit(node: ASTParamEdit): T
  abstract visitParamOffset(node: ASTParamOffset): T
  abstract visitParamNoise(node: ASTParamNoise): T
  abstract visitParamDrift(node: ASTParamDrift): T
  abstract visitWayPoints(node: ASTWayPoints): T
  abstract visitWayPoint(node: ASTWayPoint): T

  abstract defaultCase(node: Object): T
}
