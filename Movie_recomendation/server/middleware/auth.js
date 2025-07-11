// server/middleware/auth.js
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
// If you plan to fetch the user from the DB and attach it to req.user,
// you'll also need your User model here:
// const User = require('../models/User');

// Load environment variables if this file is accessed directly or before index.js
// It's generally better to have dotenv.config() at the very top of index.js
// but including it here as a fallback can sometimes prevent issues.
// require('dotenv').config();

module.exports = function (req, res, next) {
  let token;

  // 1. Prioritize checking for 'Bearer' token in 'Authorization' header (standard)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract the token after 'Bearer '
  }
  // 2. Fallback to checking 'x-auth-token' header (if frontend sends it this way as well)
  else if (req.header("x-auth-token")) {
    token = req.header("x-auth-token");
  }

  // If no token found in either place, deny authorization
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token using your JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user payload to the request object
    // Assuming your JWT payload is like { user: { id: 'someUserId' } }
    req.user = decoded.user;

    // Optional: Fetch full user details from the database if needed for later middleware/routes
    // Make this middleware 'async' if you uncomment the line below
    // req.user = await User.findById(decoded.user.id).select('-password');

    // VERY IMPORTANT: Call next() to pass control to the next middleware or the route handler
    next();
  } catch (error) {
    // Log the actual error for debugging on the server
    console.error("Authentication error:", error.message);
    // Send a 401 response if the token is invalid or expired
    res.status(401).json({ msg: "Token is not valid" });
  }
};
