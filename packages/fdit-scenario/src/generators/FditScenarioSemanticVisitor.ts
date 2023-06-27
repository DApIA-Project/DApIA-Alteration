import { FditScenarioVisitor } from './FditScenarioVisitor'
import {
  ASTAllPlanes,
  ASTAlter,
  ASTAlterAndTrajectory,
  ASTAt,
  ASTAtFor,
  ASTConstantValue,
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
  ASTIntegerValue,
  ASTList,
  ASTListDeclaration,
  ASTNumberOffset,
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
  ASTValue,
  ASTWayPoint,
  ASTWayPoints,
  ASTWindow,
  isASTConstantValue,
  isASTDoubleValue,
  isASTIntegerValue,
  isASTLeftShift,
  isASTParameters,
  isASTRightShift,
  isASTStringValue,
} from '../language-server/generated/ast'
import { SemanticError } from './index'
import { AstNode } from 'langium'
import { Memory } from './Memory/Memory'
import { Constant } from './Memory/Constant'
import { ConstantTypes } from './Memory/ConstantTypes'
import { isRangeConstant } from './Memory/isRangeConstant'
import { isListConstant } from './Memory/isListConstant'

export class FditScenarioSemanticVisitor extends FditScenarioVisitor<
  SemanticError[]
> {
  private memory: Memory

  constructor(memory?: Memory) {
    super()
    if (memory != undefined) {
      this.memory = memory
    } else {
      this.memory = new Memory()
    }
  }

  visitScenario(node: ASTScenario): SemanticError[] {
    let semanticError: SemanticError[] = []
    for (const decl of node.declarations) {
      semanticError.push(...this.doSwitch(decl))
    }
    for (const instr of node.instructions) {
      semanticError.push(...this.doSwitch(instr))
    }

    return semanticError
  }

  visitListDeclaration(node: ASTListDeclaration): SemanticError[] {
    let semanticError: SemanticError[] = []
    let list = this.visitList(node.list)
    semanticError.push()
    return semanticError
  }

  visitRangeDeclaration(node: ASTRangeDeclaration): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.range))
    return semanticError
  }

  visitList(node: ASTList): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.list))
    return semanticError
  }
  visitOffsetList(node: ASTOffsetList): SemanticError[] {
    let semanticError: SemanticError[] = []
    return semanticError
  }
  visitStringList(node: ASTStringList): SemanticError[] {
    let semanticError: SemanticError[] = []
    return semanticError
  }

  visitRange(node: ASTRange): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.range))
    return semanticError
  }
  visitIntegerRange(node: ASTIntegerRange): SemanticError[] {
    let semanticError: SemanticError[] = []
    return semanticError
  }
  visitDoubleRange(node: ASTDoubleRange): SemanticError[] {
    let semanticError: SemanticError[] = []
    return semanticError
  }

  visitTrigger(node: ASTTrigger): SemanticError[] {
    return this.buildError(node, 'Trigger is not yet implemented !')
  }

  visitHide(node: ASTHide): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))
    if (node.frequency != undefined) {
      semanticError.push(...this.doSwitch(node.frequency))
    }
    if (node.trigger != undefined) {
      semanticError.push(...this.doSwitch(node.trigger))
    }
    return semanticError
  }

  visitHideParameter(node: ASTHideParameter): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (this.isAnOffset(node.value)) {
      return this.buildError(node, 'error.offset' + '\n')
    }

    return this.computeIntError(node.value, 'Frequency')
  }

  visitAlterAndTrajectory(node: ASTAlterAndTrajectory): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))
    if (node.trigger != undefined) {
      semanticError.push(...this.doSwitch(node.trigger))
    }
    semanticError.push(...this.doSwitch(node.mode))
    return semanticError
  }

  visitAlter(node: ASTAlter): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.parameters))
    return semanticError
  }

  visitTrajectory(node: ASTTrajectory): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.trajectory))
    return semanticError
  }

  visitCreate(node: ASTCreate): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.timeScope))
    semanticError.push(...this.doSwitch(node.trajectory))
    if (node.parameters != undefined) {
      semanticError.push(...this.doSwitch(node.parameters))
    }
    return semanticError
  }

  visitSaturate(node: ASTSaturate): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))

    if (node.trigger != undefined) {
      semanticError.push(...this.doSwitch(node.trigger))
    }
    semanticError.push(...this.doSwitch(node.parameters))
    return semanticError
  }

  visitCreationParameters(node: ASTCreationParameters): SemanticError[] {
    return this.visitAllParameters(node)
  }

  visitCreationParameter(node: ASTCreationParameter): SemanticError[] {
    let errors: string = ''
    let characteristicName = node.name.$cstNode!.text

    if (isASTLeftShift(node.value) || isASTRightShift(node.value)) {
      errors +=
        'A value of parameter cannot be a shift : ' +
        node.$cstNode!.parent!.text
      return this.buildError(node, errors)
    }

    return this.computeCreationParameterValueError(
      characteristicName!,
      node.value
    )
  }

  visitSaturationParameters(node: ASTSaturationParameters): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node.items.length != 2) {
      semanticError.push(
        ...this.buildError(
          node,
          'Number of parameters expected is 2 : ' + node.items.length + ' found'
        )
      )
    }

    semanticError.push(...this.visitAllParameters(node))
    return semanticError
  }

  visitSaturationParameter(node: ASTSaturationParameter): SemanticError[] {
    let errors: string = ''
    let characteristicName = node.name.$cstNode!.text

    if (isASTLeftShift(node.value) || isASTRightShift(node.value)) {
      errors +=
        'A value of parameter cannot be a shift : ' +
        node.$cstNode!.parent!.text
      return this.buildError(node, errors)
    }

    return this.computeSaturationParameterValueError(
      characteristicName!,
      node.value
    )
  }

  visitReplay(node: ASTReplay): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))
    if (node.parameters != undefined) {
      semanticError.push(...this.doSwitch(node.parameters))
    }
    return semanticError
  }

  visitDelay(node: ASTDelay): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))
    semanticError.push(...this.doSwitch(node.delay))
    return semanticError
  }

  visitDelayParameter(node: ASTDelayParameter): SemanticError[] {
    return this.doSwitch(node.value)
  }

  visitRotate(node: ASTRotate): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))
    if (node.trigger != undefined) {
      semanticError.push(...this.doSwitch(node.trigger))
    }
    semanticError.push(...this.doSwitch(node.angle))
    return semanticError
  }

  visitRotateParameter(node: ASTRotateParameter): SemanticError[] {
    let errors: string = ''

    if (isASTLeftShift(node.value) || isASTRightShift(node.value)) {
      errors +=
        'A value of parameter cannot be a shift : ' +
        node.$cstNode!.parent!.text
      return this.buildError(node, errors)
    }

    return this.computeErrorTrack(node.value, 'Angle')
  }

  visitCut(node: ASTCut): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))
    if (node.trigger != undefined) {
      semanticError.push(...this.doSwitch(node.trigger))
    }
    return semanticError
  }

  visitDeclaration(node: ASTDeclaration): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node))
    return semanticError
  }

  visitInstruction(node: ASTInstruction): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node))
    return semanticError
  }

  visitAllPlanes(node: ASTAllPlanes): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node.filters != undefined) {
      return this.doSwitch(node.filters)
    }

    return semanticError
  }

  visitPlane(node: ASTPlane): SemanticError[] {
    return this.doSwitch(node.filters)
  }

  visitFilters(node: ASTFilters): SemanticError[] {
    return this.buildError(node, 'Filters is not yet implemented !')
  }

  visitWindow(node: ASTWindow): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.start))
    semanticError.push(...this.doSwitch(node.end))
    return semanticError
  }

  visitAt(node: ASTAt): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.time))
    if (node.for != undefined) {
      semanticError.push(...this.doSwitch(node.for))
    }
    return semanticError
  }

  visitAtFor(node: ASTAtFor): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.doSwitch(node.for))
    return semanticError
  }

  visitTime(node: ASTTime): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors: string = ''
    const time: ASTValue = node.realTime
    if (isASTIntegerValue(time)) {
      return this.computeTimeError(time.content, time)
    } else if (isASTRightShift(time) || isASTLeftShift(time)) {
      errors += 'A time cannot be a shift : ' + node.$cstNode!.parent!.text
    } else if (isASTConstantValue(time)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(time.content)
      if (constant === undefined) {
        return this.buildError(node, 'Variable ' + time.content + ' not found')
      } else {
        if (isRangeConstant(constant)) {
          const valuesRange: number[] = []
          valuesRange.push(constant.getStart() - 1)
          valuesRange.push(constant.getStart() + 1)
          valuesRange.push(constant.getEnd() - 1)
          valuesRange.push(constant.getEnd() + 1)

          for (const valueRange of valuesRange) {
            if (this.isIntValid(valueRange.toString())) {
              semanticError.push(...this.computeTimeError(valueRange, time))
            } else {
              return this.buildError(
                time,
                'Time must be an Integer : ' + time.content + '\n'
              )
            }
          }

          return semanticError
        }
        if (isListConstant(constant)) {
          for (const value of constant.getValues()) {
            if (typeof value === 'string') {
              return this.buildError(node, 'Time must be an Integer\n')
            } else if (typeof value === 'number') {
              if (this.isIntValid(value.toString())) {
                semanticError.push(...this.computeTimeError(value, time))
              } else {
                return this.buildError(time, 'Time must be an Integer\n')
              }
            }
          }

          return semanticError
        }
      }
    } else {
      errors +=
        'Bad time type. Integer expected : ' + node.realTime.content + '\n'
    }

    return this.buildError(time, errors)
  }

  visitParameters(node: ASTParameters): SemanticError[] {
    return this.visitAllParameters(node)
  }

  visitParameter(node: ASTParameter): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors: string = ''
    let characteristicName = node.name.$cstNode!.text

    if (isASTLeftShift(node.value) || isASTRightShift(node.value)) {
      errors +=
        'A value of parameter cannot be a shift : ' +
        node.$cstNode!.parent!.text
      return this.buildError(node, errors)
    }

    if (isASTConstantValue(node.value)) {
      semanticError.push(
        ...this.computeParameterValueError(characteristicName!, node.value)
      )
      return semanticError
    }

    return this.computeParameterValueError(characteristicName!, node.value)
  }

  visitParamDrift(node: ASTParamDrift): SemanticError[] {
    return this.visitParameter(node)
  }

  visitParamEdit(node: ASTParamEdit): SemanticError[] {
    return this.visitParameter(node)
  }

  visitParamNoise(node: ASTParamNoise): SemanticError[] {
    return this.visitParameter(node)
  }

  visitParamOffset(node: ASTParamOffset): SemanticError[] {
    return this.visitParameter(node)
  }

  visitWayPoints(node: ASTWayPoints): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors: string = ''
    let position = {
      startline: node.$cstNode!.range.start.line,
      endline: node.$cstNode!.range.end.line,
      startcolumn: node.$cstNode!.range.start.character,
      endcolumn: node.$cstNode!.range.end.character,
    }
    let error = {
      errors: errors,
      position: position,
    }

    semanticError.push(error)

    for (const waypoint of node.waypoints) {
      semanticError.push(...this.doSwitch(waypoint))
    }

    return semanticError
  }

  visitWayPoint(node: ASTWayPoint): SemanticError[] {
    let semanticError: SemanticError[] = []
    semanticError.push(...this.computeErrorAltitude(node.altitude))
    semanticError.push(...this.computeErrorLatitude(node.latitude))
    semanticError.push(...this.computeErrorLongitude(node.longitude))
    semanticError.push(...this.doSwitch(node.time))
    return semanticError
  }

  visitAllParameters(
    node: ASTParameters | ASTCreationParameters | ASTSaturationParameters
  ): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors: string = ''
    for (const parameter of node.items) {
      if (this.isDuplicateParameter(node, parameter.name.$cstNode!.text!)) {
        errors += 'Duplicate parameter : ' + parameter.name.$cstNode!.text!
        break
      }
    }
    let position = {
      startline: node.$cstNode!.range.start.line,
      endline: node.$cstNode!.range.end.line,
      startcolumn: node.$cstNode!.range.start.character,
      endcolumn: node.$cstNode!.range.end.character,
    }
    let error = {
      errors: errors,
      position: position,
    }

    semanticError.push(error)

    for (const parameter of node.items) {
      semanticError.push(...this.doSwitch(parameter))
    }

    return semanticError
  }

  defaultCase(node: Object): SemanticError[] {
    return []
  }

  computeTimeError(
    integer: number,
    time: ASTIntegerValue | ASTConstantValue
  ): SemanticError[] {
    let errors: string = ''
    if (integer < 0) {
      errors += "A time can't be negative : " + integer
    }
    //TODO Récupérer temps total de l'enregistrement pour vérifier cas integer > temps enregistrement

    return this.buildError(time, errors)
  }

  computeIntError(integer: ASTValue, name: string): SemanticError[] {
    let errors: string = ''
    if (isASTDoubleValue(integer)) {
      errors +=
        'Bad type : ' +
        name +
        ' : Integer expected but found Double : ' +
        integer.content +
        '\n'
      return this.buildError(integer, errors)
    }
    let content: string = ''
    if (isASTIntegerValue(integer)) {
      content = integer.content.toString()
    }
    if (isASTStringValue(integer)) {
      content = integer.content.replace(/"/g, '')
    }

    if (isASTConstantValue(integer)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(integer.content)
      if (constant === undefined) {
        return this.buildError(
          integer,
          'Variable ' + integer.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          const valuesRange: number[] = []
          valuesRange.push(constant.getStart() - 1)
          valuesRange.push(constant.getStart() + 1)
          valuesRange.push(constant.getEnd() - 1)
          valuesRange.push(constant.getEnd() + 1)

          for (const valueRange of valuesRange) {
            if (!this.isIntValid(valueRange.toString())) {
              errors +=
                'Bad value : ' +
                name +
                ' : Integer expected but found ' +
                valueRange +
                '\n'
            }
          }
        }
        if (isListConstant(constant)) {
          for (const value of constant.getValues()) {
            if (typeof value === 'string') {
              content = value
            } else {
              content = value.toString()
            }

            if (!this.isIntValid(content)) {
              errors +=
                'Bad value : ' +
                name +
                ' : Integer expected but found ' +
                content +
                '\n'
            }
          }
        }
      }
    } else {
      if (!this.isIntValid(content)) {
        errors +=
          'Bad value : ' +
          name +
          ' : Integer expected but found ' +
          content +
          '\n'
      }
    }

    return this.buildError(integer, errors)
  }

  computeParameterValueError(
    characName: string,
    value: ASTValue
  ): SemanticError[] {
    let semanticError: SemanticError[] = []
    switch (characName) {
      case 'ALTITUDE':
        semanticError = this.computeErrorAltitude(value)
        break
      case 'CALLSIGN':
        semanticError = this.computeErrorCallsign(value)
        break
      case 'EMERGENCY':
        semanticError = this.computeErrorEmergency(value)
        break
      case 'GROUNDSPEED':
        semanticError = this.computeErrorGroundspeed(value)
        break
      case 'ICAO':
        semanticError = this.computeErrorIcao(value)
        break
      case 'LATITUDE':
        semanticError = this.computeErrorLatitude(value)
        break
      case 'LONGITUDE':
        semanticError = this.computeErrorLongitude(value)
        break
      case 'SPI':
        semanticError = this.computeErrorSpi(value)
        break
      case 'SQUAWK':
        semanticError = this.computeErrorSquawk(value)
        break
      case 'TRACK':
        semanticError = this.computeErrorTrack(value, 'TRACK')
        break
    }
    return semanticError
  }

  computeCreationParameterValueError(
    characName: string,
    value: ASTValue
  ): SemanticError[] {
    let semanticError: SemanticError[] = []
    switch (characName) {
      case 'CALLSIGN':
        semanticError = this.computeErrorCallsign(value)
        break
      case 'EMERGENCY':
        semanticError = this.computeErrorEmergency(value)
        break
      case 'ICAO':
        semanticError = this.computeErrorIcao(value)
        break
      case 'SPI':
        semanticError = this.computeErrorSpi(value)
        break
      case 'ALERT':
        semanticError = this.computeErrorAlert(value)
        break
    }
    return semanticError
  }

  computeSaturationParameterValueError(
    characName: string,
    value: ASTValue
  ): SemanticError[] {
    let semanticError: SemanticError[] = []
    switch (characName) {
      case 'ICAO':
        semanticError = this.computeErrorIcao(value)
        break
      case 'NUMBER':
        semanticError = this.computeIntError(value, 'Number Aircraft')
        break
    }
    return semanticError
  }

  computeErrorAltitude(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      content = value.content.toString()
    }
    if (isASTIntegerValue(value)) {
      content = value.content.toString()
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          const valuesRange: number[] = []
          valuesRange.push(constant.getStart() - 1)
          valuesRange.push(constant.getStart() + 1)
          valuesRange.push(constant.getEnd() - 1)
          valuesRange.push(constant.getEnd() + 1)

          for (const valRange of valuesRange) {
            if (
              parseFloat(valRange.toString()) < -1000 ||
              parseFloat(valRange.toString()) > 50175
            ) {
              errors +=
                'ALTITUDE must be between -1000 and 50175 : ' +
                valRange.toString() +
                ' found\n'
            }
          }
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (isNaN(parseFloat(valList.toString()))) {
              errors +=
                'Bad Value. Expected a float value : ' +
                valList.toString() +
                ' found\n'
            } else {
              if (
                parseFloat(valList.toString()) < -1000 ||
                parseFloat(valList.toString()) > 50175
              ) {
                errors +=
                  'ALTITUDE must be between -1000 and 50175 : ' +
                  valList.toString() +
                  ' found\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    if (isNaN(parseFloat(content))) {
      errors = 'Bad Value. Expected a float value.'
    } else {
      if (parseFloat(content) < -1000 || parseFloat(content) > 50175) {
        errors = 'ALTITUDE must be between -1000 and 50175'
      }
    }
    return this.buildError(value, errors)
  }

  computeErrorCallsign(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          errors = 'Range is not possible for CALLSIGN\n'
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (typeof valList === 'number') {
              if (Number.isInteger(valList)) {
                if (valList.toString().length > 8) {
                  errors +=
                    "CALLSIGN can't have more than 8 digits in the case of an integer: " +
                    valList.toString() +
                    '\n'
                }
                if (valList < 0) {
                  errors +=
                    "CALLSIGN can't be negative in the case of an integer : " +
                    valList.toString() +
                    '\n'
                }
              } else {
                errors +=
                  "CALLSIGN can't be a double : " + valList.toString() + '\n'
              }
            } else {
              content = valList.toString().replace(/"/g, '')
              if (content.length < 1) {
                errors +=
                  'CALLSIGN can\'t be empty in the case of a string : "' +
                  content +
                  '"\n'
              }
              if (content.length > 8) {
                errors +=
                  'CALLSIGN can\'t have more than 8 symbols in the case of a string : "' +
                  content +
                  '"\n'
              }
              if (!/^[A-Z0-9\s]+$/.test(content)) {
                errors +=
                  'CALLSIGN can have only uppercase and/or digit in the case of a string : "' +
                  content +
                  '"\n'
              }
              if (!/^[^\s]+$/.test(content)) {
                errors +=
                  'CALLSIGN can\'t contain whitespaces in the case of a string : "' +
                  content +
                  '"\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    if (isASTDoubleValue(value)) {
      errors +=
        "CALLSIGN can't be a double : " + value.content.toString() + '\n'
    }
    if (isASTIntegerValue(value)) {
      if (value.content.toString().length > 8) {
        errors +=
          "CALLSIGN can't have more than 8 digits in the case of an integer: " +
          value.content.toString() +
          '\n'
      }
      if (value.content.toString()[0] === '0') {
        errors +=
          "CALLSIGN can't start with 0 in the case of an integer : " +
          value.content.toString() +
          '\n'
      }
      if (value.content < 0) {
        errors +=
          "CALLSIGN can't be negative in the case of an integer : " +
          value.content.toString() +
          '\n'
      }
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
      if (content.length < 1) {
        errors +=
          'CALLSIGN can\'t be empty in the case of a string : "' +
          content +
          '"\n'
      }
      if (content.length > 8) {
        errors +=
          'CALLSIGN can\'t have more than 8 symbols in the case of a string : "' +
          content +
          '"\n'
      }
      if (!/^[A-Z0-9\s]+$/.test(content)) {
        errors +=
          'CALLSIGN can have only uppercase and/or digit in the case of a string : "' +
          content +
          '"\n'
      }
      if (!/^[^\s]+$/.test(content)) {
        errors +=
          'CALLSIGN can\'t contain whitespaces in the case of a string : "' +
          content +
          '"\n'
      }
    }

    return this.buildError(value, errors)
  }

  computeErrorEmergency(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      errors +=
        "EMERGENCY can't be a double : " + value.content.toString() + '\n'
    }
    if (isASTIntegerValue(value)) {
      if (value.content != 0 && value.content != 1) {
        errors +=
          'EMERGENCY must be 0 or 1 in the case of an integer: ' +
          value.content.toString() +
          '\n'
      }
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
      if (content !== '0' && content !== '1') {
        errors +=
          'EMERGENCY must be "0" or "1" in the case of a string: "' +
          content +
          '"\n'
      }
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          errors = 'Range is not possible for EMERGENCY\n'
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (typeof valList === 'number') {
              if (Number.isInteger(valList)) {
                if (valList != 0 && valList != 1) {
                  errors +=
                    'EMERGENCY must be 0 or 1 in the case of an integer: ' +
                    valList.toString() +
                    '\n'
                }
              } else {
                errors +=
                  "EMERGENCY can't be a double : " + valList.toString() + '\n'
              }
            } else {
              if (valList !== '0' && valList !== '1') {
                errors +=
                  'EMERGENCY must be "0" or "1" in the case of a string: "' +
                  valList +
                  '"\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    return this.buildError(value, errors)
  }

  computeErrorGroundspeed(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      content = value.content.toString()
    }
    if (isASTIntegerValue(value)) {
      content = value.content.toString()
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          const valuesRange: number[] = []
          valuesRange.push(constant.getStart() - 1)
          valuesRange.push(constant.getStart() + 1)
          valuesRange.push(constant.getEnd() - 1)
          valuesRange.push(constant.getEnd() + 1)

          for (const valRange of valuesRange) {
            let valueInFloat: number = parseFloat(valRange.toString())

            if (
              !(
                /^\d+(\.\d)?$/.test(valRange.toString()) &&
                valueInFloat >= 0 &&
                valueInFloat <= 1446
              )
            ) {
              errors +=
                'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "' +
                valRange.toString() +
                '"\n'
            }
          }
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            let valueInFloat: number = parseFloat(valList.toString())

            if (
              !(
                /^\d+(\.\d)?$/.test(valList.toString()) &&
                valueInFloat >= 0 &&
                valueInFloat <= 1446
              )
            ) {
              errors +=
                'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "' +
                valList.toString() +
                '"\n'
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    let valueInFloat: number = parseFloat(content)

    if (
      !(
        /^\d+(\.\d)?$/.test(content) &&
        valueInFloat >= 0 &&
        valueInFloat <= 1446
      )
    ) {
      errors +=
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "' +
        content +
        '"\n'
    }

    return this.buildError(value, errors)
  }

  computeErrorIcao(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      errors += "ICAO can't be a double : " + value.content.toString() + '\n'
    }
    if (isASTIntegerValue(value)) {
      if (value.content.toString().length != 6) {
        errors +=
          'ICAO length must be 6 in the case of an integer: ' +
          value.content.toString() +
          '\n'
      }
      if (value.content < 100000 || value.content > 999999) {
        errors +=
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: ' +
          value.content.toString() +
          '\n'
      }
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
      if (!/^(([0-9A-F]{6})|RANDOM)$/.test(content)) {
        errors +=
          'ICAO value must be 6 symbol hexadecimal or RANDOM in the case of a string: "' +
          content +
          '"\n'
      }
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          errors = 'Range is not possible for ICAO\n'
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (typeof valList === 'number') {
              if (Number.isInteger(valList)) {
                if (valList.toString().length != 6) {
                  errors +=
                    'ICAO length must be 6 in the case of an integer: ' +
                    valList.toString() +
                    '\n'
                }
                if (valList < 100000 || valList > 999999) {
                  errors +=
                    'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: ' +
                    valList.toString() +
                    '\n'
                }
              } else {
                errors +=
                  "ICAO can't be a double : " + valList.toString() + '\n'
              }
            } else {
              if (!/^(([0-9A-F]{6})|RANDOM)$/.test(valList.toString())) {
                errors +=
                  'ICAO value must be 6 symbol hexadecimal and uppercase or RANDOM in the case of a string: "' +
                  valList.toString() +
                  '"\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }
    return this.buildError(value, errors)
  }

  computeErrorLatitude(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      content = value.content.toString()
    }
    if (isASTIntegerValue(value)) {
      content = value.content.toString()
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          const valuesRange: number[] = []
          valuesRange.push(constant.getStart() - 1)
          valuesRange.push(constant.getStart() + 1)
          valuesRange.push(constant.getEnd() - 1)
          valuesRange.push(constant.getEnd() + 1)

          for (const valRange of valuesRange) {
            let valueInFloat = parseFloat(valRange.toString())
            if (valueInFloat < -90 || valueInFloat > 90) {
              errors +=
                'LATITUDE must be between -90 and 90 : ' +
                valRange.toString() +
                '\n'
            }
          }
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (isNaN(parseFloat(valList.toString()))) {
              errors +=
                'LATITUDE expected a float value : ' + valList.toString() + '\n'
            } else {
              let valueInFloat = parseFloat(valList.toString())
              if (valueInFloat < -90 || valueInFloat > 90) {
                errors +=
                  'LATITUDE must be between -90 and 90 : ' +
                  valList.toString() +
                  '\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    if (isNaN(parseFloat(content))) {
      errors = 'LATITUDE expected a float value : ' + content + '\n'
    } else {
      let valueInFloat = parseFloat(content)
      if (valueInFloat < -90 || valueInFloat > 90) {
        errors = 'LATITUDE must be between -90 and 90 : ' + content + '\n'
      }
    }

    return this.buildError(value, errors)
  }

  computeErrorLongitude(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      content = value.content.toString()
    }
    if (isASTIntegerValue(value)) {
      content = value.content.toString()
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          const valuesRange: number[] = []
          valuesRange.push(constant.getStart() - 1)
          valuesRange.push(constant.getStart() + 1)
          valuesRange.push(constant.getEnd() - 1)
          valuesRange.push(constant.getEnd() + 1)

          for (const valRange of valuesRange) {
            let valueInFloat = parseFloat(valRange.toString())
            if (valueInFloat < -180 || valueInFloat > 180) {
              errors +=
                'LONGITUDE must be between -180 and 180 : ' +
                valRange.toString() +
                '\n'
            }
          }
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (isNaN(parseFloat(valList.toString()))) {
              errors +=
                'LONGITUDE expected a float value : ' +
                valList.toString() +
                '\n'
            } else {
              let valueInFloat = parseFloat(valList.toString())
              if (valueInFloat < -180 || valueInFloat > 180) {
                errors +=
                  'LONGITUDE must be between -180 and 180 : ' +
                  valList.toString() +
                  '\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }
    if (isNaN(parseFloat(content))) {
      errors = 'LONGITUDE expected a float value :' + content + '\n'
    } else {
      let valueInFloat = parseFloat(content)
      if (valueInFloat < -180 || valueInFloat > 180) {
        errors = 'LONGITUDE must be between -180 and 180 :' + content + '\n'
      }
    }

    return this.buildError(value, errors)
  }

  computeErrorSpi(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      errors += "SPI can't be a double : " + value.content.toString() + '\n'
    }
    if (isASTIntegerValue(value)) {
      if (value.content != 0 && value.content != 1) {
        errors +=
          'SPI must be 0 or 1 in the case of an integer: ' +
          value.content.toString() +
          '\n'
      }
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
      if (content !== '0' && content !== '1') {
        errors +=
          'SPI must be "0" or "1" in the case of a string: "' + content + '"\n'
      }
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          errors = 'Range is not possible for SPI\n'
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (typeof valList === 'number') {
              if (Number.isInteger(valList)) {
                if (valList != 0 && valList != 1) {
                  errors +=
                    'SPI must be 0 or 1 in the case of an integer: ' +
                    valList.toString() +
                    '\n'
                }
              } else {
                errors += "SPI can't be a double : " + valList.toString() + '\n'
              }
            } else {
              if (valList.toString() !== '0' && valList.toString() !== '1') {
                errors +=
                  'SPI must be "0" or "1" in the case of a string: "' +
                  valList.toString() +
                  '"\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    return this.buildError(value, errors)
  }

  computeErrorSquawk(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTDoubleValue(value)) {
      errors += "SQUAWK can't be a double : " + value.content.toString() + '\n'
    }
    if (isASTIntegerValue(value)) {
      if (value.content.toString().length != 4) {
        errors +=
          'SQUAWK length must be 4 in the case of an integer: ' +
          value.content.toString() +
          '\n'
      }
      if (value.content < 1000 || value.content > 7777) {
        errors +=
          'SQUAWK value must be between 1000 and 7777 inclusive in the case of an integer: ' +
          value.content.toString() +
          '\n'
      }
      if (!/^([0-7]{4})$/.test(value.content.toString())) {
        errors +=
          'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "' +
          value.content.toString() +
          '"\n'
      }
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
      if (!/^([0-7]{4})$/.test(content)) {
        errors +=
          'SQUAWK value must be 4 symbol between 0 and 7  in the case of a string: "' +
          content +
          '"\n'
      }
    }

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          errors = 'Range is not possible for SQUAWK\n'
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (typeof valList === 'number') {
              if (Number.isInteger(valList)) {
                if (valList.toString().length != 4) {
                  errors +=
                    'SQUAWK length must be 4 in the case of an integer: ' +
                    valList.toString() +
                    '\n'
                }
                if (valList < 1000 || valList > 7777) {
                  errors +=
                    'SQUAWK value must be between 1000 and 7777 inclusive in the case of an integer: ' +
                    valList.toString() +
                    '\n'
                }
                if (!/^([0-7]{4})$/.test(valList.toString())) {
                  errors +=
                    'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "' +
                    valList.toString() +
                    '"\n'
                }
              } else {
                errors +=
                  "SQUAWK can't be a double : " + valList.toString() + '\n'
              }
            } else {
              if (!/^([0-7]{4})$/.test(valList.toString())) {
                errors +=
                  'SQUAWK value must be 4 symbol between 0 and 7  in the case of a string: "' +
                  valList.toString() +
                  '"\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    return this.buildError(value, errors)
  }

  computeErrorTrack(value: ASTValue, name: string): SemanticError[] {
    let errors = ''
    let content: string = ''
    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          errors = 'Range is not possible for ' + name + '\n'
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            let valueInFloat: number = parseFloat(valList.toString())

            if (
              !(
                /^\d+(\.\d)?$/.test(valList.toString()) &&
                valueInFloat >= 0 &&
                valueInFloat < 360
              )
            ) {
              errors +=
                name +
                ' must be between 0 and 360 with a maximum precision of 0.1: "' +
                valList.toString() +
                '"\n'
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    if (isASTDoubleValue(value)) {
      content = value.content.toString()
    }
    if (isASTIntegerValue(value)) {
      content = value.content.toString()
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
    }

    let valueInFloat: number = parseFloat(content)

    if (
      !(/^\d+(\.\d)?$/.test(content) && valueInFloat >= 0 && valueInFloat < 360)
    ) {
      errors +=
        name +
        ' must be between 0 and 360 with a maximum precision of 0.1: "' +
        content +
        '"\n'
    }

    return this.buildError(value, errors)
  }

  computeErrorAlert(value: ASTValue): SemanticError[] {
    let errors = ''
    let content: string = ''

    if (isASTConstantValue(value)) {
      let constant: Constant<ConstantTypes> | undefined =
        this.memory.getConstant(value.content)
      if (constant === undefined) {
        return this.buildError(
          value,
          'Variable ' + value.content + ' not found'
        )
      } else {
        if (isRangeConstant(constant)) {
          errors = 'Range is not possible for ALERT\n'
          return this.buildError(value, errors)
        }

        if (isListConstant(constant)) {
          for (const valList of constant.getValues()) {
            if (typeof valList === 'number') {
              if (Number.isInteger(valList)) {
                if (valList != 0 && valList != 1) {
                  errors +=
                    'ALERT must be 0 or 1 in the case of an integer: ' +
                    valList.toString() +
                    '\n'
                }
              } else {
                errors +=
                  "ALERT can't be a double : " + valList.toString() + '\n'
              }
            } else {
              if (valList.toString() !== '0' && valList.toString() !== '1') {
                errors +=
                  'ALERT must be "0" or "1" in the case of a string: "' +
                  valList.toString() +
                  '"\n'
              }
            }
          }
          return this.buildError(value, errors)
        }
      }
    }

    if (isASTDoubleValue(value)) {
      errors += "ALERT can't be a double : " + value.content.toString() + '\n'
    }
    if (isASTIntegerValue(value)) {
      if (value.content != 0 && value.content != 1) {
        errors +=
          'ALERT must be 0 or 1 in the case of an integer: ' +
          value.content.toString() +
          '\n'
      }
    }
    if (isASTStringValue(value)) {
      content = value.content.replace(/"/g, '')
      if (content !== '0' && content !== '1') {
        errors +=
          'ALERT must be "0" or "1" in the case of a string: "' +
          content +
          '"\n'
      }
    }

    return this.buildError(value, errors)
  }

  isDuplicateParameter(
    node: ASTParameters | ASTCreationParameters | ASTSaturationParameters,
    name: string
  ): boolean {
    if (isASTParameters(node)) {
      if (this.countNumberOfOneParameter(node, name) > 1) {
        return true
      }
    }
    return false
  }

  countNumberOfOneParameter(
    node: ASTParameters | ASTCreationParameters | ASTSaturationParameters,
    name: string
  ): number {
    let cpt: number = 0
    for (const parameter of node.items) {
      if (parameter.name.$cstNode!.text === name) {
        cpt++
      }
    }
    return cpt
  }

  isIntValid(content: string): boolean {
    if (/\./.test(content)) {
      return false
    }
    if (/\,/.test(content)) {
      return false
    }

    if (isNaN(parseInt(content))) {
      return false
    }
    return true
  }

  isAnOffset(value: ASTValue): boolean {
    return isASTLeftShift(value) || isASTRightShift(value)
  }

  buildError(value: AstNode, errors: string): SemanticError[] {
    let semanticError: SemanticError[] = []
    let position = {
      startline: value.$cstNode!.range.start.line,
      endline: value.$cstNode!.range.end.line,
      startcolumn: value.$cstNode!.range.start.character,
      endcolumn: value.$cstNode!.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)
    return semanticError
  }
}
