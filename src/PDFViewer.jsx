// src/pages/PdfViewer.jsx
import { useParams, Link } from "react-router-dom";
import { calendar } from "../data";

export default function PdfViewer() {
  const { id } = useParams();
  const item = calendar.find(c => c.id === id);

  if (!item) return <div>PDF not found</div>;

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <Link to="/" className="navbar-title-routed">VHome</Link>
        <div className="navbar-title"> &gt; </div>
        <Link to="/academiccalendar" className="navbar-title-routed">Academic Calendar</Link>
        <div className="navbar-title"> &gt; {item.name}</div>
      </div>

      {/* PDF Viewer */}
      <div className="listcontainer">
        <iframe
          src={`/assets/documents/${item.id}.pdf`}
          width="100%"
          height="492px"
          title={item.name}
        ></iframe>
      </div>

      {/* Footer */}
      <div className="footbar">
        <div className="footbar-text">
          © All rights reserved
          <br /><br />
          vhome.co.in
        </div>
      </div>
    </div>
  );
}