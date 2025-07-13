import React from "react";
import MovieCard from "./MovieCard";
import backgroundImage from "../assets/logo.png";

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-400 text-2xl mt-10">
        No movies found. Try a different search or filter!
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-5xl mx-auto p-6 rounded-lg shadow-lg mb-8 overflow-hidden" // Added overflow-hidden to contain shadow with border-radius
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents image from repeating
        backgroundAttachment: "fixed", // Keeps background fixed during scroll (optional, remove if you want it to scroll with content)
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4 mt-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
