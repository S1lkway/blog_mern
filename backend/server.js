const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()


//TODO Middlewares
/* Used to parse incoming requests with JSON payloads */
app.use(express.json())
/* Used to parse incoming requests with URL-encoded payloads 
The extended option determines how the URL-encoded data is parsed. When set to false, the data is parsed using the querystring*/
app.use(express.urlencoded({ extended: false }))


//TODO  ROUTES  
// routes for registration, edit user and authorization
app.use('/api/users', require('./routes/userRoutes'))
// routes for creating, deleting and edit articles
app.use('/api/articles', require('./routes/articleRoutes'))

/* Provides a basic error handling mechanism in Express that sends a JSON response with an error message and, optionally, the stack trace */
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`.yellow.underline))