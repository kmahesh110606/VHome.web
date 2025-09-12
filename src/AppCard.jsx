import React from 'react';


const AppCard = ({ icon, title, description }) => {
  return (
    <div className="group relative w-32 h-32 sm:w-40 sm:h-40 bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      <img
        src={icon}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:blur-sm group-hover:scale-110 transition duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="text-white dark:text-gray-200 font-semibold text-sm px-2">{title}</div>
      </div>
    </div>
  );
};

export default AppCard;
