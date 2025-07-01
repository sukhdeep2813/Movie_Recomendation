import React, { useState, useEffect } from "react";
import { fetchMovieDetails } from "../api/tmdb";
import { WatchlistContext } from "./WatchlistContextObject";

export const WatchlistProvider = ({ children }) => {
  const [watchlistIds, setWatchlistIds] = useState(() => {
    try {
      const storedWatchlist = localStorage.getItem("movieWatchlist");
      return storedWatchlist ? JSON.parse(storedWatchlist) : [];
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage:", error);
      return [];
    }
  });

  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const [watchlistError, setWatchlistError] = useState(null);

  useEffect(() => {
    localStorage.setItem("movieWatchlist", JSON.stringify(watchlistIds));
  }, [watchlistIds]);

  useEffect(() => {
    const getWatchlistMovieDetails = async () => {
      setLoadingWatchlist(true);
      setWatchlistError(null);

      try {
        const moviePromises = watchlistIds.map((id) => fetchMovieDetails(id));
        const movies = await Promise.all(moviePromises);
        setWatchlistMovies(movies.filter(Boolean));
      } catch (err) {
        console.error("Error fetching watchlist movie details:", err);
        setWatchlistError("Failed to load some watchlist movies.");
      } finally {
        setLoadingWatchlist(false);
      }
    };
    if (watchlistIds.length > 0) {
      getWatchlistMovieDetails();
    } else {
      setWatchlistMovies([]);
      setLoadingWatchlist(false);
    }
  }, [watchlistIds]);

  const addMovieToWatchlist = (movieToAddId) => {
    if (!watchlistIds.includes(movieToAddId)) {
      setWatchlistIds((prevIds) => [...prevIds, movieToAddId]);
    }
  };

  const removeMovieFromWatchlist = (movieToRemoveId) => {
    setWatchlistIds((prevIds) =>
      prevIds.filter((id) => id !== movieToRemoveId)
    );
  };

  const isMovieInWatchlist = (movieId) => {
    return watchlistIds.includes(movieId);
  };

  const contextValue = {
    watchlistIds,
    watchlistMovies,
    loadingWatchlist,
    watchlistError,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    isMovieInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={contextValue}>
      {children}
    </WatchlistContext.Provider>
  );
};
