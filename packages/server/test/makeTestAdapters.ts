import { AlterationAdapters } from '../api/AlterationAdapters'
import { JavaAlterationManager } from '../api/adapters/JavaAlterationManager'
import { TypescriptAlterationManager } from '../api/adapters/TypescriptAlterationManager'

export default function makeTestAdapters(): AlterationAdapters {
  if (process.env.MEMORY_ADAPTERS) {
    return makeMemoryAdapters()
  }
  return makeProductionAdapters()
}

export function makeMemoryAdapters(): AlterationAdapters {
  return {
    alterationManager: new TypescriptAlterationManager(),
  }
}

export function makeProductionAdapters(): AlterationAdapters {
  return {
    alterationManager: new TypescriptAlterationManager(),
  }
}
