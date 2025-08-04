import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, IMAGE_BASE_URL } from "../api/tmdb";
import { WatchlistContext } from "../context/WatchlistContextObject";
import { FaHeart, FaStar, FaArrowLeft } from "react-icons/fa";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMovieToWatchlist, removeMovieFromWatchlist, isMovieInWatchlist } =
    useContext(WatchlistContext);

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const inWatchlist = movieDetails
    ? isMovieInWatchlist(movieDetails.id)
    : false;

  const handleBack = () => {
    navigate(-1);
  };

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeMovieFromWatchlist(movieDetails.id);
    } else {
      addMovieToWatchlist(movieDetails.id);
      setShowConfirmation(true);

      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center">
        <div className="text-blue-400 text-3xl animate-pulse">
          Loading movie details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center">
        <div className="text-red-500 text-3xl">{error}</div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center">
        <div className="text-gray-400 text-3xl">Movie not found.</div>
      </div>
    );
  }

  const posterUrl = movieDetails.poster_path
    ? `${IMAGE_BASE_URL}w500${movieDetails.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const backdropUrl = movieDetails.backdrop_path
    ? `${IMAGE_BASE_URL}original${movieDetails.backdrop_path}`
    : null;

  const formattedRating = movieDetails.vote_average
    ? movieDetails.vote_average.toFixed(1)
    : "N/A";
  const releaseYear = movieDetails.release_date
    ? movieDetails.release_date.substring(0, 4)
    : "N/A";

  const movieGenres = movieDetails.genres
    ? movieDetails.genres.map((g) => g.name).join(", ")
    : "N/A";

  return (
    <div className="relative min-h-screen">
      {backdropUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
      )}

      <div className="relative z-10 container mx-auto p-8 md:p-12 lg:p-16 text-white flex flex-col md:flex-row gap-8 lg:gap-12 items-start animate-fade-in-up">
        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
          <img
            src={posterUrl}
            alt={movieDetails.title}
            className="w-full h-auto rounded-xl shadow-2xl border-4 border-gray-800 transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="md:w-2/3 lg:w-3/4 flex flex-col">
          <h2 className="text-4xl lg:text-5xl font-bold mb-2">
            {movieDetails.title}
          </h2>
          <p className="text-xl text-gray-400 mb-4">({releaseYear})</p>

          <div className="flex flex-wrap items-center gap-4 text-lg mb-6">
            <span className="bg-green-600 text-gray-900 px-3 py-1 rounded-lg font-bold">
              <FaStar className="inline-block mr-1 text-yellow-300" />
              {formattedRating}
            </span>
            {movieGenres !== "N/A" && (
              <span className="text-gray-300">{movieGenres}</span>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            {movieDetails.overview || "No overview available."}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 ease-in-out
                ${
                  inWatchlist
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              <FaHeart className="inline-block mr-2" />
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>

            <button
              onClick={handleBack}
              className="flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 transform hover:scale-105"
            >
              <FaArrowLeft className="inline-block mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 bg-green-600 text-white rounded-lg shadow-xl animate-fade-in-down">
          Movie added to your watchlist!
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
