import { FditAdapters } from '../../src/api/FditAdapters'
import { TestAlterationManager } from '../../src/api/adapters/TestAlterationManager'

export function makeTestAdapters(): FditAdapters {
  return {
    alterationManager: new TestAlterationManager(),
  }
}
