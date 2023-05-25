import { FditAdapters } from '../api/FditAdapters'
import { TestAlterationManager } from '../api/adapters/TestAlterationManager'
import { JavaAlterationManager } from '../api/adapters/JavaAlterationManager'

export default function makeTestAdapters(): FditAdapters {
  if (process.env.MEMORY_ADAPTERS) {
    return makeMemoryAdapters()
  }
  return makeProductionAdapters()
}

export function makeMemoryAdapters(): FditAdapters {
  return {
    alterationManager: new TestAlterationManager(),
  }
}

export function makeProductionAdapters(): FditAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
  }
}
