export type DApIAAlterationServerConfig = {
  port: string
  DATABASE_URL: string
  SSL_CONFIGURATION: boolean
}
const CONFIG: DApIAAlterationServerConfig = {
  port: process.env.PORT || '3001',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/alterationdb',
  SSL_CONFIGURATION: process.env.SSL_CONFIGURATION
    ? process.env.SSL_CONFIGURATION === 'true'
    : false,
}
export default CONFIG
