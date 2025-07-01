const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

async function tmdbFetch(endpoint) {
  const connector = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${connector}api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    throw error;
  }
}

// popular movies
export const fetchPopularMovies = async () => {
  const data = await tmdbFetch("/movie/popular");
  return data.results;
};

//movies by query
export const searchMovies = async (query) => {
  if (!query) return [];
  const data = await tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
  return data.results;
};

// specific movie by ID
export const fetchMovieDetails = async (movieId) => {
  const data = await tmdbFetch(`/movie/${movieId}`);
  return data;
};

// movie genres
export const fetchGenres = async () => {
  const data = await tmdbFetch("/genre/movie/list");
  return data.genres;
};

export const getImageUrl = (path, size = "w500") => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `${IMAGE_BASE_URL}${size}${path}`;
};
