import { AstNode, LangiumServices } from "langium";
import { URI } from "vscode-uri";
import { EmptyFileSystem } from "langium";
import { createFditscenarioServices } from '../language-server/fditscenario-module';
import { ASTScenario } from "../language-server/generated/ast";
import { generateCommands } from '../generator/generator';
import chalk from "chalk";
import {generateVariables} from "../generator/generator_variables";
import {Declaration, Declarations} from "../types_variables";
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
    console.log(scenario);
    const document = services.shared.workspace.LangiumDocumentFactory.fromString(fditscenrioProgram, URI.parse('memory://fditscenario.document'));
    const parseResult = document.parseResult;
    // verify no lexer, parser, or general diagnostic errors show up
    if (parseResult.lexerErrors.length === 0 &&
        parseResult.parserErrors.length === 0) {
        console.log(chalk.green(`Parsed and validated successfully!`));
    } else {
        console.log(chalk.red(`Failed to parse and validate !`));
        return
    }

    return generateCommands(scenario, fileName, fileContent);

}

export async function get_variables (fditscenrioProgram: string): Promise<Declarations | undefined> {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = await extractAstNodeFromString<ASTScenario>(fditscenrioProgram, services);
    console.log(scenario);
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

    const variables : Declarations |undefined = generateVariables(scenario);
    if(variables != undefined){
        return variables;
    }else{
        return undefined
    }
}


export function countScenarioNumber(fditscenrioProgram: string, declaration : Declaration): number  {

    const regex = new RegExp(`${declaration.variable.toString().replace('$', '\\$')}\\b`, 'g');

    const matches = fditscenrioProgram.match(regex);
    console.log(matches);
    if(declaration.values_range != undefined){
        return matches ? (matches.length-1)*4 : 0;
    } else if (declaration.values_list != undefined){
        return matches ? (matches.length-1)*declaration.values_list.length : 0;
    }
    return 0;

}

export function createAllScenario(scenario : string, declarations : Declarations) : string[] {
    //En fonction des variables utilisés (le nombre de fois quelles sont utilisés, le nombre de valeurs possibles par variable
    return [];
}


function replaceNthOccurrence(text: string, searchWord: string, replaceWord: string, n: number): string {
    let count = 0;
    return text.replace(new RegExp(searchWord, 'g'), (match: string) => {
        count++;
        if (count === n) {
            return replaceWord;
        } else {
            return match;
        }
    });
}