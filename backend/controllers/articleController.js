const asyncHandler = require('express-async-handler')

const Article = require('../models/articleModel')
const User = require('../models/userModel')


//* desc Create article
//* route POST /api/articles
//* access Private
const createArticle = asyncHandler(async (req, res) => {

  /// Get user id from token after login
  const userId = req.user.id;
  const fileName = req.file ? req.file.filename : []

  /// Create article
  if (userId) {
    const article = await Article.create({
      user: userId,
      name: req.body.name,
      text: req.body.text,
      image: fileName
    })
    res.status(200).json(article)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* desc Get articles
//* route GET /api/articles
//* access Private
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ user: req.user.id }).sort({ createdAt: -1 })

  res.status(200).json(articles)
})

//* desc Get one article
//* route GET /api/articles/:id
//* access Private
const getArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
  /// Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  /// Make sure the logged in user matches the article user
  if (article.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('The article belongs to another user')
  }

  if (!article) {
    res.status(400)
    throw new Error('Article is not found')
  }

  res.status(200).json(article)
})

//* desc Edit article
//* route PUT /api/articles:id
//* access Private
const editArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    /// Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    /// Make sure the logged in user matches the article user
    if (article.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('The article belongs to another user')
    }

    if (!article) {
      res.status(400)
      throw new Error('Article is not found')
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.status(200).json(updatedArticle)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

//* desc Delete article
//* route DELETE /api/articles:id
//* access Private
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
  getArticle,
  createArticle,
  editArticle,
  deleteArticle,
}