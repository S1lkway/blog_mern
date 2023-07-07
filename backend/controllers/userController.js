const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//TODO @desc Register user  */
//TODO @route POST /api/users
//TODO @access Puplic
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check User
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//TODO @desc Authenticate(login) user
//TODO @route POST /api/users/login
//TODO @access Puplic
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body// Check for user mail
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,


    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//TODO @desc Edit user data
//TODO @route PUT /api/users/edit
//TODO @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Get user id from token after login
  const userId = req.user._id;

  // Get user data from DB
  const user = await User.findById(userId);

  if (user) {
    // Put new data in user object
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      //Generate hashed password for DB
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save new user data in DB
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


//TODO @desc Get user data 
//TODO @route GET /api/users/me
//TODO @access Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


//TODO Generate token 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
}