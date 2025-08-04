import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { WatchlistContext } from "../context/WatchlistContextObject";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

function MyListPage() {
  const {
    watchlistMovies,
    loadingWatchlist,
    watchlistError,
    removeMovieFromWatchlist,
  } = useContext(WatchlistContext);

  if (loadingWatchlist) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center">
        <div className="text-blue-400 text-3xl animate-pulse">
          Loading your watchlist...
        </div>
      </div>
    );
  }

  if (watchlistError) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center">
        <div className="text-red-500 text-3xl">{watchlistError}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          My Watchlist
        </h2>
      </div>

      {watchlistMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-2xl text-gray-400 leading-relaxed mb-6">
            Your watchlist is empty. It's time to find some movies!
          </p>
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlusCircle className="inline-block mr-2" />
            Explore Movies
          </Link>
        </div>
      ) : (
        <>
          <p className="text-lg text-gray-400 mb-8 text-center max-w-2xl mx-auto">
            Here are the movies you've added to your watchlist.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
            {watchlistMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <button
                  onClick={() => removeMovieFromWatchlist(movie.id)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 ease-in-out
                             opacity-0 group-hover:opacity-100 transform group-hover:scale-110"
                  aria-label="Remove from watchlist"
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyListPage;
