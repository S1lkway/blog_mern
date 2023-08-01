const express = require('express')
const router = express.Router()
const {
  getAllNews,
  toggleLike,
  addComment
} = require('../controllers/newsController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllNews)
router.route('/like/:id').put(protect, toggleLike)
router.route('/comment/:id').post(protect, addComment)


module.exports = router