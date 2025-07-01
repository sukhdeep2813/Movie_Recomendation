import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../api/tmdb";

function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (err) {
        setError("Failed to fetch genres. Please try again.");
        console.error("Error fetching genres:", err);
      } finally {
        setLoading(false);
      }
    };
    getGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    navigate(`/?genre=${genreId}`);
  };

  if (loading) {
    return (
      <div className="text-center text-blue-400 text-2xl mt-10">
        Loading genres...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">{error}</div>
    );
  }

  return (
    <div className="text-center p-6">
      <h2 className="text-4xl font-bold text-white mb-6">Explore Genres</h2>
      <p className="text-lg text-gray-400 mb-8">
        Click on a genre to see related movies.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 transition duration-300 ease-in-out"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenresPage;
