import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";

import HomePage from "./pages/HomePage";
import GenresPage from "./pages/GenresPage";
import MyListPage from "./pages/MyListPage";
import AboutPage from "./pages/AboutPage";

import { WatchlistProvider } from "./context/WatchlistContext";

function App() {
  return (
    <WatchlistProvider>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar />
        <main className="w-full max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg flex-grow mb-8">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/movie/:id" element={<MovieDetail />} />

            <Route path="/genres" element={<GenresPage />} />
            <Route path="/mylist" element={<MyListPage />} />
            <Route path="/about" element={<AboutPage />} />

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
        <Footer />
      </div>
    </WatchlistProvider>
  );
}

export default App;
