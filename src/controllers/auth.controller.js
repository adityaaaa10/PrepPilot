const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
* @name registerUser
* @description Register a new user 
* @access Public
 */

async function registerUser(req, res){
    const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const isUsernameTaken = await userModel.findOne({ 
    $or: [{ username }, { email }]
   });

   if (isUsernameTaken) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save(); 

  const token = jwt.sign({ id: newUser._id, 
    username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  res.cookie('token', token)
  res.status(201).json({ message: 'User registered successfully', 
    user: 
    { id: newUser._id, 
      username : newUser.username, 
      email : newUser.email }, token
   });
}



/**
* @name loginUser
* @description Login a user 
* @access Public
 */

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token);
  res.status(200).json({ message: 'User logged in successfully', user: { id: user._id, username: user.username, email: user.email }, token });
}

module.exports = {
  registerUser,
  loginUser
};