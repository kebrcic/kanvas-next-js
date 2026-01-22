export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button> Collapse All</button>
      <button> View Progress</button>
      <select defaultValue="Publish All" id="wd-module-button">
        <option value="Publish All">Publish All</option>
      </select>
      <button> + Module </button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Understanding HTML Structure
                </li>
                <li className="wd-content-item">Using Common HTML Tags</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">LESSONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">Lists, Tables, and Forms</li>
                <li className="wd-content-item">Hyperlinks and Images</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to CSS</li>
                <li className="wd-content-item">
                  Styling Web Pages with Selectors
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">LESSONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">The Box Model</li>
                <li className="wd-content-item">Flexbox and Layout Basics</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
