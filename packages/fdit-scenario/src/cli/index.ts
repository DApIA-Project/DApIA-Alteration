import chalk from 'chalk'
import { Command } from 'commander'
import { ASTScenario } from '../language-server/generated/ast'
import { AttackScenarioGrammarLanguageMetaData } from '../language-server/generated/module'
import { createFditscenarioServices } from '../language-server/fditscenario-module'
import { extractAstNode, extractDocument } from './cli-util'
import { generateCommands } from '../generator/generator'
import { NodeFileSystem } from 'langium/node'
import { extractDestinationAndName } from './cli-util'
import path from 'path'
import fs from 'fs'

export const generateAction = async (
  fileName: string,
  opts: GenerateOptions
): Promise<void> => {
  const services = createFditscenarioServices(NodeFileSystem).Fditscenario
  const scenario = await extractAstNode<ASTScenario>(fileName, services)

  // invoke generator to get commands
  const cmds = generateCommands(scenario, '', '')

  // handle file related functionality here now
  const data = extractDestinationAndName(fileName, opts.destination)
  const generatedFilePath = `${path.join(data.destination, data.name)}.json`
  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true })
  }
  fs.writeFileSync(generatedFilePath, JSON.stringify(cmds, undefined, 2))

  console.log(
    chalk.green(
      `FditScenario commands generated successfully: ${generatedFilePath}`
    )
  )
}

/**
 * Parse and validate a program written in our language.
 * Verifies that no lexer or parser errors occur.
 * Implicitly also checks for validation errors while extracting the document
 *
 * @param fileName Program to validate
 */
export const parseAndValidate = async (fileName: string): Promise<void> => {
  // retrieve the services for our language
  const services = createFditscenarioServices(NodeFileSystem).Fditscenario
  // extract a document for our program
  const document = await extractDocument(fileName, services)
  // extract the parse result details
  const parseResult = document.parseResult
  // verify no lexer, parser, or general diagnostic errors show up
  if (
    parseResult.lexerErrors.length === 0 &&
    parseResult.parserErrors.length === 0
  ) {
    console.log(chalk.green(`Parsed and validated ${fileName} successfully!`))
  } else {
    console.log(chalk.red(`Failed to parse and validate ${fileName}!`))
  }
}

export type GenerateOptions = {
  destination?: string
}

export default function (): void {
  const program = new Command()

  program
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .version(require('../../package.json').version)

  const fileExtensions =
    AttackScenarioGrammarLanguageMetaData.fileExtensions.join(', ')
  program
    .command('generate')
    .argument(
      '<file>',
      `source file (possible file extensions: ${fileExtensions})`
    )
    .option('-d, --destination <dir>', 'destination directory of generating')
    .description('generates FditScenario commands in json')
    .action(generateAction)

  program
    .command('parseAndValidate')
    .argument(
      '<file>',
      `Source file to parse & validate (ending in ${fileExtensions})`
    )
    .description(
      'Indicates where a program parses & validates successfully, but produce no output code'
    )
    .action(parseAndValidate) // we'll need to implement this function

  program.parse(process.argv)
}
