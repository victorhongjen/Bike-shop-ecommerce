import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

// impliment middleware, a function that has access to req res object
app.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)

//create error middleware for the routes

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))