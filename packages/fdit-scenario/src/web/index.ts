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
        return matches ? (matches.length-1)*4 : 0;//SUREMENT A REMODIFIER
    } else if (declaration.values_list != undefined){
        return matches ? Math.pow(declaration.values_list.length,matches.length-1) : 0;
    }
    return 0;

}

export function createAllScenario(scenario : string, declarations : Declarations, nb_scenario : number) : string[] {
    let list_scenarios : string[] = [];
    //En fonction des variables utilisés (le nombre de fois quelles sont utilisés, le nombre de valeurs possibles par variable
    let variables = new Map<string,(number|string)[]>([]);
    for(let i=0; i<declarations.declarations.length;i++){
        variables.set(declarations.declarations[i].variable,declarations.declarations[i].values_list!)
    }
    let number_use_variable = 0;


    let scenario_without_decls = scenario.replace(/^(let\s.*,\s*)*/,"");
    console.log(scenario_without_decls);

    let regex_var_str="";
    let index = 0;
    for(let one_var of variables.keys()){
        if(index==0){
            regex_var_str=regex_var_str+one_var;
            index++;
        }else{
            regex_var_str=regex_var_str+"|"+one_var;
        }
    }
    console.log(regex_var_str);
    const regex_var = new RegExp(`${regex_var_str.toString().replaceAll('$', '\\$')}`, 'g');
    console.log(regex_var);
    const matches_var = scenario_without_decls.match(regex_var);
    console.log(matches_var);

    let variables_uses = new Map<string,(number|string)[]>([]);
    for(let i=0;i<matches_var!.length;i++){
            variables_uses.set(matches_var![i]+"_"+i,variables.get(matches_var![i])!);

    }

    console.log(variables_uses);

    let map_to_tab = [];
    for(let value of variables_uses.values()){
        map_to_tab.push(value);
    }

    let tab_combinaison = recursePermutation(map_to_tab);
    let one_scenario = ""
    for(let i=0 ; i<nb_scenario;i++){
        one_scenario = scenario_without_decls;
        for(let j=0; j<matches_var!.length;j++){
            one_scenario = one_scenario.replace(matches_var![j],tab_combinaison[i][j].toString())
        }
        list_scenarios.push(one_scenario);
    }

    console.log(tab_combinaison);
    console.log(list_scenarios);
    console.log("Nombre var utilise : "+number_use_variable);

    return list_scenarios;
}

function recursePermutation(arr: (string| number)[][]): (string| number)[][] {
    // si le tableau ne contient qu'un seul sous-tableau, renvoyer simplement ce sous-tableau
    if (arr.length === 1) {
        return arr[0].map(val => [val]);
    }

    // sinon, prendre le premier sous-tableau et calculer toutes les permutations du reste du tableau
    const subperms : (string| number)[][] = recursePermutation(arr.slice(1));

    // itérer sur les valeurs du premier sous-tableau et les combiner avec toutes les permutations du reste du tableau
    return arr[0].reduce((acc: (string| number)[][], val: (string|number)) => {
        return acc.concat(subperms.map(subarr => [val, ...subarr]));
    }, []);
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