import {
  ASTDeclaration,
  ASTLeftShift,
  ASTListDeclaration,
  ASTNumber,
  ASTNumberOffset,
  ASTRangeDeclaration,
  ASTRecordingParameterType,
  ASTRightShift,
  isASTIntegerValue,
  isASTLeftShift,
  isASTListDeclaration,
  isASTNumber,
  isASTNumberOffset,
  isASTRangeDeclaration,
  isASTRecordingValue,
} from '../language-server/generated/ast'
import { Declaration, Declarations } from '../types_variables'

enum RecordingParameterType {
  rec_duration = 'REC_DURATION',
  alt_duration = 'ALT_DURATION',
  rec_nbr_aircraft = 'REC_NBR_AIRCRAFT',
}

export function evalDeclarations(decls: ASTDeclaration[]): Declarations {
  return {
    declarations: decls
      .flatMap((i) => evalDecl(i))
      .filter((i) => i !== undefined) as Declaration[],
  }
}

function evalDecl(decl: ASTDeclaration): Declaration | undefined {
  if (isASTRangeDeclaration(decl)) {
    return {
      variable: decl.constant,
      values_range: evalRangeDeclaration(decl),
    }
  } else if (isASTListDeclaration(decl)) {
    return {
      variable: decl.constant,
      values_list: evalListDeclaration(decl),
    }
  }
  return undefined
}

function evalRangeDeclaration(range: ASTRangeDeclaration): number[] {
  return [range.range.range.start, range.range.range.end]
}

function evalListDeclaration(list: ASTListDeclaration): (number | string)[] {
  let values: (number | string)[] = []
  let items = list.list.list.items
  for (let i = 0; i < items.length; i++) {
    values.push(evalOneValue(items[i]))
  }
  return values
}

function evalOneValue(val: ASTNumberOffset | string): number | string {
  if (isASTNumberOffset(val)) {
    return evalNumberOffset(val)
  } else {
    return val.replace('"', '').replace('"', '')
  }
}

function evalNumberOffset(n: ASTNumberOffset): number | string {
  if (isASTNumber(n)) {
    return evalNumber(n)
  } else if (isASTLeftShift(n)) {
    return evalLeftShift(n)
  } else {
    return evalRightShift(n)
  }
}

function evalNumber(n: ASTNumber): number | string {
  if (isASTIntegerValue(n)) {
    return n.content
  } else {
    if (isASTRecordingValue(n.record)) {
      return evalRecordingParameterType(n.record.content)
    } else {
      return n.content
    }
  }
}

function evalLeftShift(n: ASTLeftShift): string | number {
  return evalNumber(n.content)
}

function evalRightShift(n: ASTRightShift): string | number {
  return evalNumber(n.content)
}

function evalRecordingParameterType(n: ASTRecordingParameterType): string {
  if (n.REC_DURATION != undefined) {
    return RecordingParameterType.rec_duration
  } else if (n.ALT_DURATION != undefined) {
    return RecordingParameterType.alt_duration
  } else {
    return RecordingParameterType.rec_nbr_aircraft
  }
}

/**
 * Count the number of scenario
 * @param scenario alterationscenario program to parse
 * @param declaration Declaration type of variables
 * @returns number of possible scenario
 */
export function countScenarioNumber(
  scenario: string,
  declaration: Declaration
): number {
  const regex = new RegExp(
    `${declaration.variable.toString().replace('$', '\\$')}\\b`,
    'g'
  )
  const matches = scenario.match(regex)

  /** Calcul du nombre de scénario pour une variable déclarée
   *  Si range alors on prend les deux valeurs donc on retourne 2^(nb_utilisation_var)
   *  Si liste alors on prend le nombre de valeurs qu'il y a donc on retourne nb_values^(nb_utilisation_var)
   *  Sinon on retourne 0 (cas impossible) //Remodifier le code
   **/
  let res: number
  if (declaration.values_range != undefined) {
    if (matches!.length - 1 == 0) {
      res = 0
    } else {
      res = Math.pow(2, matches!.length - 1)
    }
  } else {
    if (matches!.length - 1 == 0) {
      res = 0
    } else {
      res = Math.pow(declaration.values_list!.length, matches!.length - 1)
    }
  }

  return res
}

