import { AlterationAdapters } from '../api/AlterationAdapters'

type IContractTest = (
  implementationName: string,
  makeAdapters: () => AlterationAdapters,
  clearDb: () => Promise<void>
) => void

export default IContractTest
