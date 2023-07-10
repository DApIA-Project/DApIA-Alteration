import { ValidationAcceptor, ValidationChecks } from 'langium'
import { AlterationscenarioAstType, ASTScenario } from './generated/ast'
import type { AlterationscenarioServices } from './alterationscenario-module'

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: AlterationscenarioServices) {
  const registry = services.validation.ValidationRegistry
  const validator = services.validation.AlterationscenarioValidator
  const checks: ValidationChecks<AlterationscenarioAstType> = {
    ASTScenario: validator.checkMinInstr,
  }
  registry.register(checks, validator)
}

/**
 * Implementation of custom validations.
 */
export class AlterationscenarioValidator {
  checkMinInstr(scenario: ASTScenario, accept: ValidationAcceptor): void {
    if (scenario.instructions.length == 0) {
      accept('error', `Instr no exists.`, { node: scenario })
    }
  }
}
