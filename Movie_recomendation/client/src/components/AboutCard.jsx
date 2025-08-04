import React from "react";
import { FaRobot, FaFilm, FaHeart } from "react-icons/fa";

const iconMap = {
  robot: FaRobot,
  film: FaFilm,
  heart: FaHeart,
};

function AboutCard({ icon, title, description }) {
  const IconComponent = iconMap[icon];

  return (
    <div
      className="group relative bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800
                 transform transition-all duration-300 ease-in-out
                 hover:scale-105 hover:bg-gray-800"
    >
      <span
        className="absolute inset-[-1000%] animate-[border-beam_5s_infinite] rounded-full 
                       bg-[radial-gradient(40rem_at_center,_white,_transparent)] 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></span>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {IconComponent && (
          <IconComponent
            className="h-12 w-12 text-blue-400 mx-auto mb-4
                     transform transition-transform duration-300 ease-in-out
                     group-hover:scale-110"
          />
        )}
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-center">{description}</p>
      </div>
    </div>
  );
}

export default AboutCard;
