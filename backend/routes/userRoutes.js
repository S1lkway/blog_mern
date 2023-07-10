const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUser,
  editUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
router.put('/edit', protect, editUser)

module.exports = router