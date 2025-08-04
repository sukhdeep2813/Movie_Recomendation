import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("userToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <>
      <Link to="/" className="nav-link" onClick={toggleMenu}>
        Home
      </Link>
      <Link to="/genres" className="nav-link" onClick={toggleMenu}>
        Genres
      </Link>
      <Link to="/mylist" className="nav-link" onClick={toggleMenu}>
        My List
      </Link>
      <Link to="/about" className="nav-link" onClick={toggleMenu}>
        About
      </Link>
      {isLoggedIn && (
        <Link to="/chatbot" className="nav-link" onClick={toggleMenu}>
          Chatbot
        </Link>
      )}
    </>
  );

  const authLinks = (
    <>
      {!isLoggedIn ? (
        <>
          <Link to="/login" className="nav-button bg-blue-600">
            Login
          </Link>
          <Link
            to="/register"
            className="nav-button bg-transparent border-blue-600 text-blue-400 hover:text-white"
          >
            Register
          </Link>
        </>
      ) : (
        <button onClick={handleLogout} className="nav-button bg-red-600">
          Logout
        </button>
      )}
    </>
  );

  return (
    <nav className="bg-gray-950 p-4 shadow-lg sticky top-0 z-50 mb-5">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-3 transform transition-transform duration-300 hover:scale-105"
        >
          <img src={logo} alt="MoviePulse Logo" className="h-10 w-auto" />
          <span className="text-white text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
            MoviePulse
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks}
          {authLinks}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-950 z-40 md:hidden flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {navLinks}
          <div className="flex flex-col space-y-4 w-48">{authLinks}</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
