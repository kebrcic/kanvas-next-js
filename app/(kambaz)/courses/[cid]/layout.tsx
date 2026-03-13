/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { cid } = useParams();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: { _id: string } | null;
  };
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const course = courses.find((course: any) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  const isEnrolled = enrollments.some(
    (enrollment: any) => enrollment.user === currentUser?._id && enrollment.course === cid,
  );

  useEffect(() => {
    if (currentUser && !isEnrolled) {
      router.push("/dashboard");
    }
  }, [currentUser, isEnrolled, router]);

  if (currentUser && !isEnrolled) return null;

  if (!isEnrolled) return null;

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
