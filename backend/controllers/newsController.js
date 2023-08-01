const asyncHandler = require('express-async-handler')
const path = require('path');
const fs = require('fs');
const Article = require('../models/articleModel')
const uploadFolderPath = path.join(__dirname, '../uploads/articleUploads')

//* desc Get All News
//* route GET /api/news
//* access Private
const getAllNews = asyncHandler(async (req, res) => {
  const news = await Article.find().sort({ createdAt: -1 })
  res.status(200).json(news)
})

//* desc Toggle Like for article
//* route GET /api/news/like/:id
//* access Private
const toggleLike = asyncHandler(async (req, res) => {

  /// Get newsItem data from MongoDB
  const article = await Article.findById(req.params.id)
  /// Check for article
  if (!article) {
    res.status(400)
    throw new Error('Article is not found')
  }
  /// Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User is not found')
  }

  /// Check if the user has already liked the article
  const userHasLiked = article.likedBy.includes(req.user._id);

  if (userHasLiked) {
    /// User has liked the article, so unlike it
    article.likes -= 1;
    article.likedBy = article.likedBy.filter((userId) => userId.toString() !== req.user._id.toString());
  } else {
    /// User has not liked the article, so like it
    article.likes += 1;
    article.likedBy.push(req.user._id);
  }

  /// Save the updated article in the database
  const updatedArticle = await article.save();
  res.status(200).json(updatedArticle);
})

module.exports = {
  getAllNews,
  toggleLike
}