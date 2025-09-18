
import React, { useState, useEffect, useRef } from 'react';  // <-- import useRef
import { Link } from 'react-router-dom';

export default function Contribute() {
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
            Become a Contributor
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 px-5 md:px-5 p-2 m-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Help the VHome Community grow faster than ever!</h1>
        <h3 className='text-md font-semibold mb-6 text-center'> Here are a few ways you can contribute: </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/10 dark:bg-white/10 rounded-xl p-6 text-md font-medium hover:font-bold hover:scale-105 hover:rounded-2xl hover:bg-gradient-to-r from-purple-500/20 to-red-500/20 dark:hover:bg-gradient-to-r from-purple-900/60 to-red-900/30 transition-all hover:shadow-[0_0_40px_#c084ff,0_0_40px_#aa0000]">
            <h2 className="text-md font-bold mb-4">Report Issues</h2>
            <p className="mb-4 text-sm">Found a bug or an error on the site? Let us know by reporting it on our <a href="https://github.com/kmahesh110606/VHome.web/issues" className="text-purple-600 dark:text-purple-400 underline">GitHub Issues page</a>. Your feedback helps us improve!</p>
          </div>
          <div className="bg-black/10 dark:bg-white/10 rounded-xl p-6 text-md font-medium hover:font-bold hover:scale-105 hover:rounded-2xl hover:bg-gradient-to-r from-purple-500/20 to-red-500/20 dark:hover:bg-gradient-to-r from-purple-900/60 to-red-900/30 transition-all hover:shadow-[0_0_40px_#c084ff,0_0_40px_#aa0000]">
            <h2 className="text-md font-bold mb-4">Suggest Features</h2>
            <p className="mb-4 text-sm">Have an idea for a new feature or improvement? Share your suggestions on our <a href="https://forms.microsoft.com/r/HZavR92nLN" className="text-purple-600 dark:text-purple-400 underline">here</a>. We value your input!</p>
          </div>
          <div className="bg-black/10 dark:bg-white/10 rounded-xl p-6 text-md font-medium hover:font-bold hover:scale-105 hover:rounded-2xl hover:bg-gradient-to-r from-purple-500/20 to-red-500/20 dark:hover:bg-gradient-to-r from-purple-900/60 to-red-900/30 transition-all hover:shadow-[0_0_40px_#c084ff,0_0_40px_#aa0000]">
              <h2 className="text-md font-bold mb-4">Request New Apps/Services</h2>  
                <p className="mb-4 text-sm">Know of a useful app or service that isn't listed? Request its addition by filling this form. <a href="https://forms.microsoft.com/r/Jexc00E8nt" className="text-purple-600 dark:text-purple-400 underline">Click to Open form </a>. Help us expand our offerings!</p>
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
