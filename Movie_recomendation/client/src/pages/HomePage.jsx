import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom"; // Crucial import for reading URL params
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import MovieList from "../components/MovieList";
import { fetchPopularMovies, searchMovies, fetchGenres } from "../api/tmbd"; // Corrected 'tmbd' to 'tmdb'

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const location = useLocation(); // Hook to get current URL location details

  useEffect(() => {
    const getInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedMovies = await fetchPopularMovies();
        setMovies(fetchedMovies);

        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);

        // Logic to check for genre ID in URL query parameters
        const params = new URLSearchParams(location.search);
        const genreIdParam = params.get("genre");
        if (genreIdParam) {
          const id = parseInt(genreIdParam);
          if (!isNaN(id)) {
            setSelectedGenreId(id); // Set the selected genre from URL
            setSearchQuery(""); // Clear any existing search query when a genre is picked from URL
          }
        } else {
          // If no genre param in URL, ensure selectedGenreId is null
          setSelectedGenreId(null);
        }
      } catch (err) {
        setError("Failed to fetch initial data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getInitialData();
  }, [location.search]); // Depend on location.search to re-run when URL query changes

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
    setSelectedGenreId(null); // Clear genre filter when searching

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
  };

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