/**
 * Creation of all scenario
 * @param scenario alterationscenario program to parse
 * @param declarations Declaration type of variables
 * @param nb_scenario Number of scnenario
 * @returns Array of string (all scenario)
 */
export function createAllScenario(
  scenario: string,
  declarations: Declarations,
  nb_scenario: number
): string[] {
  let list_scenarios: string[] = []

  /** Copie des variables dans une map de variable "nom_variable -> [values]" **/
  let variables = new Map<string, (number | string)[]>([])
  for (let i = 0; i < declarations.declarations.length; i++) {
    if (declarations.declarations[i].values_range != undefined) {
      variables.set(
        declarations.declarations[i].variable,
        declarations.declarations[i].values_range!
      )
    } else {
      variables.set(
        declarations.declarations[i].variable,
        declarations.declarations[i].values_list!
      )
    }
  }

  /** Recuperation des utilisations des variables dans le scenario avec ordre exact des utilisations **/
  let scenario_without_decls = scenario.replace(/^(let\s.*,\s*)*/, '')
  let regex_var_str = ''
  let index = 0
  for (let one_var of variables.keys()) {
    if (index == 0) {
      regex_var_str = regex_var_str + one_var
      index++
    } else {
      regex_var_str = regex_var_str + '|' + one_var
    }
  }
  const regex_var = new RegExp(
    `${regex_var_str.toString().replaceAll('$', '\\$')}`,
    'g'
  )
  const matches_var = scenario_without_decls.match(regex_var)

  /** Creation des variables en doublons qui sont utilisés plusieurs fois. Renommage nomvariable_i **/
  let variables_uses = new Map<string, (number | string)[]>([])
  for (let i = 0; i < matches_var!.length; i++) {
    variables_uses.set(
      matches_var![i] + '_' + i,
      variables.get(matches_var![i])!
    )
  }

  /** Creation de tous les melanges de variables possibles **/
  let map_to_tab = []
  for (let value of variables_uses.values()) {
    map_to_tab.push(value)
  }
  let tab_combinaison = recursePermutation(map_to_tab)

  /** Creation de tous les scenarios en fonction des mélanges de variables **/
  let one_scenario = ''
  for (let i = 0; i < nb_scenario; i++) {
    one_scenario = scenario_without_decls
    for (let j = 0; j < matches_var!.length; j++) {
      if (typeof tab_combinaison[i][j] === 'string') {
        one_scenario = one_scenario.replace(
          matches_var![j],
          '"' + tab_combinaison[i][j].toString() + '"'
        )
      } else {
        one_scenario = one_scenario.replace(
          matches_var![j],
          tab_combinaison[i][j].toString()
        )
      }
    }
    list_scenarios.push(one_scenario)
  }

  return list_scenarios
}

/**
 * Recursive function who create all combinaison of array possible with many array
 * @param arr Array of array of string or number (variables values possibles)
 * @returns Array of array of string or number with values mixed
 */
function recursePermutation(arr: (string | number)[][]): (string | number)[][] {
  /** Si le tableau ne contient qu'un seul sous-tableau, renvoyer simplement ce sous-tableau **/
  if (arr.length === 1) {
    return arr[0].map((val) => [val])
  }

  /** Sinon, prendre le premier sous-tableau et calculer toutes les permutations du reste du tableau **/
  const subperms: (string | number)[][] = recursePermutation(arr.slice(1))

  /** Itérer sur les valeurs du premier sous-tableau et les combiner avec toutes les permutations du reste du tableau **/
  return arr[0].reduce((acc: (string | number)[][], val: string | number) => {
    return acc.concat(subperms.map((subarr) => [val, ...subarr]))
  }, [])
}
