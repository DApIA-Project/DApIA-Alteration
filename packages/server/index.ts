'use strict'
import setRoutes from './appRoute'
import setAdapters from './api/middlewares/setAdapters'
import MemoryScenarioManager from './api/adapters/scenario/MemoryScenarioManager'
import { JavaAlterationManager } from './api/adapters/JavaAlterationManager'
import PsqlScenarioManager from './api/adapters/scenario/PsqlScenarioManager'
import MemoryUserManager from './api/adapters/user/MemoryUserManager'
import PsqlUserManager from './api/adapters/user/PsqlUserManager'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { TypescriptAlterationManager } from './api/adapters/TypescriptAlterationManager'

//const express = require('express')
//const cors = require('cors')
//const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '200mb' }))
app.use(
  setAdapters({
    scenarioManager: new PsqlScenarioManager(),
    alterationManager: new TypescriptAlterationManager(),
    userManager: new PsqlUserManager(),
  })
)
app.use('/', setRoutes())

app.listen(port, () => console.log(`Server started on port ${port}`))
