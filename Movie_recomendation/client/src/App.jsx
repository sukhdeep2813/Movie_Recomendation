// src/App.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import Routes, Route, and useNavigate
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail"; // MovieDetail is now a standalone route

// Import our new page components
import HomePage from "./pages/HomePage";
import GenresPage from "./pages/GenresPage";
import MyListPage from "./pages/MyListPage";
import AboutPage from "./pages/AboutPage";

// We no longer manage movie/genre/search state directly in App.jsx
// This state is now managed within HomePage.jsx
// We also remove mockMovies, mockGenres imports from here, as HomePage handles it.

function App() {
  // useNavigate hook is needed if we want to programmatically navigate
  // e.g., the "Back to movies" button in MovieDetail
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar /> {/* Navbar always visible */}
      <main className="w-full max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg flex-grow mb-8">
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />

          {/* Movie Detail Route - :id is a URL parameter */}
          <Route path="/movie/:id" element={<MovieDetail />} />

          {/* Other Navigation Routes */}
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/mylist" element={<MyListPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Optional: Fallback for unmatched routes */}
          <Route
            path="*"
            element={
              <div className="text-center text-3xl text-red-500 py-20">
                404: Page Not Found
              </div>
            }
          />
        </Routes>
      </main>
      <Footer /> {/* Footer always visible */}
    </div>
  );
}

export default App;
