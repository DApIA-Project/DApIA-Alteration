import { EmptyFileSystem, LangiumServices } from 'langium'
import { createFditscenarioServices } from '../../language-server/fditscenario-module'
import { parseScenario } from '../../parser/parser'
import assert from 'assert'
import { generateStatements } from '../../generators/generator'
import { FditScenarioSemanticVisitor } from '../../generators/FditScenarioSemanticVisitor'
import { SemanticError } from '../../generators'
import {
  isASTHide,
  isASTListDeclaration,
  isASTRangeDeclaration,
} from '../../language-server/generated/ast'

describe('FditScenarioSemanticVisitor', () => {
  context('Test visitScenario with no error', () => {
    it('returns error empty when node is empty', async () => {
      const scenario = await parseScenario('')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 0)
    })
    it('returns error empty when scenario is with decls and instrs valid', async () => {
      const scenario = await parseScenario(
        'let $test= {1,2,3}, hide all_planes at 0 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })
  context('Test visitDeclaration with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'let $test= {1,2,3}, hide all_planes at 0 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitDeclaration(
        scenario.value.declarations[0]
      )

      assert.deepStrictEqual(semanticError.length, 0)
    })
  })
  context('Test visitListDeclaration with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'let $test= {1,2,3}, hide all_planes at 0 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitDeclaration(
        scenario.value.declarations[0]
      )
      assert.deepStrictEqual(semanticError.length, 0)
    })
  })
  context('Test visitRangeDeclaration with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'let $test= [1,3], hide all_planes at 0 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitDeclaration(
        scenario.value.declarations[0]
      )

      assert.deepStrictEqual(semanticError.length, 0)
    })
  })

  context('Test visitInstruction with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario('hide all_planes at 0 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitHide with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario('hide all_planes at 0 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int in string', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency "2"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int in string', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency -2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int in string', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency "-2"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  context('Test visitHide with error', () => {
    it('returns error trigger when scenario use trigger', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds triggered_by "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Trigger is not yet implemented !'
      )
    })

    it('returns error frequency when frequency is offset', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency >> 7'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, 'error.offset\n')
    })

    it('returns error frequency when frequency is double', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency 7.2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad type : Frequency : Integer expected but found Double : 7.2\n'
      )
    })

    it('returns error frequency when frequency is double in string', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency "7.2"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad value : Frequency : Integer expected but found 7.2\n'
      )
    })

    it('returns error frequency when frequency is double in string with comma', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency "7,2"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad value : Frequency : Integer expected but found 7,2\n'
      )
    })

    it('returns error frequency when frequency is string', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad value : Frequency : Integer expected but found test\n'
      )
    })
  })

  context('Test visitTimescope with no error', () => {
    it('returns error empty when scenario is valid with at', async () => {
      const scenario = await parseScenario('hide all_planes at 0 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })

    it('returns error empty when scenario is valid with atFor', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds for 2 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with window', async () => {
      const scenario = await parseScenario(
        'hide all_planes from 0 seconds until 2 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  context('Test visitTime with no error', () => {
    it('returns error empty when scenario is valid with seconds who are int', async () => {
      const scenario = await parseScenario('hide all_planes at 2 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitTime with error', () => {
    it('returns error when scenario is no valid with seconds who are string', async () => {
      const scenario = await parseScenario('hide all_planes at "2" seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Bad time type. Integer expected : "2"\n'
      )
    })

    it('returns error when scenario is no valid with seconds who are double', async () => {
      const scenario = await parseScenario('hide all_planes at 2.9 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Bad time type. Integer expected : 2.9\n'
      )
    })

    it('returns error when scenario is no valid with seconds who are rightshift', async () => {
      const scenario = await parseScenario('hide all_planes at >> 2 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'A time cannot be a shift : at >> 2 seconds'
      )
    })

    it('returns error when scenario is no valid with seconds who are leftshift', async () => {
      const scenario = await parseScenario('hide all_planes at << 2 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'A time cannot be a shift : at << 2 seconds'
      )
    })

    it('returns error when scenario is no valid with seconds who are negatives', async () => {
      const scenario = await parseScenario('hide all_planes at -2 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        "A time can't be negative : -2"
      )
    })
  })

  context('Test visitAlter with no error', () => {
    it('returns error empty when scenario alter altitude with int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = 10000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with drift', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE ++= 10000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with noise', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE *= 10000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with offset', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE += 10000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = "10000"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int negative in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = "-100"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int negative', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = -100'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = 100.7'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = "100.7"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter callsign with int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = 10000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter callsign with string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "SAMU28"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter emergency with int 1', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = 1'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter emergency with int 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = 0'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter emergency with string "0"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = "0"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter emergency with string "1"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = "1"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with int ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = 3'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with double ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = 3.7'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = "3"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = "3.7"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "A4A4A4"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = 234567'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in string who are RANDOM', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "RANDOM"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 66'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 66.789'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter latitude double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "66.789"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "66"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = 160'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = 166.789'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter longitude double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = "166.789"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = "166"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter spi with int 1', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = 1'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter spi with int 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = 0'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter spi with string "0"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = "0"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter spi with string "1"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = "1"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter squawk with string ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = "4667"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter squawk with int ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = 4667'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with int ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = 3'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with double ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = 3.7'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = "3"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = "3.7"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
  })

  context('Test visitAlter with error', () => {
    it('returns error when scenario alter altitude is too high', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = 100000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ALTITUDE must be between -1000 and 50175'
      )
    })

    it('returns error when scenario alter altitude is too small', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = -10000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ALTITUDE must be between -1000 and 50175'
      )
    })

    it('returns error when scenario alter altitude is string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Bad Value. Expected a float value.'
      )
    })

    it('returns error when scenario alter parameter have a rightshift', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = >> 3'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'A value of parameter cannot be a shift : with_values ALTITUDE = >> 3'
      )
    })

    it('returns error when scenario alter parameter have a leftshift', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = << 3'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'A value of parameter cannot be a shift : with_values ALTITUDE = << 3'
      )
    })

    it('returns error trigger when scenario alter use trigger', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds triggered_by "test" with_values ALTITUDE = 1000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Trigger is not yet implemented !'
      )
    })

    it('returns error when scenario alter callsign is double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = 1000.6'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "CALLSIGN can't be a double : 1000.6\n"
      )
    })

    it('returns error when scenario alter callsign is int with more than 8 digit', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = 111111111'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "CALLSIGN can't have more than 8 digits in the case of an integer: 111111111\n"
      )
    })

    it('returns error when scenario alter callsign is int begin with 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = 01111'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "CALLSIGN can't start with 0 in the case of an integer : 0\n"
      )
    })

    it('returns error when scenario alter callsign is int negative', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = -111'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "CALLSIGN can't be negative in the case of an integer : -111\n"
      )
    })

    it('returns error when scenario alter callsign is string empty', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = ""'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t be empty in the case of a string : ""\n' +
          'CALLSIGN can have only uppercase and/or digit in the case of a string : ""\n' +
          'CALLSIGN can\'t contain whitespaces in the case of a string : ""\n'
      )
    })

    it('returns error when scenario alter callsign is string with more than 8 digit', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "SAMSAMSAM"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t have more than 8 symbols in the case of a string : "SAMSAMSAM"\n'
      )
    })

    it('returns error when scenario alter callsign is string with lowercase', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "samu13"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can have only uppercase and/or digit in the case of a string : "samu13"\n'
      )
    })

    it('returns error when scenario alter callsign is string with special char', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "SAMU-35"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can have only uppercase and/or digit in the case of a string : "SAMU-35"\n'
      )
    })
    it('returns error when scenario alter callsign is string with whitespaces', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "SAMU 35"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t contain whitespaces in the case of a string : "SAMU 35"\n'
      )
    })

    it('returns error when scenario alter callsign is string with whitespaces', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "SAMU\t35"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t contain whitespaces in the case of a string : "SAMU\t35"\n'
      )
    })

    it('returns error when scenario alter callsign is string with whitespaces', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "SAMU\n35"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t contain whitespaces in the case of a string : "SAMU\n35"\n'
      )
    })

    it('returns error when scenario alter emergency is string who is not 1 or 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'EMERGENCY must be "0" or "1" in the case of a string: "test"\n'
      )
    })

    it('returns error when scenario alter emergency is int who is not 1 or 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'EMERGENCY must be 0 or 1 in the case of an integer: 2\n'
      )
    })

    it('returns error when scenario alter emergency is double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = 0.8'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "EMERGENCY can't be a double : 0.8\n"
      )
    })

    it('returns error when scenario alter groundspeed is < 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = -2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "-2"\n'
      )
    })
    it('returns error when scenario alter groundspeed is > 1446', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = 1500'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "1500"\n'
      )
    })

    it('returns error when scenario alter groundspeed precision 0.01 ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = 12.89'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter groundspeed precision 0.01 in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = "12.89"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter icao is double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = 12.89'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "ICAO can't be a double : 12.89\n"
      )
    })

    it('returns error when scenario alter icao is int with 7 digit', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = 1000000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO length must be 6 in the case of an integer: 1000000\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 1000000\n'
      )
    })

    it('returns error when scenario alter icao is int > 999999', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = 1000001'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO length must be 6 in the case of an integer: 1000001\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 1000001\n'
      )
    })

    it('returns error when scenario alter icao is int < 100000', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = 99999'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO length must be 6 in the case of an integer: 99999\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 99999\n'
      )
    })

    it('returns error when scenario alter icao with lowercase', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "aaaaaa"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO value must be 6 symbol hexadecimal or RANDOM in the case of a string: "aaaaaa"\n'
      )
    })

    it('returns error when scenario alter icao with no hexadecimal', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "P3A3A3"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO value must be 6 symbol hexadecimal or RANDOM in the case of a string: "P3A3A3"\n'
      )
    })

    it('returns error when scenario alter latitude int < -90', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = -100'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 :-100\n'
      )
    })

    it('returns error when scenario alter latitude int > 90', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 100'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 :100\n'
      )
    })

    it('returns error when scenario alter latitude double > 90', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 90.88'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 :90.88\n'
      )
    })

    it('returns error when scenario alter latitude string < -90', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "-90.88"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 :-90.88\n'
      )
    })

    it('returns error when scenario alter latitude is not float', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE expected a float value :test\n'
      )
    })

    it('returns error when scenario alter longitude int < -180', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = -200'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 :-200\n'
      )
    })

    it('returns error when scenario alter longitude int > 180', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = 200'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 :200\n'
      )
    })

    it('returns error when scenario alter longitude double > 180', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = 180.88'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 :180.88\n'
      )
    })

    it('returns error when scenario alter longitude string < -180', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = "-180.88"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 :-180.88\n'
      )
    })

    it('returns error when scenario alter longitude is not float', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE expected a float value :test\n'
      )
    })

    it('returns error when scenario alter spi is string who is not 1 or 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SPI must be "0" or "1" in the case of a string: "test"\n'
      )
    })

    it('returns error when scenario alter spi is int who is not 1 or 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SPI must be 0 or 1 in the case of an integer: 2\n'
      )
    })

    it('returns error when scenario alter spi is double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = 0.8'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "SPI can't be a double : 0.8\n"
      )
    })

    it('returns error when scenario alter squawk is double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = 22.7'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "SQUAWK can't be a double : 22.7\n"
      )
    })

    it('returns error when scenario alter squawk is int with length != 4', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = 227'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK length must be 4 in the case of an integer: 227\n' +
          'SQUAWK value must be between 1000 and 7777 inclusive in the case of an integer: 227\n' +
          'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "227"\n'
      )
    })

    it('returns error when scenario alter squawk is int with < 1000', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = 999'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK length must be 4 in the case of an integer: 999\n' +
          'SQUAWK value must be between 1000 and 7777 inclusive in the case of an integer: 999\n' +
          'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "999"\n'
      )
    })

    it('returns error when scenario alter squawk is int with > 7777', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = 7778'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be between 1000 and 7777 inclusive in the case of an integer: 7778\n' +
          'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "7778"\n'
      )
    })

    it('returns error when scenario alter squawk is int with digit > 7', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = 5778'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "5778"\n'
      )
    })

    it("returns error when scenario alter squawk is string don't have 4 symbols", async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = "777"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be 4 symbol between 0 and 7  in the case of a string: "777"\n'
      )
    })

    it('returns error when scenario alter squawk is string with digit > 7', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = "5789"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be 4 symbol between 0 and 7  in the case of a string: "5789"\n'
      )
    })

    it('returns error when scenario alter track is < 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = -2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "-2"\n'
      )
    })
    it('returns error when scenario alter track is >= 360', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = 361'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "361"\n'
      )
    })

    it('returns error when scenario alter track precision 0.01 ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = 12.89'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter track precision 0.01 in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = "12.89"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter have duplicate parameter', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = 12.8 and TRACK = 18'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Duplicate parameter : TRACK'
      )
    })
  })

  context('Test visitTrajectory with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_waypoints [ ( 3, 8 )  with_altitude 8 at 1 seconds ]'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 6)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
    })
  })

  context('Test visitCreate with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] '
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 6)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
    })

    it('returns error empty when scenario is valid with parameter icao', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ICAO = "A3A3A3"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })

    it('returns error empty when scenario is valid with parameter squawk', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values SQUAWK = 6755'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 7)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
    })

    it('returns error empty when scenario is valid with parameter callsign', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values CALLSIGN = "SAMU13"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })

    it('returns error empty when scenario is valid with parameter emergency', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values EMERGENCY = "1"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })

    it('returns error empty when scenario is valid with parameter spi', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values SPI = 0'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })

    it('returns error empty when scenario create alert with int 1', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = 1'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })

    it('returns error empty when scenario create alert with int 0', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = 0'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })
    it('returns error empty when scenario create alert with string "0"', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = "0"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })
    it('returns error empty when scenario create alert with string "1"', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = "1"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(semanticError[7].errors, '')
    })
  })
  context('Test visitCreate with error', () => {
    it('returns error when scenario create alert is string who is not 1 or 0', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(
        semanticError[7].errors,
        'ALERT must be "0" or "1" in the case of a string: "test"\n'
      )
    })

    it('returns error when scenario create alert is int who is not 1 or 0', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(
        semanticError[7].errors,
        'ALERT must be 0 or 1 in the case of an integer: 2\n'
      )
    })

    it('returns error when scenario create alert is double', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = 0.8'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(
        semanticError[7].errors,
        "ALERT can't be a double : 0.8\n"
      )
    })

    it('returns error when scenario create is rightshift', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values SQUAWK = >> 1'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(
        semanticError[7].errors,
        'A value of parameter cannot be a shift : with_values SQUAWK = >> 1'
      )
    })

    it('returns error when scenario create is leftshift', async () => {
      const scenario = await parseScenario(
        'create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values SQUAWK = << 1'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 8)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
      assert.deepStrictEqual(
        semanticError[7].errors,
        'A value of parameter cannot be a shift : with_values SQUAWK = << 1'
      )
    })
  })

  context('Test visitSaturate with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'saturate all_planes at 0 seconds with_values ICAO = "A3A3A3" and NUMBER = 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
    })
  })

  context('Test visitSaturate with error', () => {
    it('returns error when scenario saturate use trigger', async () => {
      const scenario = await parseScenario(
        'saturate all_planes at 0 seconds triggered_by "test" with_values ICAO = "A3A3A3" and NUMBER = 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Trigger is not yet implemented !'
      )
    })

    it('returns error when scenario saturate parameter is leftshift', async () => {
      const scenario = await parseScenario(
        'saturate all_planes at 0 seconds with_values ICAO = "A3A3A3" and NUMBER = << 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(
        semanticError[3].errors,
        'A value of parameter cannot be a shift : with_values ICAO = "A3A3A3" and NUMBER = << 2'
      )
    })

    it('returns error when scenario saturate parameter is rightshift', async () => {
      const scenario = await parseScenario(
        'saturate all_planes at 0 seconds with_values ICAO = "A3A3A3" and NUMBER = >> 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(
        semanticError[3].errors,
        'A value of parameter cannot be a shift : with_values ICAO = "A3A3A3" and NUMBER = >> 2'
      )
    })

    it('returns error when scenario saturate only one parameter', async () => {
      const scenario = await parseScenario(
        'saturate all_planes at 0 seconds with_values NUMBER = 2'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Number of parameters expected is 2 : 1 found'
      )
    })
  })

  context('Test visitReplay with no error', () => {
    it('returns error empty when scenario is valid with parameter', async () => {
      const scenario = await parseScenario(
        'replay all_planes at 0 seconds with_values ALTITUDE = 3000'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario is valid without parameter', async () => {
      const scenario = await parseScenario('replay all_planes at 0 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitReplay with error', () => {
    it('returns error when scenario is with filter', async () => {
      const scenario = await parseScenario(
        'replay plane satisfying "test" at 0 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Filters is not yet implemented !'
      )
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  context('Test visitDelay with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'delay all_planes at 0 seconds with_delay 2 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  context('Test visitDelay with error', () => {
    it('returns error empty when scenario have negative time', async () => {
      const scenario = await parseScenario(
        'delay all_planes at 0 seconds with_delay -2 seconds'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        "A time can't be negative : -2"
      )
    })
  })

  context('Test visitRotate with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle 90'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  context('Test visitRotate with error', () => {
    it('returns error empty when scenario have angle no valid', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle 900'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Angle must be between 0 and 360 with a maximum precision of 0.1: "900"\n'
      )
    })

    it('returns error empty when scenario have angle precision no valid', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle 60.909'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Angle must be between 0 and 360 with a maximum precision of 0.1: "60.909"\n'
      )
    })

    it('returns error empty when scenario have angle with leftshift', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle << 60.9'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'A value of parameter cannot be a shift : rotate all_planes at 0 seconds with_angle << 60.9'
      )
    })

    it('returns error empty when scenario have angle with rightshift', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle >> 60.9'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'A value of parameter cannot be a shift : rotate all_planes at 0 seconds with_angle >> 60.9'
      )
    })

    it('returns error empty when scenario rotate use trigger', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds triggered_by "test" with_angle 60.9'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Trigger is not yet implemented !'
      )
    })
  })

  context('Test visitCut with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario('cut all_planes at 0 seconds')
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitCut with error', () => {
    it('returns error empty when scenario cut use trigger', async () => {
      const scenario = await parseScenario(
        'cut all_planes at 0 seconds triggered_by "test"'
      )
      let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitInstruction(
        scenario.value.instructions[0]
      )

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Trigger is not yet implemented !'
      )
    })
  })

  it('returns error empty when scenario cut use filters with all_planes', async () => {
    const scenario = await parseScenario(
      'cut all_planes satisfying "test" at 0 seconds'
    )
    let f: FditScenarioSemanticVisitor = new FditScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitInstruction(
      scenario.value.instructions[0]
    )

    assert.deepStrictEqual(semanticError.length, 2)
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(
      semanticError[0].errors,
      'Filters is not yet implemented !'
    )
  })
})
