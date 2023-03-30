import {
  createDefaultModule,
  createDefaultSharedModule,
  DefaultSharedModuleContext,
  inject,
  LangiumServices,
  LangiumSharedServices,
  Module,
  PartialLangiumServices,
} from 'langium'
import {
  AttackScenarioGrammarGeneratedModule,
  FditscenarioGeneratedSharedModule,
} from './generated/module'
import {
  FditscenarioValidator,
  registerValidationChecks,
} from './fditscenario-validator'

/**
 * Declaration of custom services - add your own service classes here.
 */
export type FditscenarioAddedServices = {
  validation: {
    FditscenarioValidator: FditscenarioValidator
  }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type FditscenarioServices = LangiumServices & FditscenarioAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const FditscenarioModule: Module<
  FditscenarioServices,
  PartialLangiumServices & FditscenarioAddedServices
> = {
  validation: {
    FditscenarioValidator: () => new FditscenarioValidator(),
  },
}

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createFditscenarioServices(
  context: DefaultSharedModuleContext
): {
  shared: LangiumSharedServices
  Fditscenario: FditscenarioServices
} {
  const shared = inject(
    createDefaultSharedModule(context),
    FditscenarioGeneratedSharedModule
  )
  const Fditscenario = inject(
    createDefaultModule({ shared }),
    AttackScenarioGrammarGeneratedModule,
    FditscenarioModule
  )
  // shared.lsp.ExecuteCommandHandler = new FditscenarioCommandHandler();
  shared.ServiceRegistry.register(Fditscenario)
  registerValidationChecks(Fditscenario)
  return { shared, Fditscenario }
}

/**class FditscenarioCommandHandler extends AbstractExecuteCommandHandler {
    registerCommands(acceptor: ExecuteCommandAcceptor): void {
        // accept a single command called 'parseAndGenerate'
        acceptor('parseAndGenerate', args => {
            // invoke generator on this data, and return the response
            return parseAndGenerate(args[0],args[1],args[2]);
        });
    }
}**/
