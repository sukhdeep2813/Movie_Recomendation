const axios = require("axios"); // We'll use axios to communicate with Ollama's local API
require("dotenv").config();

const OLLAMA_API_URL =
  process.env.OLLAMA_API_URL || "http://localhost:11434/api/chat";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

exports.getMovieRecommendation = async (req, res) => {
  const { message, conversationHistory } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const systemPrompt = {
    role: "system",
    content: `You are a friendly and helpful AI movie recommender. Your goal is to suggest movies to the user based on their prompts.
                  Be creative, suggest a variety of genres, and provide brief reasons for your recommendations.
                  If the user asks for something unrelated to movies, gently steer them back to movie recommendations.
                  Always respond in a conversational and positive tone.
                  When suggesting movies, try to include their release year and genre if possible.
                  Do not recommend explicit or highly offensive content.
                  If the user provides specific preferences (e.g., genre, actor, mood), try to incorporate them.`,
  };

  try {
    const messages = [
      systemPrompt,
      ...conversationHistory.map((entry) => ({
        role: entry.type === "user" ? "user" : "assistant",
        content: entry.text,
      })),
      { role: "user", content: message },
    ];

    const response = await axios.post(OLLAMA_API_URL, {
      model: OLLAMA_MODEL,
      messages: messages,
      stream: false,
    });

    const botResponse = response.data.message.content;
    res.json({ reply: botResponse });
  } catch (error) {
    console.error(
      "Error communicating with Ollama:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Error getting recommendation from chatbot.",
      error: error.response?.data || error.message,
    });
  }
};
