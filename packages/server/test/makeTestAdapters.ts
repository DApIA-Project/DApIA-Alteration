import { FditAdapters } from '../api/FditAdapters'
import { JavaAlterationManager } from '../api/adapters/JavaAlterationManager'

export default function makeTestAdapters(): FditAdapters {
  if (process.env.MEMORY_ADAPTERS) {
    return makeMemoryAdapters()
  }
  return makeProductionAdapters()
}

export function makeMemoryAdapters(): FditAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
  }
}

export function makeProductionAdapters(): FditAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
  }
}
