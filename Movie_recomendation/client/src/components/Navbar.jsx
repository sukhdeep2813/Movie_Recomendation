import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg mb-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo and App Name (Left/Center) */}
        <div className="flex items-center text-white text-3xl font-bold transition-colors duration-200">
          <Link to="/" className="flex items-center">
            <span>NeuroGuide</span>
            <img
              src={logo}
              alt="NeuroGuide Logo"
              className="h-10 w-auto ml-3 rounded-md"
            />
          </Link>
        </div>

        {/* Main Navigation Links (Center) */}
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

        {/* Auth Links (Right) - This is the key change */}
        <div className="space-x-6 text-lg">
          {/*
            Future Enhancement:
            You'd typically use a state variable here to conditionally render
            Login/Register OR Profile/Logout links based on user authentication status.
            For now, they are always visible.
          */}
          <Link
            to="/login"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
