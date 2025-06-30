import React, { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContextObject";
import MovieCard from "../components/MovieCard";

function MyListPage() {
  const {
    watchlistMovies,
    loadingWatchlist,
    watchlistError,
    removeMovieFromWatchlist,
  } = useContext(WatchlistContext);

  if (loadingWatchlist) {
    return (
      <div className="text-center text-blue-400 text-2xl mt-10">
        Loading your watchlist...
      </div>
    );
  }

  if (watchlistError) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        {watchlistError}
      </div>
    );
  }

  return (
    <div className="text-center p-6">
      <h2 className="text-4xl font-bold text-white mb-6">My Watchlist</h2>
      {watchlistMovies.length === 0 ? (
        <p className="text-lg text-gray-400">
          Your watchlist is empty. Add some movies from the Home page or Movie
          details!
        </p>
      ) : (
        <>
          <p className="text-lg text-gray-400 mb-8">
            Here are the movies you've added to your watchlist.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
            {watchlistMovies.map((movie) => (
              <div key={movie.id} className="relative">
                <MovieCard movie={movie} />{" "}
                <button
                  onClick={() => removeMovieFromWatchlist(movie.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                  aria-label="Remove from watchlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z"
                      clipRule="evenodd"
                    />
                  </svg>
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
