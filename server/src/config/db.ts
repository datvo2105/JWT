import mongoose from 'mongoose'
import env from './env'

mongoose.connect(env.dbUrl, { dbName: env.dbName })

const conn = mongoose.connection
conn.on('connected', () => {
  console.log('Success::: Database is connecting...')
})
conn.on('error', (error) => console.error(`Error::: Can't connect database.\n`, error))
