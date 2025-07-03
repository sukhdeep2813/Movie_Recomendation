module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken.user;
  } catch (error) {
    res.status(401).json({ msg: "Token is not Valid" });
  }
};
