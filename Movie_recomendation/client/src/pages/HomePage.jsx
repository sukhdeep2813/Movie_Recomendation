import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

    let currentSelectedGenreId = null;
    let currentSearchQuery = "";

    if (genreIdFromUrl) {
      const id = parseInt(genreIdFromUrl);
      if (!isNaN(id)) {
        currentSelectedGenreId = id;
      }
    } else if (searchFromUrl) {
      currentSearchQuery = searchFromUrl;
    }

    setSelectedGenreId(currentSelectedGenreId);
    setSearchQuery(currentSearchQuery);

    const fetchMoviesBasedOnUrlParams = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedData;
        if (currentSearchQuery.trim()) {
          fetchedData = await searchMovies(currentSearchQuery);
        } else if (currentSelectedGenreId !== null) {
          fetchedData = await fetchMoviesByGenre(currentSelectedGenreId);
        } else {
          fetchedData = await fetchPopularMovies();
        }
        setMovies(fetchedData);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesBasedOnUrlParams();
  }, [location.search]);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/");
    }
  };

  const handleSelectGenre = (genreId) => {
    if (genreId !== null) {
      navigate(`/?genre=${genreId}`);
    } else {
      navigate("/");
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
      <div className="text-center text-red-500 text-xl mt-10 min-h-screen flex items-center justify-center bg-gray-950">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-950">
      <h1 className="text-5xl font-extrabold  mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 animate-pulse">
        MoviePulse
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-2xl mx-auto">
        Discover your next favorite films and explore tailored recommendations.
      </p>
      <div className="w-full max-w-2xl px-4 mb-8">
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
      </div>
      <div className="w-full max-w-full px-4 mb-8">
        {" "}
        {/* Full width for genres */}
        <GenreFilter
          genres={genres}
          selectedGenreId={selectedGenreId}
          onSelectGenre={handleSelectGenre}
        />
      </div>
      <h2 className="text-4xl font-bold  mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 ">
        {currentTitle}
      </h2>
      {loading ? (
        <div className="text-center text-blue-400 text-2xl mt-10">
          Loading movies...
        </div>
      ) : (
        <MovieList movies={filteredMovies} />
      )}
    </div>
  );
}

export default HomePage;
