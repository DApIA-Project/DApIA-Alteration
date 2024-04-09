import { AlterationAdapters } from '../api/AlterationAdapters'
import { JavaAlterationManager } from '../api/adapters/JavaAlterationManager'
import { TypescriptAlterationManager } from '../api/adapters/TypescriptAlterationManager'
import MemoryScenarioManager from '../api/adapters/scenario/MemoryScenarioManager'
import PsqlScenarioManager from '../api/adapters/scenario/PsqlScenarioManager'
import MemoryUserManager from '../api/adapters/user/MemoryUserManager'
import PsqlUserManager from '../api/adapters/user/PsqlUserManager'

export default function makeTestAdapters(): AlterationAdapters {
  if (process.env.MEMORY_ADAPTERS) {
    return makeMemoryAdapters()
  }
  return makeMemoryAdapters()
}

export function makeMemoryAdapters(): AlterationAdapters {
  return {
    alterationManager: new TypescriptAlterationManager(),
    scenarioManager: new MemoryScenarioManager(),
    userManager: new MemoryUserManager(),
  }
}

export function makeProductionAdapters(): AlterationAdapters {
  return {
    alterationManager: new TypescriptAlterationManager(),
    scenarioManager: new PsqlScenarioManager(),
    userManager: new PsqlUserManager(),
  }
}
