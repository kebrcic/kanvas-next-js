import { Button, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { PiMagnifyingGlassLight } from "react-icons/pi";

export default function AssignmentsControls() {
  return (
    // Use d-flex to align items, justify-content-between to space them out
    // flex-wrap allows items to stack vertically on small screens
    <div
      id="wd-assignments-controls"
      className="d-flex justify-content-between align-items-end flex-wrap gap-2"
    >
      {/* Search Bar Container */}
      {/* Width utilities now work correctly within the flex container */}
      <div className="position-relative w-100 w-md-50 w-lg-25">
        <PiMagnifyingGlassLight
          className="position-absolute start-0 top-50 translate-middle-y ms-2 text-muted"
          style={{ zIndex: 1, pointerEvents: "none" }} // Added pointerEvents none for usability
        />
        <input
          type="text" // Changed type to text, standard for search
          className="form-control ps-5"
          id="wd-search-assignment"
          placeholder="Search..."
        />
      </div>

      {/* Buttons Container: Group buttons together using flexbox */}
      <div className="d-flex flex-shrink-0">
        <Button
          variant="secondary"
          size="lg"
          className="me-1" // Removed float-end
          id="wd-add-assignment-group"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="me-1" // Removed float-end
          id="wd-add-assignment"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </div>
    </div>
  );
}
