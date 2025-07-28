const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Watchlist = require("../models/Watchlist");

router.get("/", auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id }).sort({
      addedAt: -1,
    });
    res.json(watchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error fetching watchlist");
  }
});

router.post("/", auth, async (req, res) => {
  const { movieId, title, posterPath } = req.body;

  try {
    let watchlistEntry = await Watchlist.findOne({ user: req.use.id, movieId });
    if (watchlistEntry) {
      return res.status(400).json({ msg: "Movie already in watchlist" });
    }
    watchlistEntry = new Watchlist({
      user: req.user.id,
      movieId,
      title,
      posterPath,
    });

    await watchlistEntry.save();
    res.json(watchlistEntry);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error adding to watchlist");
  }
});

router.delete("/:movieId", auth, async (req, res) => {
  try {
    const result = await Watchlist.deleteOne({
      user: req.user.id,
      movieId: req.params.movieId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ msg: "Movie not found in watchlist or already in watchlist" });
    }
    res.json({ msg: "Movie removed from watchlist successfully" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error removing from watchlist");
  }
});

module.exports = router;
