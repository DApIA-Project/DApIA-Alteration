import { AlterationAdapters } from '../api/AlterationAdapters'

type IContractTest = (
  implementationName: string,
  makeAdapters: () => AlterationAdapters
) => void

export default IContractTest
