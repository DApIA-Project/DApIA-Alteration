import { Options, Sequelize } from 'sequelize'
import CONFIG from '../../config'

let options: Options = { logging: false }

if (CONFIG.SSL_CONFIGURATION) {
  options = {
    dialect: 'postgres',
    ssl: false,
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  }
}

export const sequelize: Sequelize = new Sequelize(CONFIG.DATABASE_URL, options)
