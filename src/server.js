import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import questionRoutes from './routes/quesstionRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import cors from 'cors'
import hpp from 'hpp'
import { notFound, globalError } from './controllers/errorController.js'
import { connectDb } from './db/index.js'

process.loadEnvFile()

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config()

const app = express()

const uri =
  process.env.NODE_ENV === 'development'
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD

connectDb(uri)

// Middlewares
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
})

app.use('/api', limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/questions', questionRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello')
})

// ERROR HANDLING

app.all('*', notFound)

app.use(globalError)

const PORT = process.env.PORT || 4020

const server = app.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}`)
)

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
