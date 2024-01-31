import { Logger, truncateDB } from '../api/database/db'

const nullLogger: Logger = {
  log: () => null,
  error: () => null,
}
export async function clearMemoryDb() {}

export async function clearProductionDb(logger: Logger = nullLogger) {
  return truncateDB(logger)
}

export async function clearDb() {
  if (process.env.MEMORY_ADAPTERS) {
    return clearMemoryDb()
  }
  return clearProductionDb()
}
