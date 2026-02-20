/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
'use client';
import Link from "next/link";
import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as db from '../../../database';
import { useParams } from "next/navigation"; 

export default function Assignments() {
  //get the cid
  const {cid} = useParams();
  //filter corresponding assignments based on cid
  const assignments = db.assignments;
  const currAssignments = assignments.filter((asgmt) => asgmt.course === cid);

  return (
    <div>
      <AssignmentsControls />
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
              <ListGroupItem className="wd-assignment p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
              {/* Added d-flex and justify-content-between here */}
              <div className="d-flex justify-content-between align-items-start w-100">
                {/* Left side content (Link and Description) */}
                <div>
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <div id="wd-assignment-desc" className="small mt-1">
                    <span className="text-danger fw-normal">
                      Multiple Modules
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Not available until </span>
                    <span className="text-dark fw-normal">
                      {assignment.available_date}
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Due </span>
                    <span className="text-dark fw-normal">
                      {assignment.due_date}
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-semibold">{`${assignment.points} pts`}</span>
                  </div>
                </div>
                {/* Right side content (Buttons) */}
                <LessonControlButtons />
              </div>
            </ListGroupItem>
            ))
            }
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
