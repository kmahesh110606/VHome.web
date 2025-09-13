import React, { useState, useEffect, useRef } from 'react';  // <-- import useRef
import { apps, calendar, examschedule } from '../data';
import './index.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef(null);  // <-- define ref here

  // THEME TOGGLE
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  //SEARCH UNDERLINE
  const [isFocused, setIsFocused] = useState(false);

  // SEARCH LOGIC
  useEffect(() => {
  if (query.trim() === '') {
    setFilteredResults([]);
    setActiveIndex(0);
    return;
  }
  const allItems = [...apps, ...calendar, ...examschedule];
  const lower = query.toLowerCase();
  const results = allItems.filter(item =>
    item.name.toLowerCase().includes(lower)
  );
  setFilteredResults(results);
  setActiveIndex(0);
}, [query]);


  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      const selected = filteredResults[activeIndex];
      if (selected?.url) {
        window.open(selected.url, '_blank');
      } else if (selected?.id) {
        window.location.href = `/#/calendar/${selected.id}`;
      }
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredResults([]);
    setActiveIndex(0);
    if (inputRef.current) inputRef.current.focus();  // <-- focus on input after clearing
  };
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 relative">

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-400/20 to-red-400/20 dark:from-purple-900/20 dark:to-red-900/20 shadow-lt rounded-md">
        <h1 className="text-xl font-bold text-black dark:text-white">VHome</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-white text-purple-700 dark:bg-black dark:text-purple-300 border border-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900 transition"
        >
          {darkMode ? '☀' : '☾'}
        </button>
      </div>

      {/* Searchbar */}
      
      <div className="sticky top-20 z-50 w-full flex justify-center mt-8 px-4">
        <div className="relative w-full max-w-3xl">
          <center>
          <div
             className={`overflow-hidden rounded-full bg-gradient-to-r from-purple-400/30 to-red-400/30 dark:from-purple-900/30 dark:to-red-900/30 shadow-lt backdrop-blur-xl shadow-md p-4 flex items-center space-x-4
              relative hover:shadow-[0_0_20px_#c080ff,0_0_20px_#aa0000] transition-all
             ${isFocused ? 'gradient-underline w-full' : 'w-96'}`}
              >
            <input
              type="text"
              placeholder="Search"
              autoComplete='none'
              autoFocus='true'
              className="w-full mx-2 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border-b-2 border-transparent focus:outline-none"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              ref={inputRef}
            />

            {query && (
              <button
                onClick={clearSearch}
                className="text-xl text-gray-500 hover:text-red-700 dark:hover:text-red-300 transition"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Dropdown */}
          {filteredResults.length > 0 && (
            <div
              className="absolute px-4 left-1/2 transform -translate-x-1/2 mt-2 w-full max-h-[50vh] overflow-y-auto rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-black/60 shadow-lg z-50"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(147, 105, 238, 0.7) transparent' }}
            >
              <ul className="divide-y my-3 divide-gray-300 dark:divide-gray-700">
                {filteredResults.map(({ id, name, url }, index) => (
                  <li
                    key={id}
                    onClick={() => window.open(url)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`cursor-pointer px-8 py-4 mx-4 transition-transform duration-150
                      ${
                        activeIndex === index
                          ? 'bg-gradient-to-r from-purple-600/40 to-red-600/40 text-black dark:bg-gradient-to-r from-purple-600/20 to-red-600/20 dark:text-white font-semibold rounded-full hover:shadow-[0_0_20px_#c084ff,0_0_20px_#aa0000] scale-105'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    style={{ userSelect: 'none' }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
           </center>
        </div>
      </div>
      

      {/* Dashboard: Quick Links & Spotlight */}
      <div className="mt-10 px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quick Links */}
        <div className="rounded-2xl py-6 px-8 bg-black/10 dark:bg-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-red-900 dark:from-purple-300 dark:to-red-300 bg-clip-text text-transparent">
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
                className="w-full bg-black/10 dark:bg-white/10 rounded-2xl p-6 text-md font-medium hover:font-bold hover:scale-110 hover:rounded-full hover:bg-gradient-to-r from-purple-600/40 to-red-600/40 dark:hover:from-purple-900/40 dark:hover:to-red-900/40 hover:box-shadow-purple hover:shadow-[0_0_20px_#c084ff,0_0_20px_#aa0000] transition-all"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight */}
        <div className="rounded-2xl py-6 px-8 bg-black/10 dark:bg-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-red-900 dark:from-purple-300 dark:to-red-300 bg-clip-text text-transparent">
            Spotlight
          </h2>
          <div className="space-y-2">
            {[
              'Welcome to VHome v5.0',
            ].map((text, idx) => (
              <div
                key={idx}
                className="w-auto bg-black/10 dark:bg-white/10 rounded-xl p-6 text-lg font-medium hover:font-bold hover:scale-105 hover:rounded-2xl hover:bg-gradient-to-r from-purple-600/10 to-red-600/10 dark:hover:from-purple-900/10 dark:hover:to-red-900/10 transition-all"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Apps */}
<div className="mt-12 px-4">
  <div className="mx-auto max-w-screen-xl grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
    {apps.map(({ id, name, description, url }) => (
      <div
        key={id}
        onClick={() => window.open(url)}
        className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44 xl:w-48 xl:h-48 rounded-2xl overflow-hidden shadow-lg bg-white/10 dark:bg-white/10 backdrop-blur-2xl cursor-pointer transition-transform transform hover:scale-110 hover:shadow-2xl group"
        style={{
          backgroundImage: `url('/icons/${id}.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 group-hover:backdrop-blur-md group-hover:scale-110 transition duration-300" />
        <div className="absolute inset-0 bg-white/30 dark:bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="text-center px-2 space-y-1">
            <div className="text-black dark:text-white font-semibold text-sm sm:text-base md:text-lg">
              {name}
            </div>
            <div className="hidden md:block text-black dark:text-white font-normal text-xs md:text-sm">
              {description}
            </div>
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
