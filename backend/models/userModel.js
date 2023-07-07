const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      minlength: [5, 'Name needs to be 5 or more symbols']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      validate: {
        validator: function (value) {
          // Validation for email
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: 'Wrong email format'
      }
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)