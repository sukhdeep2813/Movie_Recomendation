import React from "react";
import { mockGenres } from "../data/MovieData";
import { Link } from "react-router-dom";

function GenresPage() {
  return (
    <div className="text-center p-6">
      <h2 className="text-4xl font-bold text-white mb-6">Browse by Genre</h2>
      <p className="text-lg text-gray-400 mb-8">
        Explore movies categorized by their themes and styles.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {mockGenres.map((genre) => (
          <Link
            key={genre.id}
            to={`/?genre=${genre.id}`}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenresPage;
