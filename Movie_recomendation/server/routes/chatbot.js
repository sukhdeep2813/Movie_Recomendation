const express = require("express");
const router = express.Router();
const chatbotControllers = require("../controllers/chatbotController");
const auth = require("../middleware/auth");

router.post("/message", auth, chatbotControllers.getMovieRecommendation);

module.exports = router;
