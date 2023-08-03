const express = require('express')
const router = express.Router()
const {
  getAllNews,
  toggleLike,
  addComment,
  deleteComment
} = require('../controllers/newsController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllNews)
router.route('/like/:id').put(protect, toggleLike)
router.route('/comment/:id').post(protect, addComment)
router.route('/comment/:id/delete/:commentId').delete(protect, deleteComment)


module.exports = router