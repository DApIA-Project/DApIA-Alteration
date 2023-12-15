import { parseScenario } from '../../parser/parser'
import * as assert from 'assert'
import { AlterationScenarioSemanticVisitor } from '../../generators/AlterationScenarioSemanticVisitor'
import { SemanticError } from '../../generators'
import { ListConstant } from '../../generators/Memory/ListConstant'

describe('AlterationScenarioSemanticVisitor', () => {
  context('Test visitScenario with no error', () => {
    it('returns error empty when node is empty', async () => {
      const scenario = await parseScenario('')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 0)
    })
    it('returns error empty when scenario is with decls and instrs valid', async () => {
      const scenario = await parseScenario(
        'let $test= {1,2,3}, hide all_planes at 0 seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitDeclaration(
        scenario.value.declarations[0]
      )

      assert.deepStrictEqual(semanticError.length, 0)
    })
  })

  context('Test visitScenario with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario('hide all_planes at 0 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitHide with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario('hide all_planes at 0 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency 2'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int in string', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency "2"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int negative', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency -2'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency is int negative in string', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency "-2"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency with range constant int', async () => {
      const scenario = await parseScenario(
        'let $var = [2, 3], hide all_planes at 0 seconds with_frequency $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency with list constant int', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 3, 5}, hide all_planes at 0 seconds with_frequency $var'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with frequency with list constant int in string', async () => {
      const scenario = await parseScenario(
        'let $var = {"2", "3", "5"}, hide all_planes at 0 seconds with_frequency $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, 'error.offset\n')
    })

    it('returns error frequency when frequency is double', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds with_frequency 7.2'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad value : Frequency : Integer expected but found test\n'
      )
    })

    it('returns error frequency when frequency is double in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [4.7, 9.5], hide all_planes at 0 seconds with_frequency $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad value : Frequency : Integer expected but found 3.7\n' +
          'Bad value : Frequency : Integer expected but found 5.7\n' +
          'Bad value : Frequency : Integer expected but found 8.5\n' +
          'Bad value : Frequency : Integer expected but found 10.5\n'
      )
    })

    it('returns error frequency when frequency is double in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"2", "9.9"}, hide all_planes at 0 seconds with_frequency $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad value : Frequency : Integer expected but found 9.9\n'
      )
    })

    it('returns error frequency when frequency is double in string with comma in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"2,9", "9"}, hide all_planes at 0 seconds with_frequency $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Bad value : Frequency : Integer expected but found 2,9\n'
      )
    })

    it('returns error frequency when frequency is string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"test", "9"}, hide all_planes at 0 seconds with_frequency $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })

    it('returns error empty when scenario is valid with atFor', async () => {
      const scenario = await parseScenario(
        'hide all_planes at 0 seconds for 2 seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with window', async () => {
      const scenario = await parseScenario(
        'hide all_planes from 0 seconds until 2 seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with at in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2, 9], hide all_planes at $var seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
    })

    it('returns error empty when scenario is valid with atFor in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2, 9], hide all_planes at 0 seconds for $var seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
    })

    it('returns error empty when scenario is valid with window in range constant on from', async () => {
      const scenario = await parseScenario(
        'let $var = [2, 9], hide all_planes from $var seconds until 2 seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
    })

    it('returns error empty when scenario is valid with window in range constant on until', async () => {
      const scenario = await parseScenario(
        'let $var = [2, 9], hide all_planes from 0 seconds until $var seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
    })

    it('returns error empty when scenario is valid with at in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9}, hide all_planes at $var seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid with at in list constant with alter', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9, 7}, let $var2 = {2, 9, 7},alter all_planes at $var seconds with_values ALTITUDE = $var2'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
    })

    it('returns error empty when scenario is valid with atFor in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9}, hide all_planes at 0 seconds for $var seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario is valid with window in list constant on from', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9}, hide all_planes from $var seconds until 2 seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario is valid with window in list constant on until', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9}, hide all_planes from 0 seconds until $var seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
  })

  context('Test visitTime with no error', () => {
    it('returns error empty when scenario is valid with seconds who are int', async () => {
      const scenario = await parseScenario('hide all_planes at 2 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitTime with error', () => {
    it('returns error when scenario is no valid with seconds who are string', async () => {
      const scenario = await parseScenario('hide all_planes at "2" seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Bad time type. Integer expected : "2"\n'
      )
    })

    it('returns error when scenario is no valid with seconds who are double', async () => {
      const scenario = await parseScenario('hide all_planes at 2.9 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Bad time type. Integer expected : 2.9\n'
      )
    })

    it('returns error when scenario is no valid with seconds who are rightshift', async () => {
      const scenario = await parseScenario('hide all_planes at >> 2 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'A time cannot be a shift : at >> 2 seconds'
      )
    })

    it('returns error when scenario is no valid with seconds who are leftshift', async () => {
      const scenario = await parseScenario('hide all_planes at << 2 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'A time cannot be a shift : at << 2 seconds'
      )
    })

    it('returns error when scenario is no valid with seconds who are negatives', async () => {
      const scenario = await parseScenario('hide all_planes at -2 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        "A time can't be negative : -2"
      )
    })

    it('returns error when scenario is no valid with seconds who are double in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2.0, 9.9], hide all_planes at $var seconds'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Time must be an Integer : $var\n'
      )
    })

    it('returns error when scenario is no valid with seconds who are negatives in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [-2, 9], hide all_planes at $var seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(
        semanticError[0].errors,
        "A time can't be negative : -3"
      )
      assert.deepStrictEqual(
        semanticError[1].errors,
        "A time can't be negative : -1"
      )
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
    })

    it('returns error when scenario is no valid with seconds who are double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9.9}, hide all_planes at $var seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Time must be an Integer\n'
      )
    })

    it('returns error when scenario is no valid with seconds who are negatives in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {-2, 9}, hide all_planes at $var seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(
        semanticError[0].errors,
        "A time can't be negative : -2"
      )
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  context('Test visitAlter with no error', () => {
    it('returns error empty when scenario alter altitude with int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = 10000'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with drift', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE ++= 10000'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with noise', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE *= 10000'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with offset', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE += 10000'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = "10000"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int negative in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = "-100"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int negative', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = -100'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = 100.7'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ALTITUDE = "100.7"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter callsign with int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = 10000'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter callsign with string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values CALLSIGN = "SAMU28"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter emergency with int 1', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = 1'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter emergency with int 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = 0'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter emergency with string "0"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = "0"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter emergency with string "1"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values EMERGENCY = "1"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with int ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = 3'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with double ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = 3.7'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed and callsign and icao is valid ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = 3.7 and CALLSIGN = "SAMU12" and ICAO = "A2A2A2"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = "3"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao with lowercase', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "aaaaaa"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values GROUNDSPEED = "3.7"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "A4A4A4"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = 234567'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in string who are RANDOM', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "RANDOM"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 66'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 66.789'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter latitude double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "66.789"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "66"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude int', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = 160'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude double', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = 166.789'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter longitude double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = "166.789"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = "166"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter spi with int 1', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = 1'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter spi with int 0', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = 0'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter spi with string "0"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = "0"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter spi with string "1"', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SPI = "1"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter squawk with string ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = "4667"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter squawk with int ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values SQUAWK = 4667'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with int ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = 3'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with double ', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = 3.7'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with int in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = "3"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with double in string', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values TRACK = "3.7"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,9], alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with drift in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,9], alter all_planes at 0 seconds with_values ALTITUDE ++= $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with noise in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,9], alter all_planes at 0 seconds with_values ALTITUDE *= $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with offset in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,9], alter all_planes at 0 seconds with_values ALTITUDE += $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int negative in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [-2,9], alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with double in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2.0,9.1], alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with int in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,9], alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with double in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2.1,9.7], alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude int in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,9], alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude double in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2.111,9.755], alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude int in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,9], alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude double in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2.111,9.733], alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"2", "9"}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int negative in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"-2", "-9"}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with int negative in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {-2, -9}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2.8, 9.0}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter altitude with double in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"2.9", "9.1"}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter callsign with int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {10000, 20000}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter callsign with string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU28", "SAMU12"}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter emergency with int 1 and 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {0, 1}, alter all_planes at 0 seconds with_values EMERGENCY = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter emergency with string "0" and "1" in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"0", "1"}, alter all_planes at 0 seconds with_values EMERGENCY = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2, 9}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2.1, 9.9}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with int in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"2", "9"}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter groundspeed with double in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"2.8", "9.2"}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"A4A4A4", "B1B1B1"}, alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter icao in int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {234567, 541765}, alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {22, 66}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {22.123, 66.456}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter latitude double in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"22.123", "66.456"}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter latitude int in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"22", "66"}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {160, 120}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {160.123, 120.456}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
    it('returns error empty when scenario alter longitude double in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"160.123", "120.456"}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter longitude int in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"160", "120"}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter spi with int 1 and 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {0, 1}, alter all_planes at 0 seconds with_values SPI = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter spi with string "0" and "1" in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"0", "1"}, alter all_planes at 0 seconds with_values SPI = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter squawk with string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"4667", "1234"}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter squawk with int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {4667, 1234}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with int in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {3, 6}, alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {3.7, 4.9}, alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with int in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"3", "4"}, alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario alter track with double in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"3.7", "4.9"}, alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO length must be 6 in the case of an integer: 99999\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 99999\n'
      )
    })

    it('returns error when scenario alter icao with no hexadecimal', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values ICAO = "P3A3A3"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : -100\n'
      )
    })

    it('returns error when scenario alter latitude int > 90', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 100'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : 100\n'
      )
    })

    it('returns error when scenario alter latitude double > 90', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = 90.88'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : 90.88\n'
      )
    })

    it('returns error when scenario alter latitude string < -90', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "-90.88"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : -90.88\n'
      )
    })

    it('returns error when scenario alter latitude is not float', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LATITUDE = "test"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE expected a float value : test\n'
      )
    })

    it('returns error when scenario alter longitude int < -180', async () => {
      const scenario = await parseScenario(
        'alter all_planes at 0 seconds with_values LONGITUDE = -200'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Duplicate parameter : TRACK'
      )
    })

    it('returns error when scenario alter altitude is too high in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [990, 100000], alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ALTITUDE must be between -1000 and 50175 : 99999 found\n' +
          'ALTITUDE must be between -1000 and 50175 : 100001 found\n'
      )
    })

    it('returns error when scenario alter altitude is too small in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [-10000, 5000], alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ALTITUDE must be between -1000 and 50175 : -10001 found\n' +
          'ALTITUDE must be between -1000 and 50175 : -9999 found\n'
      )
    })

    it('returns error when scenario alter callsign is double in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [1000.2, 1233.8], alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Range is not possible for CALLSIGN\n'
      )
    })

    it('returns error when scenario alter emergency is string who is 1 or 0 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [0, 1], alter all_planes at 0 seconds with_values EMERGENCY = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Range is not possible for EMERGENCY\n'
      )
    })

    it('returns error when scenario alter groundspeed is < 0 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [-2, 2], alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "-3"\n' +
          'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "-1"\n'
      )
    })
    it('returns error when scenario alter groundspeed is > 1446 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [1200, 1711], alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "1710"\n' +
          'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "1712"\n'
      )
    })

    it('returns error when scenario alter groundspeed precision 0.01 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [10.33, 14.2], alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "9.33"\n' +
          'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "11.33"\n'
      )
    })

    it('returns error when scenario alter icao is in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [222222, 111111], alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Range is not possible for ICAO\n'
      )
    })

    it('returns error when scenario alter latitude int < -90 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [-200, 30], alter all_planes at 0 seconds with_values LATITUDE = $var'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : -201\n' +
          'LATITUDE must be between -90 and 90 : -199\n'
      )
    })

    it('returns error when scenario alter latitude int > 90 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [30, 200], alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : 199\n' +
          'LATITUDE must be between -90 and 90 : 201\n'
      )
    })

    it('returns error when scenario alter latitude double > 90 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [30.22, 200.900], alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : 199.9\n' +
          'LATITUDE must be between -90 and 90 : 201.9\n'
      )
    })

    it('returns error when scenario alter latitude string < -90 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [-180.8, 30.1], alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : -181.8\n' +
          'LATITUDE must be between -90 and 90 : -179.8\n'
      )
    })

    it('returns error when scenario alter longitude int < -180 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [-200, 30], alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 : -201\n' +
          'LONGITUDE must be between -180 and 180 : -199\n'
      )
    })

    it('returns error when scenario alter longitude int > 180 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [30, 200], alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 : 199\n' +
          'LONGITUDE must be between -180 and 180 : 201\n'
      )
    })

    it('returns error when scenario alter longitude double > 180 in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [30.1, 200.12], alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 : 199.12\n' +
          'LONGITUDE must be between -180 and 180 : 201.12\n'
      )
    })

    it('returns error when scenario alter spi is in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [30, 0], alter all_planes at 0 seconds with_values SPI = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Range is not possible for SPI\n'
      )
    })

    it('returns error when scenario alter squawk is in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [3011, 2005], alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Range is not possible for SQUAWK\n'
      )
    })

    it('returns error when scenario alter track in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [30, 200], alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Range is not possible for TRACK\n'
      )
    })

    //ALTER LIST CONSTANT ERROR

    it('returns error when scenario alter altitude is too high in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1200,100000}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ALTITUDE must be between -1000 and 50175 : 100000 found\n'
      )
    })

    it('returns error when scenario alter altitude is too small in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {-10000,1200}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ALTITUDE must be between -1000 and 50175 : -10000 found\n'
      )
    })

    it('returns error when scenario alter altitude is string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"1200","test"}, alter all_planes at 0 seconds with_values ALTITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Bad Value. Expected a float value : test found\n'
      )
    })

    it('returns error when scenario alter callsign is double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2.8,1000.6}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "CALLSIGN can't be a double : 2.8\n" +
          "CALLSIGN can't be a double : 1000.6\n"
      )
    })

    it('returns error when scenario alter callsign is int with more than 8 digit in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {121212,111111111}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "CALLSIGN can't have more than 8 digits in the case of an integer: 111111111\n"
      )
    })

    it('returns error when scenario alter callsign is int negative in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {11111,-111}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "CALLSIGN can't be negative in the case of an integer : -111\n"
      )
    })

    it('returns error when scenario alter callsign is string empty in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12",""}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error when scenario alter callsign is string with more than 8 digit in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12","SAMSAMSAM"}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t have more than 8 symbols in the case of a string : "SAMSAMSAM"\n'
      )
    })

    it('returns error when scenario alter callsign is string with lowercase in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12","samu13"}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can have only uppercase and/or digit in the case of a string : "samu13"\n'
      )
    })

    it('returns error when scenario alter callsign is string with special char in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12","SAMU-35"}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can have only uppercase and/or digit in the case of a string : "SAMU-35"\n'
      )
    })
    it('returns error when scenario alter callsign is string with whitespaces in list constant space', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12","SAMU 35"}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t contain whitespaces in the case of a string : "SAMU 35"\n'
      )
    })

    it('returns error when scenario alter callsign is string with whitespaces in list constant \\t', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12","SAMU\t35"}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t contain whitespaces in the case of a string : "SAMU\t35"\n'
      )
    })

    it('returns error when scenario alter callsign is string with whitespaces in list constant \\n', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12","SAMU\n35"}, alter all_planes at 0 seconds with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'CALLSIGN can\'t contain whitespaces in the case of a string : "SAMU\n35"\n'
      )
    })

    it('returns error when scenario alter emergency is string who is not 1 or 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"0","test"}, alter all_planes at 0 seconds with_values EMERGENCY = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'EMERGENCY must be "0" or "1" in the case of a string: "test"\n'
      )
    })

    it('returns error when scenario alter emergency is int who is not 1 or 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {0,2}, alter all_planes at 0 seconds with_values EMERGENCY = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'EMERGENCY must be 0 or 1 in the case of an integer: 2\n'
      )
    })

    it('returns error when scenario alter emergency is double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {0,0.8}, alter all_planes at 0 seconds with_values EMERGENCY = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "EMERGENCY can't be a double : 0.8\n"
      )
    })

    it('returns error when scenario alter groundspeed is < 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {-2,1}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "-2"\n'
      )
    })
    it('returns error when scenario alter groundspeed is > 1446 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {0,1500}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "1500"\n'
      )
    })

    it('returns error when scenario alter groundspeed precision 0.01 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {0.1,12.89}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter groundspeed precision 0.01 in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"12.89","0.8"}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'GROUNDSPEED must be between 0 and 1446 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter icao is double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1.1,12222}, alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "ICAO can't be a double : 1.1\n" +
          'ICAO length must be 6 in the case of an integer: 12222\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 12222\n'
      )
    })

    it('returns error when scenario alter icao is int with 7 digit in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {111111,1000000}, alter all_planes at 0 seconds with_values ICAO = 1000000'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO length must be 6 in the case of an integer: 1000000\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 1000000\n'
      )
    })

    it('returns error when scenario alter icao is int > 999999 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {111111,1000001}, alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO length must be 6 in the case of an integer: 1000001\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 1000001\n'
      )
    })

    it('returns error when scenario alter icao is int < 100000 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {111111,99999}, alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO length must be 6 in the case of an integer: 99999\n' +
          'ICAO value must be between 100000 and 999999 inclusive in the case of an integer: 99999\n'
      )
    })

    it('returns error when scenario alter icao with lowercase in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"A2A2A2","aaaaaa"}, alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO value must be 6 symbol hexadecimal and uppercase or RANDOM in the case of a string: "aaaaaa"\n'
      )
    })

    it('returns error when scenario alter icao with no hexadecimal in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"A2A2A2","P3A3A3"}, alter all_planes at 0 seconds with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'ICAO value must be 6 symbol hexadecimal and uppercase or RANDOM in the case of a string: "P3A3A3"\n'
      )
    })

    it('returns error when scenario alter latitude int < -90 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {-60,-92}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : -92\n'
      )
    })

    it('returns error when scenario alter latitude int > 90 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {60,92}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : 92\n'
      )
    })

    it('returns error when scenario alter latitude double > 90 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {60.7,92.9}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : 92.9\n'
      )
    })

    it('returns error when scenario alter latitude string < -90 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"-60.1","-92.7"}, alter all_planes at 0 seconds with_values LATITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LATITUDE must be between -90 and 90 : -92.7\n'
      )
    })

    it('returns error when scenario alter longitude int < -180 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {-160,-192}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 : -192\n'
      )
    })

    it('returns error when scenario alter longitude int > 180 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {160,192}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 : 192\n'
      )
    })

    it('returns error when scenario alter longitude double > 180 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {160.1,192.9}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 : 192.9\n'
      )
    })

    it('returns error when scenario alter longitude string < -180 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"-160.2","-192.8"}, alter all_planes at 0 seconds with_values LONGITUDE = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'LONGITUDE must be between -180 and 180 : -192.8\n'
      )
    })

    it('returns error when scenario alter spi is string who is not 1 or 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"1","test"}, alter all_planes at 0 seconds with_values SPI = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SPI must be "0" or "1" in the case of a string: "test"\n'
      )
    })

    it('returns error when scenario alter spi is int who is not 1 or 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1,2}, alter all_planes at 0 seconds with_values SPI = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SPI must be 0 or 1 in the case of an integer: 2\n'
      )
    })

    it('returns error when scenario alter spi is double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1,0.8}, alter all_planes at 0 seconds with_values SPI = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "SPI can't be a double : 0.8\n"
      )
    })

    it('returns error when scenario alter squawk is double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1111,22.7}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        "SQUAWK can't be a double : 22.7\n"
      )
    })

    it('returns error when scenario alter squawk is int with length != 4 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1111,227}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error when scenario alter squawk is int with < 1000 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1111,999}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error when scenario alter squawk is int with > 7777 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1111,7778}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be between 1000 and 7777 inclusive in the case of an integer: 7778\n' +
          'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "7778"\n'
      )
    })

    it('returns error when scenario alter squawk is int with digit > 7 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1111,5778}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be 4 symbol between 0 and 7  in the case of an integer: "5778"\n'
      )
    })

    it("returns error when scenario alter squawk is string don't have 4 symbols in list constant", async () => {
      const scenario = await parseScenario(
        'let $var = {"1111","777"}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be 4 symbol between 0 and 7  in the case of a string: "777"\n'
      )
    })

    it('returns error when scenario alter squawk is string with digit > 7 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"1111","5789"}, alter all_planes at 0 seconds with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'SQUAWK value must be 4 symbol between 0 and 7  in the case of a string: "5789"\n'
      )
    })

    it('returns error when scenario alter track is < 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {50,-2}, alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "-2"\n'
      )
    })
    it('returns error when scenario alter track is >= 360 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {50,361}, alter all_planes at 0 seconds with_values TRACK = $var'
      )

      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "361"\n'
      )
    })

    it('returns error when scenario alter track precision 0.01 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {50,12.89}, alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter track precision 0.01 in string in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"50","12.89"}, alter all_planes at 0 seconds with_values TRACK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'TRACK must be between 0 and 360 with a maximum precision of 0.1: "12.89"\n'
      )
    })

    it('returns error when scenario alter have duplicate parameter in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {50,60}, alter all_planes at 0 seconds with_values TRACK = $var and TRACK = 18'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 6)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
    })

    it('returns error empty when scenario is valid in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [9 , 12], alter all_planes at 0 seconds with_waypoints [ ( $var, $var )  with_altitude $var at 1 seconds ]'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 6)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
    })

    it('returns error empty when scenario is valid in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {9 , 12}, alter all_planes at 0 seconds with_waypoints [ ( $var, $var )  with_altitude $var at 1 seconds ]'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error empty when scenario is valid in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [1, 8], create at 0 seconds with_waypoints [ ( $var, $var)  with_altitude $var at 1 seconds ] '
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 6)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
    })

    it('returns error empty when scenario is valid in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1, 8}, create at 0 seconds with_waypoints [ ( $var, $var)  with_altitude $var at 1 seconds ] '
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 6)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
    })

    it('returns error empty when scenario is valid with parameter icao in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"A2A2A2", "111111"}, create at 0 seconds with_waypoints [ ( 3, 8 )  with_altitude 8 at 1 seconds ] with_values ICAO = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error empty when scenario is valid with parameter squawk in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {6666, 7676}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values SQUAWK = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 7)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
      assert.deepStrictEqual(semanticError[5].errors, '')
      assert.deepStrictEqual(semanticError[6].errors, '')
    })

    it('returns error empty when scenario is valid with parameter callsign in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"SAMU12", "SAMU89"}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values CALLSIGN = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error empty when scenario is valid with parameter emergency in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"0", "1"}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values EMERGENCY = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error empty when scenario is valid with parameter spi in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1, 0}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values SPI = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error empty when scenario create alert with int 1 and 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1, 0}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error empty when scenario create alert with string "0" and "1" in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"1", "0"}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
    it('returns error when scenario create alert in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [1,0], create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
        'Range is not possible for ALERT\n'
      )
    })

    it('returns error when scenario create alert is string who is not 1 or 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"1", "test"}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error when scenario create alert is int who is not 1 or 0 in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1, 2}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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

    it('returns error when scenario create alert is double in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {1, 0.8}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
  })

  context('Test visitSaturate with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'saturate all_planes at 0 seconds with_values ICAO = "A3A3A3" and NUMBER = 2'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Number of parameters expected is 2 : 1 found'
      )
    })

    it('returns error when scenario saturate icao in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [111111,222222], saturate all_planes at 0 seconds with_values ICAO = $var and NUMBER = 2'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(
        semanticError[2].errors,
        'Range is not possible for ICAO\n'
      )
      assert.deepStrictEqual(semanticError[3].errors, '')
    })

    it('returns error empty when scenario saturate number in range constant', async () => {
      const scenario = await parseScenario(
        'let $var = [2,5], saturate all_planes at 0 seconds with_values ICAO = "A3A3A3" and NUMBER = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
    })

    it('returns error empty when scenario saturate icao in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {"111111","222222"}, saturate all_planes at 0 seconds with_values ICAO = $var and NUMBER = 2'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
    })

    it('returns error empty when scenario saturate number in list constant', async () => {
      const scenario = await parseScenario(
        'let $var = {2,5}, saturate all_planes at 0 seconds with_values ICAO = "A3A3A3" and NUMBER = $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 4)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
    })
  })

  context('Test visitReplay with no error', () => {
    it('returns error empty when scenario is valid with parameter', async () => {
      const scenario = await parseScenario(
        'replay all_planes at 0 seconds with_values ALTITUDE = 3000'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })

    it('returns error empty when scenario is valid without parameter', async () => {
      const scenario = await parseScenario('replay all_planes at 0 seconds')
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitReplay with error', () => {
    it('returns error when scenario is with filter', async () => {
      const scenario = await parseScenario(
        'replay plane satisfying "test" at 0 seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error empty when scenario is valid in range constant', async () => {
      const scenario = await parseScenario(
        'let $var=[2,9], delay all_planes at 0 seconds with_delay $var seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
    })
    it('returns error empty when scenario is valid in list constant', async () => {
      const scenario = await parseScenario(
        'let $var={2,9}, delay all_planes at 0 seconds with_delay $var seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
  })

  context('Test visitDelay with error', () => {
    it('returns error empty when scenario have negative time', async () => {
      const scenario = await parseScenario(
        'delay all_planes at 0 seconds with_delay -2 seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        "A time can't be negative : -2"
      )
    })

    it('returns error when scenario have negative time in range constant', async () => {
      const scenario = await parseScenario(
        'let $var=[-2,9], delay all_planes at 0 seconds with_delay $var seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 5)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        "A time can't be negative : -3"
      )
      assert.deepStrictEqual(
        semanticError[2].errors,
        "A time can't be negative : -1"
      )
      assert.deepStrictEqual(semanticError[3].errors, '')
      assert.deepStrictEqual(semanticError[4].errors, '')
    })

    it('returns error empty when scenario have negative time in list constant', async () => {
      const scenario = await parseScenario(
        'let $var={-2,9}, delay all_planes at 0 seconds with_delay $var seconds'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 3)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        "A time can't be negative : -2"
      )
      assert.deepStrictEqual(semanticError[2].errors, '')
    })
  })

  context('Test visitRotate with no error', () => {
    it('returns error empty when scenario is valid', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle 90'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })

    it('returns error when scenario rotate is valid in range constant', async () => {
      const scenario = await parseScenario(
        'let $var=[5,56], rotate all_planes at 0 seconds with_angle $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Range is not possible for Angle\n'
      )
    })

    it('returns error empty when scenario rotate is valid in list constant', async () => {
      const scenario = await parseScenario(
        'let $var={5,56}, rotate all_planes at 0 seconds with_angle $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  context('Test visitRotate with error', () => {
    it('returns error when scenario have angle no valid', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle 900'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Angle must be between 0 and 360 with a maximum precision of 0.1: "900"\n'
      )
    })

    it('returns error when scenario have angle precision no valid', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle 60.909'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Angle must be between 0 and 360 with a maximum precision of 0.1: "60.909"\n'
      )
    })

    it('returns error when scenario have angle no valid in list constant', async () => {
      const scenario = await parseScenario(
        'let $var={5,900}, rotate all_planes at 0 seconds with_angle $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Angle must be between 0 and 360 with a maximum precision of 0.1: "900"\n'
      )
    })

    it('returns error when scenario have angle precision no valid in list constant', async () => {
      const scenario = await parseScenario(
        'let $var={5,56.898}, rotate all_planes at 0 seconds with_angle $var'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'Angle must be between 0 and 360 with a maximum precision of 0.1: "56.898"\n'
      )
    })

    it('returns error when scenario have angle with leftshift', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle << 60.9'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'A value of parameter cannot be a shift : rotate all_planes at 0 seconds with_angle << 60.9'
      )
    })

    it('returns error when scenario have angle with rightshift', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds with_angle >> 60.9'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(semanticError[0].errors, '')
      assert.deepStrictEqual(
        semanticError[1].errors,
        'A value of parameter cannot be a shift : rotate all_planes at 0 seconds with_angle >> 60.9'
      )
    })

    it('returns error when scenario rotate use trigger', async () => {
      const scenario = await parseScenario(
        'rotate all_planes at 0 seconds triggered_by "test" with_angle 60.9'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

      assert.deepStrictEqual(semanticError.length, 1)
      assert.deepStrictEqual(semanticError[0].errors, '')
    })
  })

  context('Test visitCut with error', () => {
    it('returns error empty when scenario cut use trigger', async () => {
      const scenario = await parseScenario(
        'cut all_planes at 0 seconds triggered_by "test"'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)

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
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)

    assert.deepStrictEqual(semanticError.length, 2)
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(
      semanticError[0].errors,
      'Filters is not yet implemented !'
    )
  })

  context('Tests many things', () => {
    it('returns error when variable in time not exists', async () => {
      const scenario = await parseScenario(
        'let $var={5,56}, rotate all_planes at $var2 seconds with_angle 3'
      )
      let f: AlterationScenarioSemanticVisitor =
        new AlterationScenarioSemanticVisitor()
      let semanticError: SemanticError[] = f.visitScenario(scenario.value)
      assert.deepStrictEqual(semanticError.length, 2)
      assert.deepStrictEqual(
        semanticError[0].errors,
        'Variable $var2 not found'
      )
      assert.deepStrictEqual(semanticError[1].errors, '')
    })
  })

  it('returns error when variable in time is string', async () => {
    const scenario = await parseScenario(
      'let $var={"5","56"}, rotate all_planes at $var seconds with_angle 3'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 2)
    assert.deepStrictEqual(semanticError[0].errors, 'Time must be an Integer\n')
    assert.deepStrictEqual(semanticError[1].errors, '')
  })

  it('returns error when variable in int not exist', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, saturate all_planes at 0 seconds with_values ICAO = "A2A2A2" and NUMBER = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 4)
    assert.deepStrictEqual(semanticError[3].errors, 'Variable $var2 not found')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, '')
  })

  it('returns error when variable in callsign not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values CALLSIGN = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in altitude not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values ALTITUDE = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in emergency not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values EMERGENCY = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in groundspeed not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values GROUNDSPEED = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in icao not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values ICAO = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in latitude not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values LATITUDE = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in longitude not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values LONGITUDE = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in spi not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values SPI = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in squawk not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values SQUAWK = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in track not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, alter all_planes at 0 seconds with_values TRACK = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 3)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, 'Variable $var2 not found')
  })

  it('returns error when variable in alert not exists', async () => {
    const scenario = await parseScenario(
      'let $var={5,56}, create at 0 seconds with_waypoints [ ( 3, 8)  with_altitude 8 at 1 seconds ] with_values ALERT = $var2'
    )
    let f: AlterationScenarioSemanticVisitor =
      new AlterationScenarioSemanticVisitor()
    let semanticError: SemanticError[] = f.visitScenario(scenario.value)
    assert.deepStrictEqual(semanticError.length, 8)
    assert.deepStrictEqual(semanticError[0].errors, '')
    assert.deepStrictEqual(semanticError[1].errors, '')
    assert.deepStrictEqual(semanticError[2].errors, '')
    assert.deepStrictEqual(semanticError[3].errors, '')
    assert.deepStrictEqual(semanticError[4].errors, '')
    assert.deepStrictEqual(semanticError[5].errors, '')
    assert.deepStrictEqual(semanticError[6].errors, '')
    assert.deepStrictEqual(semanticError[7].errors, 'Variable $var2 not found')
  })
})
