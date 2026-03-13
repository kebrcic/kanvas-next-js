/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";
import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsTrash } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "next/navigation";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, deleteAssignment, updateAssignment } from "./reducer";
import { useState } from "react";
import AssignmentEditor from "./AssignmentEditor";
import ConfirmModal from "./confirmModal";
import SingleAssignmentControlButton from "./SingleAssignmentControlButton";

export interface AssignmentData {
  title: string;
  due_date: string;
  points: number;
  description: string;
  available_from_date: string;
  available_to_date: string;
}

export default function Assignments() {
  //get the cid
  const { cid } = useParams();

  // Initialize with the correct object structure
  const [formData, setFormData] = useState<AssignmentData>({
    title: "New Assignment",
    description: "New Description",
    points: 100,
    due_date: "2024-05-13",
    available_from_date: "2024-05-06",
    available_to_date: "2024-05-20",
  });

  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  //filter corresponding assignments based on cid
  const currAssignments = assignments.filter((asgmt) => asgmt.course === cid);
  const dispatch = useDispatch();
  // Define the handler
  const handleAddAssignment = () => {
    dispatch(addAssignment({ ...formData, course: cid }));
  };

  const handleEditClick = (assignment: any) => {
    setFormData(assignment);
    setShow(true);
  };
  const resetFormData = () => {
    setFormData({
      title: "New Assignment",
      description: "New Description",
      points: 100,
      due_date: "2024-05-13",
      available_from_date: "2024-05-06",
      available_to_date: "2024-05-20",
    });
  };
  const handleUpdateAssignment = () => {
    dispatch(updateAssignment({ ...formData }));
    resetFormData();
  };

  const formatDate = (dateString: string, isEndOfDay = true) => {
    if (!dateString) return "TBD";

    let normalizedDate = dateString;

    // Improved check for dd-mm-yyyy or dd-mm
    if (dateString.includes("-")) {
      const parts = dateString.split("-");

      // If it's dd-mm-yyyy
      if (parts.length === 3 && parts[0].length === 2) {
        const [day, month, year] = parts;
        normalizedDate = `${year}-${month}-${day}`;
      }
      // If it's just dd-mm (This might be where your May 6th comes from)
      else if (parts.length === 2) {
        const [day, month] = parts;
        const currentYear = new Date().getFullYear();
        normalizedDate = `${currentYear}-${month}-${day}`;
      }
    }

    const time = isEndOfDay ? "T23:59:00" : "T00:00:00";

    // Use a fallback check for the final string construction
    const date = new Date(`${normalizedDate}${time}`);

    if (isNaN(date.getTime())) return "Invalid Date";

    // ... rest of your formatting logic
    const datePart = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
      .format(date)
      .toLowerCase()
      .replace(" ", "");

    return `${datePart} at ${timePart}`;
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const confirmDelete = () => {
    dispatch(deleteAssignment(formData));
    setShowDeleteModal(false);
    resetFormData();
  };

  return (
    <div>
      <AssignmentsControls
        initialData={formData}
        setInitialData={setFormData}
        addAssignment={handleAddAssignment}
      />

      <AssignmentEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Edit Assignment"
        formData={formData}
        setFormData={setFormData}
        funcAssignment={handleUpdateAssignment}
      />
      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Assignment"
        message={`Are you sure you want to remove "${formData?.title}"?`}
        confirmLabel="Yes, Delete" // Overriding the default "Save"
        variant="danger"
      />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3 bold" />{" "}
            <span className="fw-bold">ASSIGNMENTS </span>
            <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-assignment-list rounded-0">
            {currAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id} // Added key
                className="wd-assignment p-3 ps-1 d-flex"
                onClick={() => handleEditClick(assignment)}
              >
                <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                {/* Added d-flex and justify-content-between here */}
                <div className="d-flex justify-content-between align-items-start w-100">
                  {/* Left side content (Link and Description) */}
                  <div>
                    {assignment.title}
                    <div id="wd-assignment-desc" className="small mt-1">
                      <span className="text-danger fw-normal">Multiple Modules</span>
                      <span className="text-muted"> | </span>
                      <span className="fw-semibold">Not available until </span>
                      <span className="text-dark fw-normal">
                        {formatDate(assignment.available_from_date)}
                      </span>
                      <span className="text-muted"> | </span>
                      <span className="fw-semibold">Due </span>
                      <span className="text-dark fw-normal">{formatDate(assignment.due_date)}</span>
                      <span className="text-muted"> | </span>
                      <span className="text-muted fw-semibold">{`${assignment.points} pts`}</span>
                    </div>
                  </div>
                  {/* Right side content (Buttons) */}

                  <SingleAssignmentControlButton
                    setFormData={setFormData}
                    setShowDeleteModal={setShowDeleteModal}
                    assignment={assignment}
                  />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
