// src/pages/PdfViewer.jsx
import { useParams, Link } from "react-router-dom";
import { calendar } from "../data";

export default function PdfViewer() {
  const { id } = useParams();
  const item = calendar.find(c => c.id === id);

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <p className="text-lg font-semibold">📄 PDF not found</p>
      </div>
    );

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

          {/* Academic Calendar Link */}
          <Link
            to="/calendar"
            className="text-lg font-bold text-black dark:text-white transition-all transform hover:scale-105 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-400 to-red-400"
            style={{ textShadow: 'none' }}
            onMouseEnter={e => {
              e.target.style.textShadow = '0 0 60px #c084fc, 0 0 12px #f87171';
            }}
            onMouseLeave={e => {
              e.target.style.textShadow = 'none';
            }}
          >
            Academic Calendar
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
        <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
          <iframe
            src={`/calendar/${item.id}.pdf`}
            title={item.name}
            className="w-full h-full"
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
