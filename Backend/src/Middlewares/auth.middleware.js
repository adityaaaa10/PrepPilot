const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');


async function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  const isBlacklisted = await tokenBlacklistModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Access Denied. Token is invalid.' });
  }

try {

 const decoded = jwt.verify(token, process.env.JWT_SECRET);

 req.user = decoded; // Attach the decoded user information to the request object
  next(); // Proceed to the next middleware or route handler
}catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = { authenticateToken };