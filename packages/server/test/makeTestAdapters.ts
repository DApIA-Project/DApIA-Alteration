import { AlterationAdapters } from '../api/AlterationAdapters'
import { JavaAlterationManager } from '../api/adapters/JavaAlterationManager'
import MemoryScenarioManager from '../api/adapters/scenario/MemoryScenarioManager'
import PsqlScenarioManager from '../api/adapters/scenario/PsqlScenarioManager'
import MemoryUserManager from '../api/adapters/user/MemoryUserManager'

export default function makeTestAdapters(): AlterationAdapters {
  if (process.env.MEMORY_ADAPTERS) {
    return makeMemoryAdapters()
  }
  return makeProductionAdapters()
}

export function makeMemoryAdapters(): AlterationAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
    scenarioManager: new MemoryScenarioManager(),
    userManager: new MemoryUserManager(),
  }
}

export function makeProductionAdapters(): AlterationAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
    scenarioManager: new PsqlScenarioManager(),
    userManager: new MemoryUserManager(),
  }
}
