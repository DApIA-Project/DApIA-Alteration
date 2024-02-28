import { sequelize } from './connection'
import Scenario from '../models/scenario.model'
import User from '../models/user.model'

export type Logger = {
  log: typeof console.log
  error: typeof console.error
}

export async function truncateDB(logger: Logger = console) {
  return sequelize
    .authenticate()
    .then(async () => {
      try {
        const options = {
          logging: logger.log,
          cascade: true,
          truncate: true,
        }

        await User.destroy(options)
        await Scenario.destroy(options)

        logger.log('DB truncate success')
      } catch (error) {
        logger.error(`DB truncate failure: ${error}`)
      }
    })
    .catch((error) => {
      logger.error('DB Truncate Failure: ' + error.message)
    })
}
