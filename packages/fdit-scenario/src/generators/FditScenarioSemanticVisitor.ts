import { FditScenarioVisitor } from './FditScenarioVisitor'
import {
  ASTAllPlanes,
  ASTDeclaration,
  ASTHide,
  ASTHideParameter,
  ASTInstruction,
  ASTIntegerValue,
  ASTListDeclaration,
  ASTPlane,
  ASTRangeDeclaration,
  ASTScenario,
  ASTTarget,
  ASTValue,
  isASTDoubleValue,
  isASTHide,
  isASTIntegerValue,
  isASTLeftShift,
  isASTRightShift,
  isASTStringValue,
} from '../language-server/generated/ast'
import { SemanticError } from './index'

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

  /** A faire **/
  visitListDeclaration(node: ASTListDeclaration): SemanticError[] {
    return []
  }

  /** A faire **/
  visitRangeDeclaration(node: ASTRangeDeclaration): SemanticError[] {
    return []
  }

  visitHide(node: ASTHide): SemanticError[] {
    let semanticError: SemanticError[] = []
    if (node === undefined) {
      return semanticError
    }
    semanticError.push(...this.doSwitch(node.target))
    //semanticError.push(...this.doSwitch(node.timeScope))
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
    console.log(integer.$cstNode?.length)
    console.log(integer.$cstNode?.end)
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
    return [
      {
        errors: errors,
        position: {
          startline: integer.$cstNode?.range.start.line,
          endline: integer.$cstNode?.range.end.line,
          startcolumn: integer.$cstNode?.range.start.character,
          endcolumn: integer.$cstNode?.range.end.character,
        },
      },
    ]
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

  visitAllPlanes(node: ASTAllPlanes): SemanticError[] {
    return []
  }

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
}
