const asyncHandler = require('express-async-handler')
const path = require('path');
const fs = require('fs');
const Article = require('../models/articleModel')
const uploadFolderPath = path.join(__dirname, '../uploads/articleUploads')

//* desc Get All News
//* route GET /api/newsfeed
//* access Private
const getAllNews = asyncHandler(async (req, res) => {
  const news = await Article.find().sort({ createdAt: -1 })
  res.status(200).json(news)
})

module.exports = {
  getAllNews
}