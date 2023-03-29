import express from 'express'
import mongoose from 'mongoose'
require('dotenv').config()
import homeRouter from './routers/authRouter'
import corsMiddleware from './middlewares/corsMiddleware'

const app = express()
const port = process.env.PORT || 3000
const DB_HOST: string = process.env.DB_HOST || ''

mongoose.connect(DB_HOST)

import './schemas/userSchema'
import './schemas/userDetailSchema'

app.use(express.json())

app.use(corsMiddleware)

app.use(homeRouter)

app.use((_,res) => {
  res.status(404).send('not found')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

export default app