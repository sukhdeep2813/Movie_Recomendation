require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const MONGO_URI = process.env.MONGO_URI;

// Middleware
//  Core   --  client-server communication

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected sucessfully"))
  .catch((err) => {
    console.error("MongoDB  connected", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Movie Recommender Backend API is running!");
});

//Importing and using Routes
const autoRoutes = require("./routes/auth");
const watchlistRoutes = require("./routes/watchlist");
//const recommendationRoutes = require("./routes/recommendations");

app.use("/api/auth", autoRoutes);
app.use("/api/watchlist", watchlistRoutes);
//app.use("/api/recommendations", recommendationRoutes);

// server to start
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Client URL expected: ${CLIENT_URL}`);
});
