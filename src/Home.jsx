import React, { useState, useEffect } from 'react';
import { apps } from '../data';
import './index.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
  // Check localStorage for theme preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    // Update localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');

    // Apply the theme class
    document.documentElement.classList.toggle('dark', newMode);
  };


  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">

      {/* Header / Navbar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-400/20 to-red-400/20 dark:from-purple-900/20 dark:to-red-900/20 shadow-lt rounded-md">
        <h1 className="text-xl font-bold text-black dark:text-white">VHome</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-white text-purple-700 dark:bg-black dark:text-purple-300 border border-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900 transition"
        >
          {darkMode ? '☀ Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Searchbar */}
      <div className="sticky top-20 z-40 w-full flex justify-center mt-8 px-4">
        <div className="w-full backdrop-blur-full max-w-3xl rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-lg shadow-md p-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search or ask AI for anything..."
            className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
          />
          <div className="flex space-x-2">
            <img src="/icons/google.png" alt="Google" className="w-5 h-5 cursor-pointer" />
            <img src="/icons/bing.png" alt="Bing" className="w-5 h-5 cursor-pointer" />
            <img src="/icons/chatgpt.png" alt="GPT" className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Dashboard: Quick Links & Spotlight */}
      <div className="mt-10 px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Quick Links */}
        <div className="rounded-xl p-6 bg-black/10 dark:bg-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-red-900 dark:bg-gradient-to-r from-purple-300 to-red-300 bg-clip-text text-transparent">
            Quick Links
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'VTOPcc', link: 'https://vtopcc.vit.ac.in/' },
              { name: 'Calendars', link: '/#/calendar' },
              { name: 'NPTEL Links', link: '/#/nptel' },
              { name: 'Exam Schedule', link: '/#/examschedule' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.link.startsWith('http') ? window.open(item.link) : window.location.href = item.link}
                className="w-full bg-black/10 dark:bg-white/10 rounded-xl p-6 text-lg font-medium hover:font-bold hover:scale-110 hover:rounded-full hover:bg-gradient-to-r from-purple-600/20 to-red-600/20 dark:hover:bg-gradient-to-r from-purple-900/20 to-red-900/20 transition-all"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight */}
        <div className="rounded-xl p-6 bg-black/10 dark:bg-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-red-900 dark:bg-gradient-to-r from-purple-300 to-red-300 bg-clip-text text-transparent">
            Spotlight
          </h2>
          <div className="space-y-2">
            {[
              'Hostel Room allotment details is now available on VTop > Hostels > Mess Selection 2025-2026.',
              'Mess selection is now available on VTop > Hostels > Mess Selection 2025-2026.'
            ].map((text, idx) => (
              <div
                key={idx}
                className="w-auto bg-black/10 dark:bg-white/10 rounded-xl p-6 text-lg font-medium hover:font-bold hover:scale-110 hover:rounded-full hover:bg-gradient-to-r from-purple-600/20 to-red-600/20 dark:hover:bg-gradient-to-r from-purple-900/20 to-red-900/20 transition-all"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Apps */}
      <div className="mt-12 px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {apps.map(({ id, name, description, url }) => (
            <div
              key={id}
              onClick={() => window.open(url)}
              className="relative w-48 h-48 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-lg bg-white/10 dark:bg-white/10 backdrop-blur-2xl cursor-pointer transition-transform transform hover:scale-110 hover:shadow-2xl group"
              style={{ backgroundImage: `url('/icons/${id}.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 group-hover:backdrop-blur-md group-hover:scale-110 transition duration-300" />
              <div className="absolute display-block inset-0 bg-white/30 dark:bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="space-y2">
                <div className="text-black p-2 dark:text-white text-center font-semibold text-xl px-2">{name}</div>
                <div className="text-black dark:text-white text-center font-normal text-sm px-2">{description}</div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-gray-400 py-8">
        © All rights reserved · vhome.co.in
      </div>
    </div>
  );
};

export default Home;
