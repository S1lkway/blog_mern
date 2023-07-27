const express = require('express')
const path = require('path');
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


connectDB()
const app = express()


//* PATH TO GET IMAGES FROM BACKEND TO FRONTEND
/* We make absolute path to folder with files */
const articleUploadsPath = path.join(__dirname, 'uploads', 'articleUploads');
/* Set path on frontend that will use backend path in articleUploadsPath */
app.use('/uploads/articleUploads', express.static(articleUploadsPath));


//* MIDDLEWARES
/* Used to parse incoming requests with JSON payloads */
app.use(express.json())
/* Used to parse incoming requests with URL-encoded payloads 
The extended option determines how the URL-encoded data is parsed. When set to false, the data is parsed using the querystring*/
app.use(express.urlencoded({ extended: false }))


//*  ROUTES  
// routes for registration, edit user and authorization
app.use('/api/users', require('./routes/userRoutes'))
// routes for creating, deleting and edit articles
app.use('/api/articles', require('./routes/articleRoutes'))
// routes for reading all articles, make comments and like them
app.use('/api/news', require('./routes/newsRoutes'))

/* Provides a basic error handling mechanism in Express that sends a JSON response with an error message and, optionally, the stack trace */
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`.yellow.underline))