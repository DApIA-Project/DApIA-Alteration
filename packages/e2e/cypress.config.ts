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
    DATABASE_URL:
      'postgresql://postgres:postgres@localhost:5433/alterationdb_test',
  },
})
