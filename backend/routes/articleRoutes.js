const express = require('express')
const router = express.Router()
const {
  getArticles,
  createArticle,
  editArticle,
  deleteArticle,
} = require('../controllers/articleController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getArticles).post(protect, createArticle)
router.route('/:id').delete(protect, deleteArticle).put(protect, editArticle)

// router.get('/', protect, getArticles)
// router.post('/', protect, createArticle)
// router.put('/:id', protect, editArticle)
// router.delete('/:id', protect, deleteArticle)

module.exports = router