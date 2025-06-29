import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, IMAGE_BASE_URL } from "../api/tmbd";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMovieDetails(id);
        setMovieDetails(data);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-blue-400 text-2xl mt-10">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">{error}</div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="text-center text-gray-400 text-2xl mt-10">
        Movie not found.
      </div>
    );
  }

  const posterUrl = movieDetails.poster_path
    ? `${IMAGE_BASE_URL}w500${movieDetails.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const formattedRating = movieDetails.vote_average
    ? movieDetails.vote_average.toFixed(1)
    : "N/A";
  const releaseYear = movieDetails.release_date
    ? movieDetails.release_date.substring(0, 4)
    : "N/A";

  const movieGenres = movieDetails.genres
    ? movieDetails.genres.map((g) => g.name).join(", ")
    : "N/A";

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-700 rounded-lg shadow-xl p-6 flex flex-col md:flex-row gap-6 items-start">
      <div className="md:w-1/3 flex-shrink-0">
        <img
          src={posterUrl}
          alt={movieDetails.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-2/3 flex flex-col">
        <h2 className="text-4xl font-bold text-white mb-2">
          {movieDetails.title} ({releaseYear})
        </h2>
        <div className="flex items-center text-lg text-gray-300 mb-4">
          <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-bold mr-3">
            ⭐ {formattedRating}
          </span>
          {movieGenres !== "N/A" && (
            <span className="text-gray-400">{movieGenres}</span>
          )}
        </div>
        <p className="text-gray-300 leading-relaxed mb-6">
          {movieDetails.overview || "No overview available."}{" "}
        </p>

        <div className="text-gray-400 text-sm mt-auto border-t border-gray-600 pt-4">
          <p>Tagline: {movieDetails.tagline || "N/A"}</p>{" "}
          <p>Status: {movieDetails.status || "N/A"}</p>{" "}
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
