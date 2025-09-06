import { Routes, Route } from 'react-router-dom';
import Calendar from './Calendar';
import PDFViewer from './PDFViewer';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/calendar/:id" element={<PDFViewer />} />
      <Route path="/examschedule" element={<Calendar />} />
      <Route path="/examschedule/:id" element={<PDFViewer />} />
      <Route path="/all" element={<div>All Apps Page</div>} />
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
      <Route path="/terms" element={<div>Terms and Conditions Page</div>} />
      <Route path="/request" element={<div>Request Page</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}