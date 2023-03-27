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
 * @returns Generated output from this FDIT program
 */
export async function parseAndGenerate (fditscenrioProgram: string, fileName : string, fileContent : string): Promise<{} | undefined> {
    const services = createFditscenarioServices(EmptyFileSystem).Fditscenario;
    const scenario = await extractAstNodeFromString<ASTScenario>(fditscenrioProgram, services);
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

/**
 * Get variables from Scenario
 * @param fditscenarioProgram fditscenario program to parse
 * @returns Generated output from this FDIT program
 */
export async function get_variables (fditscenrioProgram: string): Promise<Declarations | undefined> {
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
        return undefined;
    }

    const variables : Declarations = generateVariables(scenario);
    return variables;

}

/**
 * Count the number of scenario
 * @param fditscenarioProgram fditscenario program to parse
 * @param declaration Declaration type of variables
 * @returns number of possible scenario
 */
export function countScenarioNumber(fditscenarioProgram: string, declaration : Declaration): number  {

    const regex = new RegExp(`${declaration.variable.toString().replace('$', '\\$')}\\b`, 'g');
    const matches = fditscenarioProgram.match(regex);

    /** Calcul du nombre de scénario pour une variable déclarée
     *  Si range alors on prend les deux valeurs donc on retourne 2^(nb_utilisation_var)
     *  Si liste alors on prend le nombre de valeurs qu'il y a donc on retourne nb_values^(nb_utilisation_var)
     *  Sinon on retourne 0 (cas impossible) //Remodifier le code
     **/
    let res = 0;
    if(declaration.values_range != undefined){
        if(matches!.length-1 == 0){
            res = 0;
        }else{
            res = Math.pow(2,matches!.length-1);
        }

    } else {
        if(matches!.length-1 == 0){
            res = 0;
        }else{
            res = Math.pow(declaration.values_list!.length,matches!.length-1);
        }
    }

    return res;

}

/**
 * Creation of all scenario
 * @param scenario fditscenario program to parse
 * @param declaration Declaration type of variables
 * @param nb_scenario Number of scnenario
 * @returns Array of string (all scenario)
 */
export function createAllScenario(scenario : string, declarations : Declarations, nb_scenario : number) : string[] {
    let list_scenarios : string[] = [];

    /** Copie des variables dans une map de variable "nom_variable -> [values]" **/
    let variables = new Map<string,(number|string)[]>([]);
    for(let i=0; i<declarations.declarations.length;i++){
        if(declarations.declarations[i].values_range != undefined){
            variables.set(declarations.declarations[i].variable,declarations.declarations[i].values_range!)
        }else {
            variables.set(declarations.declarations[i].variable,declarations.declarations[i].values_list!)
        }
    }

    /** Recuperation des utilisations des variables dans le scenario avec ordre exact des utilisations **/
    let scenario_without_decls = scenario.replace(/^(let\s.*,\s*)*/,"");
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
    const regex_var = new RegExp(`${regex_var_str.toString().replaceAll('$', '\\$')}`, 'g');
    const matches_var = scenario_without_decls.match(regex_var);

    /** Creation des variables en doublons qui sont utilisés plusieurs fois. Renommage nomvariable_i **/
    let variables_uses = new Map<string,(number|string)[]>([]);
    for(let i=0;i<matches_var!.length;i++){
            variables_uses.set(matches_var![i]+"_"+i,variables.get(matches_var![i])!);
    }

    /** Creation de tous les melanges de variables possibles **/
    let map_to_tab = [];
    for(let value of variables_uses.values()){
        map_to_tab.push(value);
    }
    let tab_combinaison = recursePermutation(map_to_tab);

    /** Creation de tous les scenarios en focntion des mélanges de variables **/
    let one_scenario = ""
    for(let i=0 ; i<nb_scenario;i++){
        one_scenario = scenario_without_decls;
        for(let j=0; j<matches_var!.length;j++){
            if(typeof tab_combinaison[i][j] === "string"){
                one_scenario = one_scenario.replace(matches_var![j],"\""+tab_combinaison[i][j].toString()+"\"");
            }else{
                one_scenario = one_scenario.replace(matches_var![j],tab_combinaison[i][j].toString());
            }

        }
        list_scenarios.push(one_scenario);
    }

    return list_scenarios;
}

/**
 * Recursive function who create all combinaison of array possible with many array
 * @param arr Array of array of string or number (variables values possibles)
 * @returns Array of array of string or number with values mixed
 */
function recursePermutation(arr: (string| number)[][]): (string| number)[][] {
    /** Si le tableau ne contient qu'un seul sous-tableau, renvoyer simplement ce sous-tableau **/
    if (arr.length === 1) {
        return arr[0].map(val => [val]);
    }

    /** Sinon, prendre le premier sous-tableau et calculer toutes les permutations du reste du tableau **/
    const subperms : (string| number)[][] = recursePermutation(arr.slice(1));

    /** Itérer sur les valeurs du premier sous-tableau et les combiner avec toutes les permutations du reste du tableau **/
    return arr[0].reduce((acc: (string| number)[][], val: (string|number)) => {
        return acc.concat(subperms.map(subarr => [val, ...subarr]));
    }, []);
}