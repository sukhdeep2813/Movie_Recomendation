import React from "react";

function GenreFilter({ genres, selectedGenreId, onSelectGenre }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-700 rounded-lg shadow-md mb-8">
      <button
        onClick={() => onSelectGenre(null)} // Clear filter
        className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ease-in-out
          ${
            selectedGenreId === null
              ? "bg-blue-600 text-white"
              : "bg-gray-600 text-gray-300 hover:bg-gray-500"
          }`}
      >
        All Genres
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ease-in-out
            ${
              selectedGenreId === genre.id
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
