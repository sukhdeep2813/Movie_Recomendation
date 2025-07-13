import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import MovieList from "../components/MovieList";
import {
  fetchPopularMovies,
  searchMovies,
  fetchMoviesByGenre,
  fetchGenres,
} from "../api/tmdb";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genreIdFromUrl = params.get("genre");
    const searchFromUrl = params.get("query");

    let newSelectedGenreId = null;
    let newSearchQuery = "";

    if (genreIdFromUrl) {
      const id = parseInt(genreIdFromUrl);
      if (!isNaN(id)) {
        newSelectedGenreId = id;

        newSearchQuery = "";
      }
    } else if (searchFromUrl) {
      newSearchQuery = searchFromUrl;

      newSelectedGenreId = null;
    } else {
      newSelectedGenreId = null;
      newSearchQuery = "";
    }

    setSelectedGenreId((prevId) =>
      prevId !== newSelectedGenreId ? newSelectedGenreId : prevId
    );
    setSearchQuery((prevQuery) =>
      prevQuery !== newSearchQuery ? newSearchQuery : prevQuery
    );

    const fetchMoviesBasedOnState = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedData;
        if (newSearchQuery.trim()) {
          fetchedData = await searchMovies(newSearchQuery);
        } else if (newSelectedGenreId !== null) {
          fetchedData = await fetchMoviesByGenre(newSelectedGenreId);
        } else {
          fetchedData = await fetchPopularMovies();
        }
        setMovies(fetchedData);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesBasedOnState();
  }, [location.search]);

  const handleSearch = async (query) => {
    if (query.trim()) {
      window.history.pushState(
        {},
        "",
        `/?query=${encodeURIComponent(query.trim())}`
      );
    } else {
      window.history.pushState({}, "", "/");
    }

    setSearchQuery(query);
    setSelectedGenreId(null);
  };

  const handleSelectGenre = (genreId) => {
    if (genreId !== null) {
      window.history.pushState({}, "", `/?genre=${genreId}`);
    } else {
      window.history.pushState({}, "", "/");

      setSelectedGenreId(genreId);
      setSearchQuery("");
    }
  };

  const filteredMovies = useMemo(() => {
    return movies;
  }, [movies]);

  const currentTitle = useMemo(() => {
    if (searchQuery) {
      return `Results for "${searchQuery}"`;
    }
    if (selectedGenreId !== null) {
      const genre = genres.find((g) => g.id === selectedGenreId);
      return genre ? `${genre.name} Movies` : "Filtered Movies";
    }
    return "Popular Movies";
  }, [searchQuery, selectedGenreId, genres]);

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      {" "}
      <h1 className="text-4xl font-bold text-white mb-2">Movie Recommender</h1>
      <p className="text-lg text-gray-400 mb-8">
        Discover your next favorite films.
      </p>
      <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />{" "}
      <GenreFilter
        genres={genres}
        selectedGenreId={selectedGenreId}
        onSelectGenre={handleSelectGenre}
      />
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        {currentTitle}
      </h2>
      {loading ? (
        <div className="text-center text-blue-400 text-xl mt-10">
          Loading movies...
        </div>
      ) : (
        <MovieList movies={filteredMovies} />
      )}
    </div>
  );
}

export default HomePage;
