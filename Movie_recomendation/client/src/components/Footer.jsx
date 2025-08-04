import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"; // You might need to install react-icons

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 p-6 text-center text-gray-400 text-sm w-full border-t-2 border-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="md:text-left">
          <p className="text-white font-semibold">
            &copy; {currentYear} MoviePulse. All rights reserved.
          </p>
          <p className="text-gray-500 mt-1">
            Built with React, Vite, and Tailwind CSS.
          </p>
        </div>

        <div className="flex justify-center md:justify-end space-x-6">
          <a
            href="https://github.com/sukhdeep2813"
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:text-blue-400 transition-colors duration-200"
            title="GitHub"
          >
            <FaGithub className="h-6 w-6 transform transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:text-blue-400 transition-colors duration-200"
            title="Twitter"
          >
            <FaTwitter className="h-6 w-6 transform transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
          <a
            href="https://www.linkedin.com/in/sukhdeep-1599b2256/"
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:text-blue-400 transition-colors duration-200"
            title="LinkedIn"
          >
            <FaLinkedin className="h-6 w-6 transform transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
