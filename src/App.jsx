import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";
import AcademicCalendar from "./AcademicCalendar";
import PdfViewer from "./PDFViewer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/academiccalendar" element={<AcademicCalendar />} />
        <Route path="/academiccalendar/:id" element={<PdfViewer />} />
      </Routes>
    </Router>
  );
}