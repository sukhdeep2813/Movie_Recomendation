import React from "react";

function AboutPage() {
  return (
    <div className="text-center p-6 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-6">About CineGuide</h2>
      <p className="text-lg text-gray-300 leading-relaxed mb-4">
        CineGuide is your personal movie recommendation companion. We help you
        discover new films based on your preferences and what's popular.
      </p>
      <p className="text-gray-400 leading-relaxed">
        This application is built as a demonstration using React, Vite, and
        Tailwind CSS. All movie data is mock data for illustrative purposes.
      </p>
    </div>
  );
}

export default AboutPage;
