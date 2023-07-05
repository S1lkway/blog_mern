const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const colors = require('colors')
const port = process.env.PORT || 5000

const app = express()

//Middleware is used to parse incoming requests with JSON payloads
app.use(express.json())
/* Middleware is used to parse incoming requests with URL-encoded payloads.
The 'extended' option determines how the URL-encoded data is parsed. When set to false, the data is parsed using the 'querystring' */
app.use(express.urlencoded({ extended: false }))



app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))