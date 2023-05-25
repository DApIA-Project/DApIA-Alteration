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
      await alterationManager.runAlterations(
        [
          {
            sensors: {
              sensor: [
                {
                  action: [],
                  filter: '',
                  record: 'zigzag.sbs',
                  firstDate: 1543145448179,
                  sID: '',
                  sensorType: 'SBS',
                },
              ],
            },
          },
        ],
        { name: 'recording.bst', content: '' },
        { haveLabel: false, haveRealism: false }
      )
    })
  })
}

IAlterationContractTest('JavaAlterationManager', makeProductionAdapters)
