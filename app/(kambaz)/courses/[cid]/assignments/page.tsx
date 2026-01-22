import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>{" "}
          <div id="wd-assignment-desc">
            Multiple Modules | **Not available until May 6 at 12:00am** | **Due
            May 13 at 11:59pm** | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>{" "}
          <div id="wd-assignment-desc">
            Multiple Modules | **Not available until May 13 at 12:00am** | **Due
            May 20 at 11:59pm** | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/125"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>{" "}
          <div id="wd-assignment-desc">
            Multiple Modules | **Not available until May 20 at 12:00am** | **Due
            May 27 at 11:59pm** | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
