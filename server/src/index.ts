import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import env from '@/config/env'
import '@/config/db'
import router from '@/routes'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/v1', router)

app.listen(env.port, () => {
  console.log(`Server is running on http://localhost:${env.port}`)
})
