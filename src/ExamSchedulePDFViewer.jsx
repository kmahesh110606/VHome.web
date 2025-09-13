// src/pages/PdfViewer.jsx
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';  // <-- import useRef
import { examschedule } from "../data";

export default function PdfViewer() {
  const { id } = useParams();
  const item = examschedule.find(c => c.id === id);

  if (!item) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">PDF not found</div>;

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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 flex flex-col">
      
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

          {/* Exam Schedule Link */}
          <Link
            to="/examschedule"
            className="text-lg font-bold text-black dark:text-white transition-all transform hover:scale-105 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-400 to-red-400"
            style={{ textShadow: 'none' }}
            onMouseEnter={e => {
              e.target.style.textShadow = '0 0 60px #c084fc, 0 0 12px #f87171';
            }}
            onMouseLeave={e => {
              e.target.style.textShadow = 'none';
            }}
          >
            Exam Schedule
          </Link>

          <span className="text-gray-400"> &gt; </span>

          {/* Current item name */}
          <span className="text-lg font-bold text-black dark:text-white">
            {item.name}
          </span>
        </div>

      </div>

      {/* PDF Viewer */}
      <div className="flex-grow px-6 py-4 mt-6">
        <iframe
          src={`/examschedule/${item.id}.pdf`}
          width="100%"
          height="600px"
          title={item.name}
          className="rounded-md shadow-md border border-gray-300 dark:border-gray-700"
        />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-400 py-8">
        © All rights reserved · vhome.co.in
      </div>
    </div>
  );
}
