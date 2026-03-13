/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */

"use client";
import { useState } from "react";
import Link from "next/link";

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, updateCourse, deleteCourse } from "../courses/reducer";
import { RootState } from "../store";
import { addEnrollment, deleteEnrollment } from "../enrollments/reducer";
export default function Dashboard() {
  // const courses = db.courses;
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: { _id: string; role?: string } | null;
  };
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "bg2.jpg",
    description: "New Description",
  });

  const isFacultyOrTA = currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (enrollment: any) =>
        currentUser && enrollment.user === currentUser._id && enrollment.course === courseId,
    );

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((course: any) => isEnrolled(course._id));

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          id="wd-dashboard-enrollments"
          className="btn-primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </Button>
      </div>

      <hr />
      {isFacultyOrTA && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>

          <br />

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />

          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => {
            const enrolled = isEnrolled(course._id);

            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={enrolled ? `/courses/${course._id}/home` : "/dashboard"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src={`/images/${course.image}`}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>

                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>

                      <Button variant="primary">Go</Button>

                      {showAllCourses &&
                        currentUser &&
                        (enrolled ? (
                          <button
                            className="btn btn-danger float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                deleteEnrollment({
                                  user: currentUser._id,
                                  course: course._id,
                                }),
                              );
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                addEnrollment({
                                  user: currentUser._id,
                                  course: course._id,
                                }),
                              );
                            }}
                          >
                            Enroll
                          </button>
                        ))}

                      {isFacultyOrTA && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              if (course._id) {
                                dispatch(deleteCourse(course._id));
                              }
                            }}
                            className="btn btn-danger float-end ms-2"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>

                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
