"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FditscenarioValidator = exports.registerValidationChecks = void 0;
/**
 * Register custom validation checks.
 */
function registerValidationChecks(services) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.FditscenarioValidator;
    const checks = {
        ASTScenario: validator.checkMinInstr
    };
    registry.register(checks, validator);
}
exports.registerValidationChecks = registerValidationChecks;
/**
 * Implementation of custom validations.
 */
class FditscenarioValidator {
    checkMinInstr(scenario, accept) {
        if (scenario.instructions.length == 0) {
            accept('error', `Instr no exists.`, { node: scenario });
        }
    }
}
exports.FditscenarioValidator = FditscenarioValidator;
