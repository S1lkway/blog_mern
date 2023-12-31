const asyncHandler = require('express-async-handler')
const Article = require('../models/articleModel')
const Comment = require('../models/commentModel')

//* desc Get All News
//* route GET /api/news
//* access Private
const getAllNews = asyncHandler(async (req, res) => {
  // Get data of news and their comments
  const news = await Article.find().sort({ createdAt: -1 }).populate({
    path: 'comments',
    populate: {
      path: 'user',
      model: 'User',
      select: '_id name email',
    },
    options: {
      sort: { createdAt: -1 },
    },
  })
  res.status(200).json(news)
})

//* desc Toggle Like for article
//* route GET /api/news/like/:id
//* access Private
const toggleLike = asyncHandler(async (req, res) => {

  // Get newsItem data from MongoDB
  const article = await Article.findById(req.params.id)
  // Check for article
  if (!article) {
    res.status(400)
    throw new Error('Article is not found')
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User is not found')
  }

  // Check if the user has already liked the article
  const userHasLiked = article.likedBy.includes(req.user._id);

  if (userHasLiked) {
    // User has liked the article, so unlike it
    article.likes -= 1;
    article.likedBy = article.likedBy.filter((userId) => userId.toString() !== req.user._id.toString());
  } else {
    // User has not liked the article, so like it
    article.likes += 1;
    article.likedBy.push(req.user._id);
  }

  // Save the updated article in the database
  await article.save()
  const updatedArticle = await Article.findById(req.params.id).populate({
    path: 'comments',
    populate: {
      path: 'user',
      model: 'User',
      select: '_id name email',
    },
    options: {
      sort: { createdAt: -1 },
    },
  });

  res.status(200).json(updatedArticle);
})

//* desc Add Comment for news
//* route POST /api/news/comment/:id
//* access Private
const addComment = asyncHandler(async (req, res) => {
  // Get newsItem data from MongoDB
  const article = await Article.findById(req.params.id)
  // Check for article
  if (!article) {
    res.status(400)
    throw new Error('Article is not found')
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User is not found')
  }
  // Create comment
  if (article) {
    const newComment = await Comment.create({
      user: req.user._id,
      article: article._id,
      text: req.body.text,
    })
    // Add _id of new comment to article
    article.comments.push(newComment._id);
    // Save article
    await article.save();
    const commentReturn = await Comment.findById(newComment._id).populate({
      path: 'user',
      select: '_id name email',
    })

    res.status(200).json(commentReturn)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//* desc DELETE Comment of news
//* route DELETE /api/news/comment/:id
//* access Private
const deleteComment = asyncHandler(async (req, res) => {
  /// Consts 
  // Get newsItem data from MongoDB
  const article = await Article.findById(req.params.id)
  // Get comment data
  const comment = await Comment.findById(req.params.commentId)
  /// Checks
  // Check for article
  if (!article) {
    res.status(400)
    throw new Error('Article is not found')
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User is not found')
  }
  // Make sure the logged in user matches the article user
  if (comment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('The comment belongs to another user')
  }
  /// Actions
  await comment.deleteOne()
  article.comments = article.comments.filter((comment) => comment.toString() !== req.params.commentId);
  await article.save();

  res.status(200).json({ id: req.params.id, commentId: req.params.commentId })
})

module.exports = {
  getAllNews,
  toggleLike,
  addComment,
  deleteComment
}