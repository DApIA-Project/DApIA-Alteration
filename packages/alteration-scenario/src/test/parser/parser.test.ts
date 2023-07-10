import assert from 'assert'
import { parseScenario } from '../../parser/parser'
import { ASTScenario } from '../../language-server/generated/ast'

describe('parser', () => {
  let fileContent = ''
  beforeEach(() => {
    fileContent =
      'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,'
  })

  context('when scenario is no valid', () => {
    it('returns json with no action when content is false', async () => {
      const scenario = 'hide all_planes from seconds until 90 seconds'
      const { value, parserErrors, lexerErrors } = await parseScenario(scenario)
      const errors = lexerErrors
        .map(
          (lexerError: any) =>
            `${lexerError.message}: l.${lexerError.line}:${lexerError.column}`
        )
        .concat(
          parserErrors.map(
            (parserError: any) =>
              `${parserError.message}: near '${parserError.token.image}' -> l.${parserError.token.startLine}:${parserError.token.startColumn}`
          )
        )
      assert.deepStrictEqual(errors.length, 1)
    })
  })

  context('when scenario is valid', () => {
    it('returns json with action when content is hide all_planes from until', async () => {
      const scenario = 'hide all_planes from 56 seconds until 90 seconds'
      const { value, parserErrors, lexerErrors } = await parseScenario(scenario)
      const errors = lexerErrors
        .map(
          (lexerError: any) =>
            `${lexerError.message}: l.${lexerError.line}:${lexerError.column}`
        )
        .concat(
          parserErrors.map(
            (parserError: any) =>
              `${parserError.message}: near '${parserError.token.image}' -> l.${parserError.token.startLine}:${parserError.token.startColumn}`
          )
        )
      assert.deepStrictEqual(errors.length, 0)
    })
  })
})
