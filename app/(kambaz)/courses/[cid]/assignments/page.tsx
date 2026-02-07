import Link from "next/link";
import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
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
            {/* List Item 1 */}
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
              {/* Added d-flex and justify-content-between here */}
              <div className="d-flex justify-content-between align-items-start w-100">
                {/* Left side content (Link and Description) */}
                <div>
                  <Link
                    href="/courses/1234/assignments/123"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A1 - ENV + HTML
                  </Link>{" "}
                  {/* Inlined description for A1 */}
                  <div id="wd-assignment-desc" className="small mt-1">
                    <span className="text-danger fw-normal">
                      Multiple Modules
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Not available until </span>
                    <span className="text-dark fw-normal">
                      May 6 at 12:00am
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Due </span>
                    <span className="text-dark fw-normal">
                      May 13 at 11:59pm
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-semibold">100 pts</span>
                  </div>
                </div>
                {/* Right side content (Buttons) */}
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            {/* List Item 2 */}
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
              <div className="d-flex justify-content-between align-items-start w-100">
                <div>
                  <Link
                    href="/courses/1234/assignments/124"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>{" "}
                  <div id="wd-assignment-desc" className="small mt-1">
                    <span className="text-danger fw-normal">
                      Multiple Modules
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Not available until </span>
                    <span className="text-dark fw-normal">
                      May 6 at 12:00am
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Due </span>
                    <span className="text-dark fw-normal">
                      May 13 at 11:59pm
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-semibold">100 pts</span>
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            {/* List Item 3 */}
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex">
              <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
              <div className="d-flex justify-content-between align-items-start w-100">
                <div>
                  <Link
                    href="/courses/1234/assignments/125"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>{" "}
                  <div id="wd-assignment-desc" className="small mt-1">
                    <span className="text-danger fw-normal">
                      Multiple Modules
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Not available until </span>
                    <span className="text-dark fw-normal">
                      May 6 at 12:00am
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="fw-semibold">Due </span>
                    <span className="text-dark fw-normal">
                      May 13 at 11:59pm
                    </span>
                    <span className="text-muted"> | </span>
                    <span className="text-muted fw-semibold">100 pts</span>
                  </div>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
