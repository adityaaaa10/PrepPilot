const express = require('express');
const userController = require('../controllers/auth.controller');
const authRoutes = express.Router();
const { authenticateToken } = require('../Middlewares/auth.middleware');

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

/**
 * @name blacklistToken
 * @description clear the token from the cookie and add it to the blacklist
 * @access Public
 */
authRoutes.post('/logout', userController.blacklistToken);


/**
 * @route GET /api/auth/get-me
 * @desc get the current logged in user details
 * @access Public
 */
authRoutes.get('/get-me', authenticateToken, userController.getMe);

module.exports = authRoutes;