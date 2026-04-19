/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function ClassAtGlance() {
  const { stats } = useSelector((state: RootState) => state.pazzaReducer);

  if (!stats) {
    return <div className="p-4 text-muted">Loading stats...</div>;
  }

  return (
    <div className="p-4">
      <h4 className="mb-4">Class at a Glance</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title" style={{ color: "#4a90b8" }}>{stats.unreadCount}</h5>
              <p className="card-text text-muted">
                {stats.unreadCount === 0 ? "No unread posts" : "Unread Posts"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">{stats.unansweredCount}</h5>
              <p className="card-text text-muted">
                {stats.unansweredCount === 0 ? "No unanswered posts" : "Unanswered Posts"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">{stats.totalPosts}</h5>
              <p className="card-text text-muted">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-success">{stats.instructorResponseCount}</h5>
              <p className="card-text text-muted">Instructor Responses</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title text-info">{stats.studentResponseCount}</h5>
              <p className="card-text text-muted">Student Responses</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">{stats.enrolledStudentCount}</h5>
              <p className="card-text text-muted">Students Enrolled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
