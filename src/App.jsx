import { Routes, Route } from 'react-router-dom';
import AcademicCalendar from './AcademicCalendar';
import PdfViewer from './PDFViewer';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/calendar" element={<AcademicCalendar />} />
      <Route path="/calendar/:id" element={<PdfViewer />} />
      <Route path="/examschedule" element={<AcademicCalendar />} />
      <Route path="/examschedule/:id" element={<PdfViewer />} />
      <Route path="/all" element={<div>All Apps Page</div>} />
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
      <Route path="/terms" element={<div>Terms and Conditions Page</div>} />
      <Route path="/request" element={<div>Request Page</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}