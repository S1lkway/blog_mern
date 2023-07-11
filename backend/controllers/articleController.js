const asyncHandler = require('express-async-handler')

const Article = require('../models/articleModel')
const User = require('../models/userModel')


//* @desc Create article
//* @route POST /api/articles
//* @access Private
const createArticle = asyncHandler(async (req, res) => {

  /// Get user id from token after login
  const userId = req.user.id;

  /// Create article
  if (userId) {
    const article = await Article.create({
      user: userId,
      name: req.body.name,
      text: req.body.text,
    })
    res.status(200).json(article)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* @desc Get articles
//* @route GET /api/articles
//* @access Private
const getArticles = asyncHandler(async (req, res) => {
  res.status(200)
})

//* @desc Edit article
//* @route PUT /api/articles:id
//* @access Private
const editArticle = asyncHandler(async (req, res) => {
  res.status(200)
})

//* @desc Delete article
//* @route DELETE /api/articles:id
//* @access Private
const deleteArticle = asyncHandler(async (req, res) => {
  res.status(200)
})

module.exports = {
  getArticles,
  createArticle,
  editArticle,
  deleteArticle,
}