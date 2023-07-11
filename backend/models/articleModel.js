const mongoose = require('mongoose')

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