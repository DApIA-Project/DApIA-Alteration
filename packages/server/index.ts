'use strict'
import express from 'express'
import cors from 'cors'
import setRoutes from './appRoute'
import { TestAlterationManager } from './api/adapters/TestAlterationManager'

new TestAlterationManager()
const app = express()

app.use(cors())
app.use(express.json({ limit: '200mb' }))
app.use('/', setRoutes())

app.listen(3001, () => console.log('Server started on port 3001'))
