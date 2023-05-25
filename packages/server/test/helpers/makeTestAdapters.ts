import { FditAdapters } from '../../api/FditAdapters'
import { TestAlterationManager } from '../../api/adapters/TestAlterationManager'

export function makeTestAdapters(): FditAdapters {
  return {
    alterationManager: new TestAlterationManager(),
  }
}
