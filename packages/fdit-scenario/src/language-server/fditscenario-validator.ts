import { ValidationAcceptor, ValidationChecks } from 'langium'
import { FditscenarioAstType, ASTScenario } from './generated/ast'
import type { FditscenarioServices } from './fditscenario-module'

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: FditscenarioServices) {
  const registry = services.validation.ValidationRegistry
  const validator = services.validation.FditscenarioValidator
  const checks: ValidationChecks<FditscenarioAstType> = {
    ASTScenario: validator.checkMinInstr,
  }
  registry.register(checks, validator)
}

/**
 * Implementation of custom validations.
 */
export class FditscenarioValidator {
  checkMinInstr(scenario: ASTScenario, accept: ValidationAcceptor): void {
    if (scenario.instructions.length == 0) {
      accept('error', `Instr no exists.`, { node: scenario })
    }
  }
}
