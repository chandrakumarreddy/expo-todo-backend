import express, { type Response } from 'express'

import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import { PORT } from './config'
import { swaggerDocs } from './config/swagger'
import { connectToDatabase } from './db'
import v1Routes from './routes/v1'

dotenv.config()

async function main() {
  await connectToDatabase()

  const app = express()
  app.use(express.json())

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  app.get('/ping', (_, res: Response) => {
    res.send('pong')
  })

  app.use('/api/v1', v1Routes)

  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
  })
}

main().catch(console.error)
