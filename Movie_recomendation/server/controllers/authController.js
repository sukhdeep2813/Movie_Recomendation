const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ user: { id } }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ username, email, password });

    await user.save();

    // Sign JWT token
    const token = generateToken(user.id);
    res.json({ token, message: "Registration successful!" });
  } catch (err) {
    console.error(err.message);

    if (err.code === 11000) {
      return res.status(400).json({ msg: "Username or email already taken." });
    }
    res.status(500).send("Server error during registration");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Sign JWT token
    const token = generateToken(user.id);
    res.json({ token, message: "Login successful!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error during login");
  }
};
