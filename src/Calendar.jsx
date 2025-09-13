// src/pages/AcademicCalendar.jsx
import React, { useState, useEffect, useRef } from 'react';  // <-- import useRef
import { Link } from 'react-router-dom';
import { calendar } from '../data';

export default function AcademicCalendar() {
  //const [darkMode, setDarkMode] = useState(false);

  const inputRef = useRef(null);
   const [darkMode, setDarkMode] = useState(false); 
  // THEME TOGGLE
  useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      
      {/* Navbar with breadcrumb */}
      <div className="sticky top-0 z-50 backdrop-blur-xl px-6 py-4 bg-gradient-to-r from-purple-400/20 to-red-400/20 dark:from-purple-900/20 dark:to-red-900/20 shadow-lt rounded-md flex flex-wrap items-center justify-between">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-base md:text-lg font-medium">
          {/* VHome Link */}
          <Link
            to="/"
            className="text-lg font-bold text-purple-700 dark:text-purple-200 transition-all transform hover:scale-105 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-400 to-red-400"
            style={{ textShadow: 'none' }}
            onMouseEnter={e => {
              e.target.style.textShadow = '0 0 60px #c084fc, 0 0 12px #f87171';
            }}
            onMouseLeave={e => {
              e.target.style.textShadow = 'none';
            }}
          >
            VHome
          </Link>

          <span className="text-gray-400"> &gt; </span>

          {/* Static Academic Calendar Text */}
          <span className="text-lg font-bold text-black dark:text-white">
            Academic Calendar
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 px-10 md:px-10 p-2 m-6">
        <div className="grid grid-cols-0 md:grid-cols-0 gap-8">
          {calendar.map(item => (
            <Link
              key={item.id}
              to={`/calendar/${item.id}`}
              className="w-full bg-black/10 dark:bg-white/10 rounded-xl p-6 text-lg font-medium hover:font-bold hover:scale-105 hover:rounded-full hover:bg-gradient-to-r from-purple-500/20 to-red-500/20 dark:hover:bg-gradient-to-r from-purple-900/60 to-red-900/30 transition-all hover:shadow-[0_0_40px_#c084ff,0_0_40px_#aa0000]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-gray-400 py-8">
        © All rights reserved · vhome.co.in
      </div>
    </div>
  );
}
