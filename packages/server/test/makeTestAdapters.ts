import { AlterationAdapters } from '../api/AlterationAdapters'
import { JavaAlterationManager } from '../api/adapters/JavaAlterationManager'

export default function makeTestAdapters(): AlterationAdapters {
  if (process.env.MEMORY_ADAPTERS) {
    return makeMemoryAdapters()
  }
  return makeProductionAdapters()
}

export function makeMemoryAdapters(): AlterationAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
  }
}

export function makeProductionAdapters(): AlterationAdapters {
  return {
    alterationManager: new JavaAlterationManager(),
  }
}
