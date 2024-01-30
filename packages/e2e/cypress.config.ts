import { defineConfig } from 'cypress'
import { clearProductionDb } from '@smartesting/dapia-server/db'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        'db:reset': async () => {
          await clearProductionDb()
          return 'Truncated DB'
        },
      })
    },
  },
  env: {
    MODE_TEST: 'true',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  },
})

console.log('Cypress NODE_ENV e2e:', process.env.MODE_TEST)
