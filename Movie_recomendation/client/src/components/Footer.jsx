import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-6 text-center text-gray-400 text-sm mt-auto w-full">
      <div className="max-w-5xl mx-auto">
        <p>&copy; {currentYear} CineGuide. All rights reserved.</p>
        <p className="mt-2">
          Built with React, Vite, and Tailwind CSS. Data provided by
          placeholder
        </p>

        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
