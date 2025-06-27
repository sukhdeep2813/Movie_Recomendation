// src/pages/HomePage.jsx
import React, { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import MovieList from "../components/MovieList";
import { mockMovies, mockGenres } from "../data/MovieData";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const filteredMovies = useMemo(() => {
    let currentMovies = mockMovies;

    if (searchQuery) {
      currentMovies = currentMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenreId !== null) {
      currentMovies = currentMovies.filter((movie) =>
        movie.genre_ids.includes(selectedGenreId)
      );
    }

    return currentMovies;
  }, [searchQuery, selectedGenreId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenreId(null); // Clear genre filter when searching
    console.log("Searching for:", query);
  };

  const handleSelectGenre = (genreId) => {
    setSelectedGenreId(genreId);
    setSearchQuery(""); // Clear search query when selecting genre
    console.log("Filtering by genre ID:", genreId);
  };

  // In a real app, onMovieClick would use useNavigate to go to /movie/:id
  // For now, we'll keep it as a console log, but prepare for it later.
  const handleMovieClick = (movieId) => {
    console.log("Clicked movie with ID:", movieId);
    // This will be replaced by navigation logic soon!
  };

  return (
    <div className="flex flex-col items-center">
      {/* Main heading for the home page content */}
      <h1 className="text-4xl font-bold text-white mb-2">Movie Recommender</h1>
      <p className="text-lg text-gray-400 mb-8">
        Discover your next favorite films.
      </p>

      <SearchBar onSearch={handleSearch} />
      <GenreFilter
        genres={mockGenres}
        selectedGenreId={selectedGenreId}
        onSelectGenre={handleSelectGenre}
      />
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        {selectedGenreId
          ? mockGenres.find((g) => g.id === selectedGenreId)?.name + " Movies"
          : searchQuery
          ? `Results for "${searchQuery}"`
          : "All Movies"}
      </h2>
      <MovieList movies={filteredMovies} onMovieClick={handleMovieClick} />
    </div>
  );
}

export default HomePage;
