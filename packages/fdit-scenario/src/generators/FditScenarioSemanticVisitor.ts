import { FditScenarioVisitor } from './FditScenarioVisitor'
import {
  ASTAllPlanes,
  ASTAlter,
  ASTAlterAndTrajectory,
  ASTAt,
  ASTDeclaration,
  ASTHide,
  ASTHideParameter,
  ASTInstruction,
  ASTIntegerValue,
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
  ASTValue,
  isASTConstantValue,
  isASTDoubleValue,
  isASTHide,
  isASTIntegerValue,
  isASTLeftShift,
  isASTParameters,
  isASTRightShift,
  isASTStringValue,
} from '../language-server/generated/ast'
import { SemanticError } from './index'

type Predicate<T> = (arg: T) => boolean

export class FditScenarioSemanticVisitor extends FditScenarioVisitor<
  SemanticError[]
> {
  visitScenario(node: ASTScenario): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    for (const decl of node.declarations) {
      semanticError.push(...this.doSwitch(decl))
    }
    for (const instr of node.instructions) {
      semanticError.push(...this.doSwitch(instr))
    }

    return semanticError
  }

  //TODO
  visitListDeclaration(node: ASTListDeclaration): SemanticError[] {
    return []
  }

  //TODO
  visitRangeDeclaration(node: ASTRangeDeclaration): SemanticError[] {
    return []
  }

  visitHide(node: ASTHide): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node.target))
    semanticError.push(...this.doSwitch(node.timeScope))
    if (node.frequency != undefined) {
      semanticError.push(...this.doSwitch(node.frequency))
    }
    if (node.trigger != undefined) {
      semanticError.push(...this.doSwitch(node.trigger))
    }
    if (node.assertions != undefined) {
      semanticError.push(...this.doSwitch(node.assertions))
    }
    return semanticError
  }

  visitHideParameter(node: ASTHideParameter): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    if (this.isAnOffset(node.value)) {
      return [
        {
          errors: 'error.offset' + '\n',
          position: {
            startline: node.value.$cstNode?.range.start.line,
            endline: node.value.$cstNode?.range.end.line,
            startcolumn: node.value.$cstNode?.range.start.character,
            endcolumn: node.value.$cstNode?.range.end.character,
          },
        },
      ]
    }
    return this.computeIntError(node.value, 'frequency')
  }

  visitAlterAndTrajectory(node: ASTAlterAndTrajectory): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
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
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node.parameters))
    if (node.assertions != undefined) {
      semanticError.push(...this.doSwitch(node.assertions))
    }
    return semanticError
  }

  isAnOffset(value: ASTValue): boolean {
    if (value === undefined) {
      return false
    }
    return isASTLeftShift(value) || isASTRightShift(value)
  }

  computeIntError(integer: ASTValue, name: string): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (integer === undefined) {
      return semanticError
    }
    let errors: string = ''
    if (isASTDoubleValue(integer)) {
      errors +=
        'Bad type : ' +
        name +
        ' : Integer expected but found Double : ' +
        integer.content +
        '\n'
    }
    let content: string = ''
    if (isASTIntegerValue(integer)) {
      content = integer.content.toString()
    }
    if (isASTStringValue(integer)) {
      content = integer.content
    }
    if (!this.isIntValid(content)) {
      errors +=
        'Bad value : ' +
        name +
        ' : Integer expected but found ' +
        content +
        '\n'
    }

    let position = {
      startline: integer.$cstNode?.range.start.line,
      endline: integer.$cstNode?.range.end.line,
      startcolumn: integer.$cstNode?.range.start.character,
      endcolumn: integer.$cstNode?.range.end.character,
    }
    let error = {
      errors: errors,
      position: position,
    }

    semanticError.push(error)

    return semanticError
  }

  isIntValid(content: string): boolean {
    if (/\./.test(content)) {
      return false
    }
    if (/\,/.test(content)) {
      return false
    }

    try {
      parseInt(content)
      return true
    } catch (error) {
      return false
    }
  }

  defaultCase(node: Object): SemanticError[] {
    return []
  }

  visitDeclaration(node: ASTDeclaration): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node))

    return semanticError
  }

  visitInstruction(node: ASTInstruction): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node))
    return semanticError
  }

  //TODO A faire avec les filter
  visitAllPlanes(node: ASTAllPlanes): SemanticError[] {
    return []
  }

  //TODO A faire avec les filter
  visitPlane(node: ASTPlane): SemanticError[] {
    return []
  }

  visitTarget(node: ASTTarget): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node))
    return semanticError
  }

  visitAt(node: ASTAt): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node.time))
    return semanticError
  }

  visitTimeScope(node: ASTTimeScope): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node))
    return semanticError
  }

  visitTime(node: ASTTime): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors: string = ''
    const time: ASTValue = node.realTime
    if (isASTIntegerValue(time)) {
      return this.computeTimeError(time.content, time)
    } else if (isASTRightShift(time) || isASTLeftShift(time)) {
      errors +=
        'A time cannot be a shift : ' +
        node.$cstNode?.parent?.text +
        ' ' +
        time.content
    } else if (isASTConstantValue(time)) {
      //TODO Gestion de la mémoire pour les constantes et les variables
    } else {
      errors +=
        'Bad time type. Integer expected : ' + node.realTime.content + '\n'
    }

    let position = {
      startline: time.$cstNode?.range.start.line,
      endline: time.$cstNode?.range.end.line,
      startcolumn: time.$cstNode?.range.start.character,
      endcolumn: time.$cstNode?.range.end.character,
    }
    let error = {
      errors: errors,
      position: position,
    }

    semanticError.push(error)

    return semanticError
  }

  computeTimeError(integer: number, time: ASTIntegerValue): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors: string = ''
    if (integer < 0) {
      errors += "A time can't be negative : " + integer
    }
    //TODO Récupérer temps total de l'enregistrement pour vérifier cas integer > temps enregistrement

    let position = {
      startline: time.$cstNode?.range.start.line,
      endline: time.$cstNode?.range.end.line,
      startcolumn: time.$cstNode?.range.start.character,
      endcolumn: time.$cstNode?.range.end.character,
    }
    let error = {
      errors: errors,
      position: position,
    }

    semanticError.push(error)
    return semanticError
  }

  visitParameters(node: ASTParameters): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    let errors: string = ''
    for (const parameter of node.items) {
      if (this.isDuplicateParameter(node, parameter.name.$cstNode?.text!)) {
        errors += 'Duplicate parameter : ' + parameter.name.$cstNode?.text!
        break
      }
    }
    let position = {
      startline: node.$cstNode?.range.start.line,
      endline: node.$cstNode?.range.end.line,
      startcolumn: node.$cstNode?.range.start.character,
      endcolumn: node.$cstNode?.range.end.character,
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

  visitParameter(node: ASTParameter): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors: string = ''
    let characteristicName = node.name.$cstNode?.text
    if (characteristicName === undefined) {
      return semanticError
    }

    if (isASTLeftShift(node.value) || isASTRightShift(node.value)) {
      errors +=
        'A value of parameter cannot be a shift : ' +
        node.$cstNode?.parent?.text
      let position = {
        startline: node.$cstNode?.range.start.line,
        endline: node.$cstNode?.range.end.line,
        startcolumn: node.$cstNode?.range.start.character,
        endcolumn: node.$cstNode?.range.end.character,
      }
      let error = {
        errors: errors,
        position: position,
      }

      semanticError.push(error)
      return semanticError
    }

    //TODO Case where value == ConstantValue (range and list)

    return this.computeParameterValueError(characteristicName, node.value)
  }

  isDuplicateParameter(node: ASTParameters, name: string): boolean {
    if (isASTParameters(node)) {
      if (this.countNumberOfOneParameter(node, name) > 1) {
        return true
      }
    }
    return false
  }

  countNumberOfOneParameter(node: ASTParameters, name: string): number {
    let cpt: number = 0
    for (const parameter of node.items) {
      if (parameter.name.$cstNode?.text === name) {
        cpt++
      }
    }
    return cpt
  }

  visitParameterType(node: ASTParameterType): SemanticError[] {
    return []
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
        semanticError = this.computeErrorTrack(value)
        break
    }
    return semanticError
  }

  computeErrorAltitude(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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
    if (isNaN(parseFloat(content))) {
      let errors = 'Bad Value. Expected a float value.'
      let position = {
        startline: value.$cstNode?.range.start.line,
        endline: value.$cstNode?.range.end.line,
        startcolumn: value.$cstNode?.range.start.character,
        endcolumn: value.$cstNode?.range.end.character,
      }
      let error: SemanticError = {
        errors: errors,
        position: position,
      }
      semanticError.push(error)
    }

    return semanticError
  }

  computeErrorCallsign(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
    let errors = ''
    let content: string = ''
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

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)

    return semanticError
  }

  computeErrorEmergency(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)
    return semanticError
  }

  computeErrorGroundspeed(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)

    return semanticError
  }

  computeErrorIcao(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)
    return semanticError
  }

  computeErrorLatitude(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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
    if (isNaN(parseFloat(content))) {
      errors = 'LATITUDE expected a float value :' + content + '\n'
    } else {
      let valueInFloat = parseFloat(content)
      if (valueInFloat < -90 || valueInFloat > 90) {
        errors = 'LATITUDE must be between -90 and 90 :' + content + '\n'
      }
    }

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)
    return semanticError
  }

  computeErrorLongitude(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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
    if (isNaN(parseFloat(content))) {
      errors = 'LONGITUDE expected a float value :' + content + '\n'
    } else {
      let valueInFloat = parseFloat(content)
      if (valueInFloat < -180 || valueInFloat > 180) {
        errors = 'LONGITUDE must be between -180 and 180 :' + content + '\n'
      }
    }

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)
    return semanticError
  }

  computeErrorSpi(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)
    return semanticError
  }

  computeErrorSquawk(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)
    return semanticError
  }

  computeErrorTrack(value: ASTValue): SemanticError[] {
    let semanticError: SemanticError[] = []
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

    let valueInFloat: number = parseFloat(content)

    if (
      !(/^\d+(\.\d)?$/.test(content) && valueInFloat >= 0 && valueInFloat < 360)
    ) {
      errors +=
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "' +
        content +
        '"\n'
    }

    let position = {
      startline: value.$cstNode?.range.start.line,
      endline: value.$cstNode?.range.end.line,
      startcolumn: value.$cstNode?.range.start.character,
      endcolumn: value.$cstNode?.range.end.character,
    }
    let error: SemanticError = {
      errors: errors,
      position: position,
    }
    semanticError.push(error)

    return semanticError
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
}
