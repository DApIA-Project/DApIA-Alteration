import { AlterationAdapters } from '../api/AlterationAdapters'
import { JavaAlterationManager } from '../api/adapters/JavaAlterationManager'
import MemoryScenarioManager from '../api/adapters/scenario/MemoryScenarioManager'

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
  }
}

export function makeProductionAdapters(): AlterationAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
    scenarioManager: new MemoryScenarioManager(),
  }
}
