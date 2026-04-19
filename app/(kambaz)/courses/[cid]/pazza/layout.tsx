/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import Link from "next/link";
import { resetPazza, setFolders, setSelectedPostId, setShowNewPost } from "./reducer";
import * as pazzaClient from "./client";

export default function PazzaLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: any;
  };
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((c: any) => c._id === courseId);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isQA = pathname.endsWith("/pazza") || pathname.includes("/pazza?");
  const isManageClass = pathname.includes("/manage-class");

  useEffect(() => {
    if (!courseId) return;
    dispatch(resetPazza());
    const loadFolders = async () => {
      try {
        let folders = await pazzaClient.fetchFolders(courseId);
        if ((!folders || folders.length === 0) && isFaculty) {
          try {
            folders = await pazzaClient.createDefaultFolders(courseId);
          } catch {
            folders = [];
          }
        }
        dispatch(setFolders(folders || []));
      } catch {
        dispatch(setFolders([]));
      }
    };
    loadFolders();
  }, [courseId, dispatch, isFaculty]);

  const userName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "";

  return (
    <div className="d-flex flex-column h-100">
      {/* Pazza Navigation Bar (PNB) */}
      <nav className="d-flex align-items-center justify-content-between px-3 py-2 text-white"
           style={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: "#4a90b8" }}>
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold fs-5">pazza</span>
          <span className="fs-6">{course?.number || course?.name || courseId}</span>
          <div className="d-flex gap-2 ms-3">
            <Link
              href={`/courses/${courseId}/pazza`}
              className={`text-white text-decoration-none px-2 py-1 ${isQA ? "fw-bold border-bottom border-white border-2" : ""}`}
              onClick={() => {
                dispatch(setSelectedPostId(null));
                dispatch(setShowNewPost(false));
              }}
            >
              Q&A
            </Link>
            {isFaculty && (
              <Link
                href={`/courses/${courseId}/pazza/manage-class`}
                className={`text-white text-decoration-none px-2 py-1 ${isManageClass ? "fw-bold border-bottom border-white border-2" : ""}`}
              >
                Manage Class
              </Link>
            )}
          </div>
        </div>
        <span className="fs-6">{userName}</span>
      </nav>

      {/* Page content */}
      <div className="flex-fill overflow-auto">
        {children}
      </div>
    </div>
  );
}
