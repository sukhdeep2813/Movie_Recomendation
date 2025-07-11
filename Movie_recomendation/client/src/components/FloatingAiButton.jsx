import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function FloatingAiButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/register");
    } else {
      navigate("/chatbot");
    }
  };

  const token = localStorage.getItem("userToken");
  if (token) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
      onClick={handleClick}
      title="Wanna talk with me or movie?"
    >
      <FaRobot className="w-8 h-8" />
      <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Wanna talk with me or movie?
      </p>
    </div>
  );
}

export default FloatingAiButton;
