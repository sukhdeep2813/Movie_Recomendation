// src/components/MovieDetail.jsx
import React, { useMemo } from "react"; // Import useMemo
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { mockMovies, mockGenres } from "../data/MovieData"; // Import mockMovies

function MovieDetail() {
  // No props needed anymore
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const navigate = useNavigate(); // Get the navigate function

  // Use useMemo to find the movie based on the URL ID
  const movie = useMemo(() => {
    return mockMovies.find((m) => m.id === parseInt(id)); // Convert id to integer for comparison
  }, [id]); // Re-find movie if URL ID changes

  if (!movie) {
    return (
      <div className="text-center text-gray-400 text-2xl mt-10">
        Movie not found.
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const formattedRating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const movieGenres = movie.genre_ids
    .map((genreId) => mockGenres.find((g) => g.id === genreId)?.name)
    .filter(Boolean);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
    // Or navigate('/'); to always go to the homepage
  };

  return (
    <div className="bg-gray-700 rounded-lg shadow-xl p-6 flex flex-col md:flex-row gap-6 items-start">
      <div className="md:w-1/3 flex-shrink-0">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-2/3 flex flex-col">
        <h2 className="text-4xl font-bold text-white mb-2">
          {movie.title} ({releaseYear})
        </h2>
        <div className="flex items-center text-lg text-gray-300 mb-4">
          <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-bold mr-3">
            ⭐ {formattedRating}
          </span>
          {movieGenres.length > 0 && (
            <span className="text-gray-400">{movieGenres.join(", ")}</span>
          )}
        </div>
        <p className="text-gray-300 leading-relaxed mb-6">{movie.overview}</p>

        {/* Placeholder for more details */}
        <div className="text-gray-400 text-sm mt-auto border-t border-gray-600 pt-4">
          <p>Director: Christopher Nolan (Example)</p>
          <p>Main Cast: Cillian Murphy, Emily Blunt, Matt Damon (Example)</p>
          <p>Runtime: 180 min (Example)</p>
        </div>

        <button
          onClick={handleBack}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 transition duration-300 ease-in-out self-end"
        >
          ← Back to Movies
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;
