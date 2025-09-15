
import React, { useState, useEffect, useRef } from 'react';  // <-- import useRef
import { Link } from 'react-router-dom';

export default function About() {
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

          {/* Static Contribute Text */}
          <span className="text-lg font-bold text-black dark:text-white">
            About
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 px-10 md:px-10 p-2 m-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Meet the ones behind VHome</h1>
        <h3 className='text-md font-semibold mb-6 text-center'>feel free to stalk us on LinkedIn, and send a connection request XD</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Profile Card 1 */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
                <img src="https://avatars.githubusercontent.com/u/62760536?v=4" alt="Profile 1" className="w-32 h-32 rounded-full mb-4" />
                <h2 className="text-xl font-bold mb-2">Mahesh</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">Creator & Developer</p>
                <a href="https://www.linkedin.com/in/kmahesh110606/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">LinkedIn Profile</a>
            </div>
            {/* Profile Card 2 */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
                <img src="https://avatars.githubusercontent.com/u/62760536?v=4" alt="Profile 2" className="w-32 h-32 rounded-full mb-4" />
                <h2 className="text-xl font-bold mb-2">Josh</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">Creator & Developer</p>
                <a href="https://www.linkedin.com/in/joshsajugeorge20112006/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">LinkedIn Profile</a>
            </div>
            {/* Profile Card 3 */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
                <img src="https://avatars.githubusercontent.com/u/62760536?v=4" alt="Profile 3" className="w-32 h-32 rounded-full mb-4" />
                <h2 className="text-xl font-bold mb-2">Atharva Bandekar</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">Creator & Developer</p>
                <a href="https://www.linkedin.com/in/atharva-bandekar/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">LinkedIn Profile</a>
            </div>
            </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-gray-400 py-8">
        © All rights reserved · vhome.co.in
      </div>
    </div>
  );
}
