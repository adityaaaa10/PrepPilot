const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
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