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
  const articles = await Article.find({ user: req.user.id })

  res.status(200).json(articles)
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

  /// Make sure the logged in user matches the article user
  if (article.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User is not authorized')
  }

  await article.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getArticles,
  createArticle,
  editArticle,
  deleteArticle,
}