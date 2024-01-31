import express, { json } from 'express'
import setRoutes from '../../appRoute'
import setAdapters from '../../api/middlewares/setAdapters'
import { AlterationAdapters } from '../../api/AlterationAdapters'

export function setupExpress(adapters: AlterationAdapters) {
  const app = express()
  app.use(json())
  app.use(setAdapters(adapters))
  app.use('/', setRoutes())
  return app
}
