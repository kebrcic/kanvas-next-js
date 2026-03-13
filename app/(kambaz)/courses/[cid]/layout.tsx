/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../database";
import Breadcrumb from "./Breadcrumb";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export default function CoursesLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNavigation(!showNavigation)}
        />
        {course?.name}
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {/* 4. Conditionally render or hide the navigation based on state */}
        {showNavigation && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
