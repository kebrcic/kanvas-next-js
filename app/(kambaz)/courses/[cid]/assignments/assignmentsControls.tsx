import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import AssignmentEditor from "./AssignmentEditor";
import { AssignmentData } from "./page";

export default function AssignmentsControls({
  initialData,
  setInitialData,
  addAssignment,
}: {
  initialData: AssignmentData;
  setInitialData: (data: AssignmentData) => void;
  addAssignment: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center">
      {/* Left-justified Search Bar */}
      <div className="position-relative w-50">
        <PiMagnifyingGlassLight
          className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"
          style={{ zIndex: 1 }}
        />
        <input
          id="wd-search-assignment"
          className="form-control ps-5"
          placeholder="Search for Assignment"
        />
      </div>

      {/* Right-justified Buttons */}
      <div className="d-flex">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 text-nowrap"
          id="wd-add-assignment-group"
        >
          <FaPlus className="me-1" /> Group
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="text-nowrap"
          id="wd-add-assignment"
          onClick={handleShow}
        >
          <FaPlus className="me-1" /> Assignment
        </Button>
      </div>
      <AssignmentEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Assignment"
        formData={initialData}
        setFormData={setInitialData}
        funcAssignment={addAssignment}
      />
    </div>
  );
}
