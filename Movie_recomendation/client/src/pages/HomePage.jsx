import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import MovieList from "../components/MovieList";

import { fetchPopularMovies, searchMovies, fetchGenres } from "../api/tmbd";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  //fetching popular movies and genres
  useEffect(() => {
    const getInitiallData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedMovies = await fetchPopularMovies();
        setMovies(fetchedMovies);

        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        setError("Failed to fetch initial data. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getInitiallData();
  }, []);

  const filteredMovies = useMemo(() => {
    let currentMovies = movies;

    if (searchQuery) {
      currentMovies = currentMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenreId !== null) {
      currentMovies = currentMovies.filter(
        (movie) => movie.genre_ids && movie.genre_ids.includes(selectedGenreId)
      );
    }

    return currentMovies;
  }, [movies, searchQuery, selectedGenreId]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSelectedGenreId(null);

    setLoading(true);
    setError(null);
    try {
      const searchedMovies = await searchMovies(query);
      setMovies(searchedMovies);
    } catch (err) {
      setError("Failed to search movies. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGenre = (genreId) => {
    setSelectedGenreId(genreId);
    setSearchQuery("");

    console.log("Filtering by genre ID:", genreId);
  };

  const handleMovieClick = (movieId) => {
    console.log("Clicked movie with ID:", movieId);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-2">Movie Recommender</h1>
      <p className="text-lg text-gray-400 mb-8">
        Discover your next favorite films.
      </p>

      <SearchBar onSearch={handleSearch} />
      <GenreFilter
        genres={genres}
        selectedGenreId={selectedGenreId}
        onSelectGenre={handleSelectGenre}
      />
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        {selectedGenreId
          ? genres.find((g) => g.id === selectedGenreId)?.name + " Movies"
          : searchQuery
          ? `Results for "${searchQuery}"`
          : "Popular Movies"}{" "}
      </h2>
      {loading ? (
        <div className="text-center text-blue-400 text-xl mt-10">
          Loading movies...
        </div>
      ) : (
        <MovieList movies={filteredMovies} onMovieClick={handleMovieClick} />
      )}
    </div>
  );
}

export default HomePage;
