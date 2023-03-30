'use strict'
import express from 'express'
import cors from 'cors'
import setRoutes from './appRoute'
import { FditAdapters } from './api/FditAdapters'
import { TestAlterationManager } from './api/adapters/TestAlterationManager'

const adapters: FditAdapters = {
  alterationManager: new TestAlterationManager(),
}

const app = express()

app.use(cors())
app.use(express.json({ limit: '200mb' }))
app.use('/', setRoutes())

app.listen(3001, () => console.log('Server started on port 3001'))
