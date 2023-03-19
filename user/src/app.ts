import express from 'express'
require('dotenv').config()
import homeRouter from './routers/authRouter'
import corsMiddleware from './middlewares/corsMiddleware'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(corsMiddleware)

app.use(homeRouter)

app.use((req,res) => {
  res.status(404).send('not found')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

export default app