import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { examschedule } from "../data";

export default function PdfViewer() {
  const { id } = useParams();
  const item = examschedule.find((c) => c.id === id);

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        PDF not found
      </div>
    );

  const [darkMode, setDarkMode] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  // Detect dark mode and Android on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(userAgent));
  }, []);

  // Construct PDF URLs
  const pdfUrl = `/examschedule/${item.id}.pdf`;
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true`;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 flex flex-col">
      {/* Navbar with breadcrumb */}
      <div className="sticky top-0 z-50 backdrop-blur-xl px-6 py-4 bg-gradient-to-r from-purple-400/20 to-red-400/20 dark:from-purple-900/20 dark:to-red-900/20 shadow-lt rounded-md flex flex-wrap items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-base md:text-lg font-medium">
          <Link
            to="/"
            className="text-lg font-bold text-purple-700 dark:text-purple-200 transition-all transform hover:scale-105 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-400 to-red-400"
            style={{ textShadow: "none" }}
            onMouseEnter={(e) => {
              e.target.style.textShadow = "0 0 60px #c084fc, 0 0 12px #f87171";
            }}
            onMouseLeave={(e) => {
              e.target.style.textShadow = "none";
            }}
          >
            VHome
          </Link>
          <span className="text-gray-400"> &gt; </span>
          <Link
            to="/examschedule"
            className="text-lg font-bold text-black dark:text-white transition-all transform hover:scale-105 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-400 to-red-400"
            style={{ textShadow: "none" }}
            onMouseEnter={(e) => {
              e.target.style.textShadow = "0 0 60px #c084fc, 0 0 12px #f87171";
            }}
            onMouseLeave={(e) => {
              e.target.style.textShadow = "none";
            }}
          >
            Exam Schedule
          </Link>
          <span className="text-gray-400"> &gt; </span>
          <span className="text-lg font-bold text-black dark:text-white">{item.name}</span>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-grow px-6 py-4 mt-6 min-h-0 flex">
        {/* Use a flex container and make the inner wrapper flex-1 so iframe fills available space */}
        <div className="flex-1 min-h-0">
          <iframe
            src={isAndroid ? googleViewerUrl : pdfUrl}
            title={item.name}
            className="flex-1 w-full h-full rounded-md shadow-md border border-gray-300 dark:border-gray-700"
            style={{ minHeight: 0 }}
            allowFullScreen
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-400 py-8">
        © All rights reserved · vhome.co.in
      </div>
    </div>
  );
}
