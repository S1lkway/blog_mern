const asyncHandler = require('express-async-handler')
const path = require('path');
const fs = require('fs');
const Article = require('../models/articleModel')

const uploadFolderPath = path.join(__dirname, '../uploads/articleUploads')



//* desc Create article
//* route POST /api/articles
//* access Private
const createArticle = asyncHandler(async (req, res) => {
  ///We get files data from FormData
  const files = req.files
  /// Get user id from token after login
  const userId = req.user.id;

  /// Create article
  if (userId) {
    const article = await Article.create({
      user: userId,
      name: req.body.name,
      text: req.body.text,
      images: files
    })
    res.status(200).json(article)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* desc Get Articles
//* route GET /api/articles
//* access Private
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ user: req.user.id }).sort({ createdAt: -1 })

  res.status(200).json(articles)
})

//* desc Get One Article
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

//* desc Edit Article
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

//* desc Delete Article Image
//* route DELETE /api/articles/:id/deleteimage
//* access Private
const deleteArticleImage = asyncHandler(async (req, res) => {
  const imageId = req.params.imageId
  const articleId = req.params.id
  /// Get artcile data from MongoDB
  const article = await Article.findById(articleId)
  const image = article.images.find((img) => img._id.toString() === imageId);

  try {
    /// Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User is not found')
    }
    /// Check for article
    if (!article) {
      res.status(400)
      throw new Error('Article is not found')
    }
    /// Make sure the logged in user matches the article user
    if (article.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User is not authorized')
    }

    /// Update article data in MongoDB
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { $pull: { images: { _id: imageId } } },
      { new: true }
    );
    if (!updatedArticle) {
      res.status(400)
      throw new Error('Article is not updated')
    } else {
      /// Delete file in upload folder
      const imagePath = path.join(uploadFolderPath, image.filename)
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ updatedArticle })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//* desc Delete article
//* route DELETE /api/articles:id
//* access Private
const deleteArticle = asyncHandler(async (req, res) => {

  /// Get artcile data from MongoDB
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

  /// Delete files attached to article
  article.images.forEach((image) => {
    const imagePath = path.join(__dirname, '../uploads/articleUploads', image.filename)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  });

  ///Delete article data from MongoDB
  await article.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  editArticle,
  deleteArticle,
  deleteArticleImage,
}