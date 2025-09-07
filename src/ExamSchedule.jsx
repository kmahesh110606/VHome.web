// src/pages/AcademicCalendar.jsx
import { Link } from "react-router-dom";
import { calendar } from "../data";

export default function ExamSchedule() {
  return (
    <div className="listcontainer">
      {calendar.map(item => (
        <Link
          key={item.id}
          to={`/examschedule/${item.id}`}
          className="quicklink-item"
        >
          <div className="quicklink-item text">{item.name}</div>
        </Link>
      ))}
    </div>
  );
}