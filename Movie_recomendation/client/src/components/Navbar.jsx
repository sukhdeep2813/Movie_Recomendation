import React from "react";
import { Link } from "react-router-dom"; 

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg mb-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        <Link
          to="/"
          className="text-white text-3xl font-bold hover:text-blue-400 transition-colors duration-200"
        >
          CineGuide
        </Link>

        
        <div className="space-x-6 text-lg">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/genres"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            Genres
          </Link>
          <Link
            to="/mylist"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            My List
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
