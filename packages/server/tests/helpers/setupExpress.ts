import express, { json } from 'express'
import setRoutes from '../../src/appRoute'

export function setupExpress() {
  const app = express()
  app.use(json())
  app.use('/', setRoutes())
  return app
}
