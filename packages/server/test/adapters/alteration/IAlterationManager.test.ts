import assert from 'assert'
import IContractTest from '../../IContractTest'
import {
  makeMemoryAdapters,
  makeProductionAdapters,
} from '../../makeTestAdapters'
import IAlterationManager from '../../../api/adapters/IAlterationManager'

const IAlterationContractTest: IContractTest = (
  implementationName,
  makeAdapters
) => {
  describe.skip(implementationName, () => {
    let alterationManager: IAlterationManager

    beforeEach(async () => {
      const adapters = makeAdapters()
      alterationManager = adapters.alterationManager
    })

    it('fails', async () => {
      assert(false)
    })
  })
}

IAlterationContractTest('TestAlterationManager', makeMemoryAdapters)

IAlterationContractTest('JavaAlterationManager', makeProductionAdapters)
