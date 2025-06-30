import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContextObject";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { addMovieToWatchlist, removeMovieFromWatchlist, isMovieInWatchlist } =
    useContext(WatchlistContext);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const formattedRating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const inWatchlist = isMovieInWatchlist(movie.id);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleWatchlistToggle = (e) => {
    e.stopPropagation(); 
    if (inWatchlist) {
      removeMovieFromWatchlist(movie.id);
    } else {
      addMovieToWatchlist(movie.id);
    }
  };

  return (
    <div
      className="bg-gray-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-auto object-cover"
        style={{ aspectRatio: "2/3" }}
      />
      <div className="p-4">
        <h3
          className="text-xl font-semibold mb-1 text-white truncate"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span className="bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full font-bold">
            ⭐ {formattedRating}
          </span>
          <span>{releaseYear}</span>
        </div>
      </div>
      <button
        onClick={handleWatchlistToggle}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          inWatchlist ? "bg-blue-600" : "bg-gray-600"
        } text-white hover:bg-opacity-80 transition-all duration-200`}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {inWatchlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default MovieCard;
