import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './Calendar';
import ExamSchedule from './ExamSchedule';
import CalendarPDFViewer from './CalendarPDFViewer';
import ExamSchedulePDFViewer from './ExamSchedulePDFViewer';
import Home from './Home';
import VITOL from './VITOL';
import NPTEL from './NPTEL';

export default function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/calendar/:id" element={<CalendarPDFViewer />} />
      <Route path="/examschedule" element={<ExamSchedule />} />
      <Route path="/examschedule/:id" element={<ExamSchedulePDFViewer />} />
      <Route path="/all" element={<div>All Apps Page</div>} />
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
      <Route path="/terms" element={<div>Terms and Conditions Page</div>} />
      <Route path="/request" element={<div>Request Page</div>} />
      <Route path="/vitol" element={<VITOL />} />
      <Route path="/nptel" element={<NPTEL />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
