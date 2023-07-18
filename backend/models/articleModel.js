const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const articleSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please add a name of article']
  },
  text: {
    type: String,
    required: [true, 'Please add a text value']
  },
  images: {
    type: [imageSchema],
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Article', articleSchema)