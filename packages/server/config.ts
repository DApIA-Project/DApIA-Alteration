const dotenv = require('dotenv')

dotenv.config()

export type DApIAAlterationServerConfig = {
  port: string
  DATABASE_URL: string
  SSL_CONFIGURATION: boolean
}
console.log('Cypress MODE_TEST server:', process.env.MODE_TEST)
const isTestEnvironment = process.env.MODE_TEST === 'true'
const CONFIG: DApIAAlterationServerConfig = {
  port: process.env.PORT || '3001',
  DATABASE_URL: isTestEnvironment
    ? process.env.TEST_DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5433/alterationdb_test'
    : process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/alterationdb',
  SSL_CONFIGURATION: process.env.SSL_CONFIGURATION
    ? process.env.SSL_CONFIGURATION === 'true'
    : false,
}
export default CONFIG
