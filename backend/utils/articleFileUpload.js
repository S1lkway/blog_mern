const multer = require('multer')
///Generator of unique id
const { v4: uuidv4 } = require('uuid')
const path = require('path');

//* MAKE STORAGE FOR FILES IN MERN PROJECT
const storage = multer.diskStorage({
  ///Destination of uploading files
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  ///Make filename with unique id, date of uploading and extension
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  }
})
///Filter for file`s extensions
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else (
    cb(null, false)
  )
}

const upload = multer({ storage, fileFilter })

module.exports = upload