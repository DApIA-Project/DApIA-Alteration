import { AstNode, LangiumServices } from "langium";
import { URI } from "vscode-uri";
import { EmptyFileSystem } from "langium";
import { createFditscenarioServices } from '../language-server/fditscenario-module';
import { ASTScenario } from "../language-server/generated/ast";
import { generateCommands } from '../generator/generator';
import chalk from "chalk";
/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @param services For constructing & building a virtual document
 * @returns A promise for the parsed result of the document
 */
 export async function extractAstNodeFromString<T extends AstNode>(content: string, services: LangiumServices): Promise<T> {
    // create a document from a string instead of a file
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://fditscenario.document'));
    // proceed with build & validation
    await services.shared.workspace.DocumentBuilder.build([doc], { validationChecks: 'all' });
    // get the parse result (root of our AST)
    return doc.parseResult.value as T;
}

/**
 * Parses a MiniLogo program & generates output as a list of Objects
 * @param fditscenarioProgram fditscenario program to parse
 * @returns Generated output from this MiniLogo program
 */
export async function parseAndGenerate (fditscenrioProgram: string, fileName : string, fileContent : string): Promise<{} | undefined> {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = await extractAstNodeFromString<ASTScenario>(fditscenrioProgram, services);
    const document = services.shared.workspace.LangiumDocumentFactory.fromString(fditscenrioProgram, URI.parse('memory://fditscenario.document'));
    const parseResult = document.parseResult;
    // verify no lexer, parser, or general diagnostic errors show up
    if (parseResult.lexerErrors.length === 0 && 
        parseResult.parserErrors.length === 0 ) {
        console.log(chalk.green(`Parsed and validated successfully!`));
    } else {
        console.log(chalk.red(`Failed to parse and validate !`));
        return
    }
    return generateCommands(scenario,fileName, fileContent);
}

 
  
