/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";

import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "next/navigation";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "./reducer";
import { useState, useEffect } from "react";
import AssignmentEditor from "./AssignmentEditor";
import ConfirmModal from "./confirmModal";
import SingleAssignmentControlButton from "./SingleAssignmentControlButton";
import * as client from "../../client";

export interface AssignmentData {
  title: string;
  due_date: string;
  points: number;
  description: string;
  available_from_date: string;
  available_to_date: string;
}

export default function Assignments() {
  const { cid } = useParams();

  const [formData, setFormData] = useState<AssignmentData>({
    title: "New Assignment",
    description: "New Description",
    points: 100,
    due_date: "2024-05-13",
    available_from_date: "2024-05-06",
    available_to_date: "2024-05-20",
  });

  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: { _id: string; role?: string } | null;
  };

  const isFacultyOrTA = currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  const currAssignments = assignments.filter((asgmt: any) => asgmt.course === cid);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAddAssignment = async () => {
    if (!cid) return;
    const newAssignment = { ...formData, course: cid };
    const assignment = await client.createAssignmentForCourse(
      Array.isArray(cid) ? cid[0] : cid,
      newAssignment,
    );
    dispatch(setAssignments([...assignments, assignment]));
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

  const handleUpdateAssignment = async () => {
    await client.updateAssignment(formData);
    dispatch(setAssignments(
      assignments.map((a: any) => (a._id === (formData as any)._id ? formData : a)),
    ));
    resetFormData();
    setShow(false);
  };

  const formatDate = (dateString: string, isEndOfDay = true) => {
    if (!dateString) return "TBD";

    let normalizedDate = dateString;

    if (dateString.includes("-")) {
      const parts = dateString.split("-");

      if (parts.length === 3 && parts[0].length === 2) {
        const [day, month, year] = parts;
        normalizedDate = `${year}-${month}-${day}`;
      } else if (parts.length === 2) {
        const [day, month] = parts;
        const currentYear = new Date().getFullYear();
        normalizedDate = `${currentYear}-${month}-${day}`;
      }
    }

    const time = isEndOfDay ? "T23:59:00" : "T00:00:00";
    const date = new Date(`${normalizedDate}${time}`);

    if (isNaN(date.getTime())) return "Invalid Date";

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

  const confirmDelete = async () => {
    await client.deleteAssignment((formData as any)._id);
    dispatch(setAssignments(assignments.filter((a: any) => a._id !== (formData as any)._id)));
    setShowDeleteModal(false);
    resetFormData();
  };

  return (
    <div>
      {isFacultyOrTA && (
        <AssignmentsControls
          initialData={formData}
          setInitialData={setFormData}
          addAssignment={handleAddAssignment}
        />
      )}

      {isFacultyOrTA && (
        <AssignmentEditor
          show={show}
          handleClose={handleClose}
          dialogTitle="Edit Assignment"
          formData={formData}
          setFormData={setFormData}
          funcAssignment={handleUpdateAssignment}
        />
      )}

      {isFacultyOrTA && (
        <ConfirmModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Delete Assignment"
          message={`Are you sure you want to remove "${formData?.title}"?`}
          confirmLabel="Yes, Delete"
          variant="danger"
        />
      )}

      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3 bold" />
            <span className="fw-bold">ASSIGNMENTS </span>
            {isFacultyOrTA && <AssignmentControlButtons />}
          </div>

          <ListGroup className="wd-assignment-list rounded-0">
            {currAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment p-3 ps-1 d-flex"
                onClick={isFacultyOrTA ? () => handleEditClick(assignment) : undefined}
                style={{ cursor: isFacultyOrTA ? "pointer" : "default" }}
              >
                <BsGripVertical className="me-2 fs-3 flex-shrink-0" />

                <div className="d-flex justify-content-between align-items-start w-100">
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

                  {isFacultyOrTA && (
                    <SingleAssignmentControlButton
                      setFormData={setFormData}
                      setShowDeleteModal={setShowDeleteModal}
                      assignment={assignment}
                    />
                  )}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
