import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github } from "lucide-react"; // icons

// Inline Instagram SVG (so no new dependency)
const Instagram = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className || "w-6 h-6"}
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm9.25 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
  </svg>
);

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

  // Example team data
  const team = [
    {
      name: "Mahesh",
      role: "Developer, Founder",
      img: "https://avatars.githubusercontent.com/u/62760536?v=4",
      linkedin: "https://www.linkedin.com/in/kmahesh110606/",
      insta: "https://www.instagram.com/kmahesh110606",
      github: "https://github.com/kmahesh110606",
    },
    {
      name: "Josh",
      role: "UI/UX Designer, Data Integratior",
      img: "https://avatars.githubusercontent.com/u/62760536?v=4",
      linkedin: "https://www.linkedin.com/in/joshsajugeorge201106/",
      insta: "https://www.instagram.com/josh_george_2011",
      github: "https://github.com/https://github.com/joshdeputi2011",
    },
    {
      name: "Atharva Bandekar",
      role: "Founder",
      img: "https://avatars.githubusercontent.com/u/62760536?v=4",
      linkedin: "https://www.linkedin.com/in/atharva-bandekar-1b8406244/?originalSubdomain=in",
      insta: "https://www.instagram.com/rudeduckling",
      github: "https://github.com/WannaLearnCodingForFun",
    },
  ];

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
          <span className="text-lg font-bold text-black dark:text-white">
            About
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 px-6 md:px-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Meet the ones behind VHome</h1>
        <h3 className="text-md font-semibold mb-6 text-center">
          Feel free to stalk us on LinkedIn, Insta or GitHub 🚀
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="
  rounded-2xl p-6 flex flex-col items-center
  bg-gradient-to-r from-purple-400/40 to-red-400/40 
  dark:from-purple-900/40 dark:to-red-900/40
  shadow-md transition-all transform
  hover:scale-105 hover:shadow-[0_0_20px_#c084fc,0_0_20px_#f87171]
  hover:from-purple-600/60 hover:to-red-600/60
  dark:hover:from-purple-800/60 dark:hover:to-red-800/60
"

            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 shadow-md"
              />
              <h2 className="text-xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                {member.role}
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all hover:scale-110 hover:bg-gradient-to-r from-purple-600 to-red-600 hover:shadow-[0_0_12px_#c084ff,0_0_12px_#f87171]"
                >
                  <Linkedin className="w-6 h-6 text-gray-700 dark:text-white" />
                </a>
                <a
                  href={member.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all hover:scale-110 hover:bg-gradient-to-r from-purple-600 to-red-600 hover:shadow-[0_0_12px_#c084ff,0_0_12px_#f87171]"
                >
                  <Instagram className="w-6 h-6 text-gray-700 dark:text-white" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all hover:scale-110 hover:bg-gradient-to-r from-purple-600 to-red-600 hover:shadow-[0_0_12px_#c084ff,0_0_12px_#f87171]"
                >
                  <Github className="w-6 h-6 text-gray-700 dark:text-white" />
                </a>
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
}
