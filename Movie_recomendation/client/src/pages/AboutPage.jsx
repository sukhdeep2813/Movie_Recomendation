import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaFilm, FaHeart } from "react-icons/fa";

function AboutPage() {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // This useEffect is for any component-level side effects.
    // For now, it's fine as-is or you can remove it if not needed.
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8 ">
      <div className="text-center animate-fade-in-up">
        <h2 className="text-5xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          About MoviePulse
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
          Your AI-powered companion for discovering new films and exploring
          cinematic universes.
        </p>
      </div>

      <div className="w-full max-w-4xl text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-10 animate-fade-in">
          <div
            className="group relative bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700
                        transform transition-all duration-300 ease-in-out
                        hover:scale-105 hover:bg-gray-700 hover:shadow-2xl"
          >
            <FaRobot
              className="h-12 w-12 text-blue-400 mx-auto mb-4
                         transform transition-transform duration-300 ease-in-out
                         group-hover:scale-110 group-hover:rotate-6"
            />
            <h3 className="text-2xl font-bold mb-2">Smart Recommendations</h3>
            <p className="text-gray-400">
              Our chatbot uses advanced LLMs to provide personalized movie
              suggestions just for you.
            </p>

            <div
              className="absolute inset-0 rounded-xl pointer-events-none 
                            transform transition-all duration-300 ease-in-out
                            group-hover:ring-4 group-hover:ring-blue-500 group-hover:ring-offset-2 group-hover:ring-offset-gray-900"
            ></div>
          </div>

          <div
            className="group relative bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700
                        transform transition-all duration-300 ease-in-out
                        hover:scale-105 hover:bg-gray-700 hover:shadow-2xl"
          >
            <FaFilm
              className="h-12 w-12 text-green-400 mx-auto mb-4
                         transform transition-transform duration-300 ease-in-out
                         group-hover:scale-110 group-hover:-rotate-6"
            />
            <h3 className="text-2xl font-bold mb-2">Explore Genres</h3>
            <p className="text-gray-400">
              Browse and filter through a vast library of films by genre,
              popularity, and more.
            </p>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none 
                            transform transition-all duration-300 ease-in-out
                            group-hover:ring-4 group-hover:ring-green-500 group-hover:ring-offset-2 group-hover:ring-offset-gray-900"
            ></div>
          </div>

          <div
            className="group relative bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700
                        transform transition-all duration-300 ease-in-out
                        hover:scale-105 hover:bg-gray-700 hover:shadow-2xl"
          >
            <FaHeart
              className="h-12 w-12 text-red-400 mx-auto mb-4
                         transform transition-transform duration-300 ease-in-out
                         group-hover:scale-110 group-hover:animate-heartbeat"
            />
            <h3 className="text-2xl font-bold mb-2">Create Your List</h3>
            <p className="text-gray-400">
              Save your favorite movies to your personal watchlist to find them
              easily later.
            </p>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none 
                            transform transition-all duration-300 ease-in-out
                            group-hover:ring-4 group-hover:ring-red-500 group-hover:ring-offset-2 group-hover:ring-offset-gray-900"
            ></div>
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
          >
            {showDetails ? "Hide More Details" : "Learn About Our Tech"}
          </button>

          {showDetails && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-xl animate-fade-in-down">
              <h3 className="text-3xl font-bold mb-4">Our Technology Stack</h3>
              <ul className="text-left text-gray-300 space-y-3">
                <li className="flex items-center space-x-3">
                  <span className="text-blue-400 font-semibold">Frontend:</span>
                  <span>Built with React for a dynamic user interface.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400 font-semibold">Styling:</span>
                  <span>
                    Tailwind CSS for a utility-first and responsive design.
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-red-400 font-semibold">Backend:</span>
                  <span>
                    A Node.js/Express API to handle requests and data.
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-yellow-400 font-semibold">
                    Database:
                  </span>
                  <span>MongoDB for flexible and scalable data storage.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-purple-400 font-semibold">
                    AI Model:
                  </span>
                  <span>
                    Utilizes a locally hosted LLM (like Llama 3 via Ollama) for
                    smart recommendations.
                  </span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors duration-300"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
