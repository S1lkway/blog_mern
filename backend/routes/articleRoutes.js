const express = require('express')
const router = express.Router()
const upload = require('../utils/articleFileUpload'); // Импортируйте экземпляр Multer из файла upload.js
const {
  getArticles,
  createArticle,
  getArticle,
  editArticle,
  deleteArticle,
  deleteArticleImage,
} = require('../controllers/articleController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getArticles).post(protect, upload.array('images', 5), createArticle)
router.route('/:id').get(protect, getArticle).delete(protect, deleteArticle).put(protect, upload.array('images', 5), editArticle)
router.route('/:id/deleteimage/:imageId').delete(protect, deleteArticleImage)
// router.get('/', protect, getArticles)
// router.post('/', protect, createArticle)
// router.put('/:id', protect, editArticle)
// router.delete('/:id', protect, deleteArticle)

module.exports = router