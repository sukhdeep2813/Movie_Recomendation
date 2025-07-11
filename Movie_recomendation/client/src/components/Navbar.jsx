import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <nav className="bg-gray-800 p-4 shadow-lg mb-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
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

          {isLoggedIn && (
            <Link
              to="/chatbot"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Chatbot
            </Link>
          )}
        </div>

        <div className="space-x-6 text-lg">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 bg-transparent border-none cursor-pointer text-lg p-0"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
