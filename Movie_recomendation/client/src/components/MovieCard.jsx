import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const formattedRating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
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
    </div>
  );
}

export default MovieCard;
