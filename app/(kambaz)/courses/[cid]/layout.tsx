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
import * as courseClient from "../../courses/client";

export default function CoursesLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const { cid } = useParams();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: { _id: string } | null;
  };

  const course = courses.find((course: any) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const myCourses = await courseClient.findMyCourses();
        const enrolled = myCourses.some((c: any) => c && c._id === cid);
        setIsEnrolled(enrolled);
        if (currentUser && !enrolled) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser) {
      checkEnrollment();
    }
  }, [currentUser, cid, router]);

  if (isEnrolled === null || !isEnrolled) return null;

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
