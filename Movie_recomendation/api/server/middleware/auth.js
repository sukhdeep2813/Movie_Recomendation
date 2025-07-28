const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

module.exports = async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.header("x-auth-token")) {
    token = req.header("x-auth-token");
  }

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.user.id).select("-password");

    if (!req.user) {
      console.error("Authentication error: User not found for valid token.");
      return res
        .status(401)
        .json({ msg: "User not found, authorization denied" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Token is invalid" });
    }

    res.status(401).json({ msg: "Token is not valid" });
  }
};
