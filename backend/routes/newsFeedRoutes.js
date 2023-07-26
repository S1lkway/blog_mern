const express = require('express')
const router = express.Router()
const {
  getAllNews
} = require('../controllers/newsFeedController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllNews)


module.exports = router