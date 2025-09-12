// src/pages/AcademicCalendar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { calendar } from '../data';

export default function AcademicCalendar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      
      {/* Navbar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-400/20 to-red-400/20 dark:from-purple-900/20 dark:to-red-900/20 shadow-lt rounded-md">
        <h1 className="text-xl font-bold text-black dark:text-white">Academic Calendar</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-white text-purple-700 dark:bg-black dark:text-purple-300 border border-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900 transition"
        >
          {darkMode ? '☀ Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Content */}
      <div className="mt-10 px-10 md:px-10 p-2 m-6">
        <div className="grid grid-cols-0 md:grid-cols-0 gap-4">
          {calendar.map(item => (
            <Link
              key={item.id}
              to={`/examschedule/${item.id}`}
              className="w-full bg-black/10 dark:bg-white/10 rounded-xl p-6 text-lg font-medium hover:font-bold hover:scale-110 hover:rounded-full hover:bg-gradient-to-r from-purple-600/20 to-red-600/20 dark:hover:bg-gradient-to-r from-purple-900/20 to-red-900/20 transition-all"
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
