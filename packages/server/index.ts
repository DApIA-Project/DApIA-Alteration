'use strict'
import setRoutes from './appRoute'

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '200mb' }))
app.use('/', setRoutes())

app.listen(port, () => console.log(`Server started on port ${port}`))
