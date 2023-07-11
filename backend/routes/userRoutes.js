const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  editUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/edit', protect, editUser)

module.exports = router