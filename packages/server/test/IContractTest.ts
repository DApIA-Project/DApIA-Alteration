import { FditAdapters } from '../api/FditAdapters'

type IContractTest = (
  implementationName: string,
  makeAdapters: () => FditAdapters
) => void

export default IContractTest
