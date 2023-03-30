import express from 'express'
import mongoose from 'mongoose'
require('dotenv').config()
import baseRouter from './routers/userRouter'
import corsMiddleware from './middlewares/corsMiddleware'
import { DB_HOST, PORT } from './consts/userConst'

const app = express()

mongoose.connect(DB_HOST)

import './schemas/userSchema'
import './schemas/userDetailSchema'

app.use(express.json())

app.use(corsMiddleware)

app.use((_, res, next) => {
  res.setTimeout(10000)
  next()
})

app.use(baseRouter)

app.use((_,res) => {
  res.status(404).send('not found')
})

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})

export default app