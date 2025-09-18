import React, { useState, useEffect, useRef } from 'react';  // <-- import useRef
import { apps, calendar, examschedule, vitol, nptel } from '../data';
import './index.css';
import {
  PersonFeedback24Filled,
  WeatherMoon20Filled,
  WeatherSunny20Filled,
  Info24Filled,
  SearchSparkle24Filled,
  PersonFeedback20Filled,
  Dismiss16Filled ,
  SearchSparkle24Color
} from '@fluentui/react-icons';


const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme === 'dark';
  }
  // fallback: check if <html> already has dark mode class
  return document.documentElement.classList.contains('dark');
});

  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const searchContainerRef = useRef(null); //detect click outside the search bar areas

  const inputRef = useRef(null);  // detect input

  // THEME TOGGLE
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
  const allItems = [
  ...apps.map(item => ({ ...item, type: 'app' })),  // Add type for apps
  ...calendar,
  ...examschedule,
  ...nptel.map(item => ({ ...item, type: 'nptel' })),
  ...vitol.map(item => ({ ...item, type: 'vitol' }))
  ];
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
      if (selected?.type === 'app' && selected.url) {
        window.open(selected.url, '_blank');
      } else if (selected?.type === 'calendar') {
        window.location.href = `/#/calendar/${selected.id}`;
      } else if (selected?.type === 'examschedule') {
        window.location.href = `/#/examschedule/${selected.id}`;
      } else if (selected?.type === 'nptel' && selected.url) {
        window.open(selected.url, '_blank');
      } else if (selected?.type === 'vitol' && selected.url) {
        window.open(selected.url, '_blank');
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

  // SEARCH BAR AUTO CLEAR ON CLICKING OUTSIDE 
    useEffect(() => {
    const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setQuery('');
      setFilteredResults([]);
      setActiveIndex(0);
      setIsFocused(false);
      inputRef.current?.blur();  // <-- Remove focus from input
    }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


  // NAVBAR PILL LOGIC
  // sliding pill state
const [hoveredIndex, setHoveredIndex] = useState(null);
const iconRefs = useRef([]);

// tweak this if your pill text/padding changes
const PILL_EXTRA = 120; // px of horizontal space the pill needs to avoid overlap




// MAIN HTML RENDER

  return (

  <div className="min-h-screen bg-white dark:bg-[rgb(34,34,34)] text-black dark:text-white transition-colors duration-500 relative overflow-x-hidden">

{/* Header */}
<div className="sticky top-0 z-50 backdrop-blur-xl flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-400/20 to-red-400/20 dark:from-purple-900/20 dark:to-red-900/20 shadow-lt rounded-md">
  {/* Logo */}
  <h1 className="text-xl font-bold text-black dark:text-white">VHome</h1>

  <div className="flex items-center">
    {/* Dark/Light Mode Toggle */}
    <button
      onClick={() => toggleTheme()}
      className="group flex items-center rounded-full cursor-pointer
                 transition-all duration-300 ease-in-out
                 bg-transparent px-4 py-2
                 hover:bg-gradient-to-r 
                 hover:from-purple-500 hover:to-red-500
                 hover:dark:from-purple-800 hover:dark:to-red-800"
    >
      <span className="flex items-center space-x-2">
        {/* Icon stays visible always */}
        <span className="shrink-0">
          {darkMode ? (
            <WeatherMoon20Filled className="w-5 h-5 text-black dark:text-white group-hover:text-white" />
          ) : (
            <WeatherSunny20Filled className="w-5 h-5 text-black dark:text-white group-hover:text-white" />
          )}
        </span>
        {/* Text Label only shows on hover */}
        <span
          className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap
                     group-hover:max-w-[120px] group-hover:opacity-100 
                     transition-all duration-300 ease-in-out text-white font-semibold"
        >
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </span>
    </button>

    {/* Contribute */}
    <button
      onClick={() => window.location.href = '/#/contribute'}
      className="group flex items-center rounded-full cursor-pointer
                 transition-all duration-300 ease-in-out
                 bg-transparent px-4 py-2
                 hover:bg-gradient-to-r 
                 hover:from-purple-500 hover:to-red-500
                 hover:dark:from-purple-800 hover:dark:to-red-800"
    >
      <span className="flex items-center space-x-2">
        <span className="shrink-0">
          <PersonFeedback24Filled className="w-5 h-5 text-black dark:text-white group-hover:text-white" />
        </span>
        <span
          className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap
                     group-hover:max-w-[120px] group-hover:opacity-100 
                     transition-all duration-300 ease-in-out text-white font-semibold"
        >
          Contribute
        </span>
      </span>
    </button>

    {/* Info */} 
    <button
      onClick={() => window.location.href = '/#/about'}
      className="group flex items-center rounded-full cursor-pointer
                 transition-all duration-300 ease-in-out
                 bg-transparent px-4 py-2
                 hover:bg-gradient-to-r
                 hover:from-purple-500 hover:to-red-500
                  hover:dark:from-purple-800 hover:dark:to-red-800"
    >
      <span className="flex items-center space-x-2">
        <span className="shrink-0">
          <Info24Filled className="w-5 h-5 text-black dark:text-white group-hover:text-white" />
        </span>
        <span
          className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap
                     group-hover:max-w-[120px] group-hover:opacity-100
                      transition-all duration-300 ease-in-out text-white font-semibold"
        >
          About
        </span>
      </span>
    </button> 
  </div>
</div>





      {/* Searchbar */}
 
      <div className="sticky top-20 z-50 w-full flex justify-center mt-8 px-4">
        <div className="relative w-full max-w-3xl" ref={searchContainerRef}>
          <center>
          <div
             className={`overflow-hidden rounded-full bg-gradient-to-r from-purple-400/40 to-red-400/40 dark:from-purple-900/40 dark:to-red-900/40 shadow-lt backdrop-blur-2xl shadow-md p-4 flex items-center space-x-4
              relative hover:shadow-[0_0_20px_#c080ff,0_0_20px_#aa0000] transition-all
             ${isFocused ? 'gradient-underline w-full' : 'w-80'}`}
              >
            {!isFocused ? (
            <SearchSparkle24Filled className="w-6 h-6 mx-1 flex-shrink-0 text-gray-400 dark:text-gray-400" />   
            ) : (
            <SearchSparkle24Color className="w-6 h-6 mx-1 flex-shrink-0" />
              )}

            <input
              type="text"
              placeholder="Search"
              autoComplete='none'
              autoFocus={true}
              className="w-full text-md mx-2 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border-b-2 border-transparent focus:outline-none"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              ref={inputRef}
            />
            

            {query && (
            <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={clearSearch}
            className="flex items-center justify-center w-6 h-6 mx-2 text-gray-500 hover:text-red-700 dark:hover:text-red-300 transition"
            aria-label="Clear search"
            type="button"
            >
            <Dismiss16Filled className="w-4 h-4 mx-1" />
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
                {filteredResults.map(({ id, name, url, type }, index) => (
                  <li
                    key={id}
                    onClick={() => {
                      if (type === 'app' && url) {
                        window.open(url, '_blank');
                      } else if (type === 'calendar') {
                        window.location.href = `/#/calendar/${id}`;
                      } else if (type === 'examschedule') {
                        window.location.href = `/#/examschedule/${id}`;
                      } else if (type === 'nptel' && url) {
                        window.open(url, '_blank');
                      } else if (type === 'vitol' && url) {
                        window.open(url, '_blank');
                      }
                    }}

                    onMouseEnter={() => setActiveIndex(index)}
                    className={`cursor-pointer px-8 py-4 mx-4 transition-transform duration-150
                      ${
                        activeIndex === index
                          ? 'bg-gradient-to-r from-purple-600/40 to-red-600/40 text-black dark:bg-gradient-to-r from-purple-600/20 to-red-600/20 dark:text-white font-semibold rounded-full hover:shadow-[0_0_20px_#c084ff,0_0_20px_#aa0000] scale-105'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    style={{ userSelect: 'none' }}
                  >
                    <div style={{display:`inline`}}>
                    {name}
                    <div className="text" style={{float: 'right', fontStyle: 'italic', color: 'gray', fontSize: '0.8rem'}}>
                    {type}
                    </div>

                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
           </center>
        </div>
      </div>
      

      {/* Dashboard: Quick Links & Spotlight */}
      <div className="mt-8 px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quick Links */}
        <div className="rounded-2xl py-4 px-6 bg-black/10 dark:bg-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-purple-900 to-red-900 dark:from-purple-300 dark:to-red-300 bg-clip-text text-transparent">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { name: 'VTOPcc', link: 'https://vtopcc.vit.ac.in/' },
              { name: 'Calendars', link: '/#/calendar' },
              { name: 'NPTEL Links', link: '/#/nptel' },
              { name: 'Exam Schedule', link: '/#/examschedule' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.link.startsWith('http') ? window.open(item.link) : window.location.href = item.link}
                className="bg-black/10 dark:bg-white/10 rounded-2xl p-4 text-sm font-medium hover:font-bold hover:scale-105 hover:rounded-full hover:bg-gradient-to-r from-purple-600/40 to-red-600/40 dark:hover:from-purple-900/40 dark:hover:to-red-900/40 hover:box-shadow-purple hover:shadow-[0_0_20px_#c084ff,0_0_20px_#aa0000] transition-all"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight */}

        <div className="rounded-2xl py-4 px-6 bg-black/10 dark:bg-white/10 shadow-lg backdrop-blur-md">
          <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-purple-900 to-red-900 dark:from-purple-300 dark:to-red-300 bg-clip-text text-transparent">
            Spotlight
          </h2>
          <div className="space-y-2">
            {[
              'Welcome to VHome v5.0',
            ].map((text, idx) => (
              <div
                key={idx}
                className="bg-black/10 dark:bg-white/10 rounded-xl p-4 text-sm font-medium hover:font-bold hover:scale-105 hover:rounded-2xl hover:bg-gradient-to-r from-purple-600/10 to-red-600/10 dark:hover:from-purple-900/10 dark:hover:to-red-900/10 transition-all"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

{/* All Apps */}
<div className="mt-12 px-4" style={{ display: `flex` }}>
  <div
    className="mx-auto max-w-screen-lg grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center"
    style={{ display: `inline-grid`, alignContent: `center` }}
  >
    {apps.map(({ id, name, description, url }) => (
      <div
        key={id}
        onClick={() => window.open(url)}
        className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 xl:w-44 xl:h-44 
             rounded-2xl overflow-hidden bg-white/10 dark:bg-white/10 backdrop-blur-2xl 
             cursor-pointer transition-transform transform hover:scale-110 group"
        style={{
          backgroundImage: `url('/icons/${darkMode ? 'dark' : 'light'}/${id}.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
           // smooth glow transition
        }}
      >
        <div className="absolute inset-0 group-hover:backdrop-blur-md group-hover:scale-110 transition duration-300" />
        <div className="absolute inset-0 bg-white/30 dark:bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="text-center px-2 space-y-1">
            <div className="text-black dark:text-white font-bold text-sm sm:text-base md:text-md">
              {name}
            </div>
            <div className="hidden md:block text-black dark:text-white font-normal text-sm md:text-sm">
              {description}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Footer */}
      <div className="mt-20 text-center text-md text-gray-400 py-8">
        <div>© All rights reserved · vhome.co.in
        </div>
        <div>Made with ❤️ by Mahesh, Josh and Atharva</div>
      </div>
    </div>
  );
};

export default Home;
