const express = require('express');
const userController = require('../controllers/auth.controller');

const authRoutes = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRoutes.post('/register', userController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user  with email and password
 * @access Public    
 */
authRoutes.post('/login', userController.loginUser);


module.exports = authRoutes;