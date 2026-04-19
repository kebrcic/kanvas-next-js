/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedPostId, setShowNewPost, setSearchQuery, toggleSidebar } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

function groupPostsByDate(posts: any[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const lastWeekStart = new Date(today.getTime() - 7 * 86400000);

  const groups: { label: string; posts: any[] }[] = [];
  const todayPosts: any[] = [];
  const yesterdayPosts: any[] = [];
  const lastWeekPosts: any[] = [];
  const olderBuckets: Record<string, any[]> = {};

  for (const post of posts) {
    const created = new Date(post.createdAt);
    const createdDay = new Date(created.getFullYear(), created.getMonth(), created.getDate());

    if (createdDay.getTime() >= today.getTime()) {
      todayPosts.push(post);
    } else if (createdDay.getTime() >= yesterday.getTime()) {
      yesterdayPosts.push(post);
    } else if (createdDay.getTime() >= lastWeekStart.getTime()) {
      lastWeekPosts.push(post);
    } else {
      const day = createdDay.getDay();
      const monday = new Date(createdDay.getTime() - ((day === 0 ? 6 : day - 1) * 86400000));
      const sunday = new Date(monday.getTime() + 6 * 86400000);
      const label = `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
      if (!olderBuckets[label]) olderBuckets[label] = [];
      olderBuckets[label].push(post);
    }
  }

  if (todayPosts.length > 0) groups.push({ label: "Today", posts: todayPosts });
  if (yesterdayPosts.length > 0) groups.push({ label: "Yesterday", posts: yesterdayPosts });
  if (lastWeekPosts.length > 0) groups.push({ label: "Last Week", posts: lastWeekPosts });

  const sortedKeys = Object.keys(olderBuckets).sort((a, b) => {
    const dateA = new Date(olderBuckets[a][0].createdAt);
    const dateB = new Date(olderBuckets[b][0].createdAt);
    return dateB.getTime() - dateA.getTime();
  });
  for (const key of sortedKeys) {
    groups.push({ label: key, posts: olderBuckets[key] });
  }

  return groups;
}

function stripHtml(html: string) {
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (div) {
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }
  return html.replace(/<[^>]*>/g, "");
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHrs = Math.floor(diffMs / 3600000);
  if (diffHrs < 1) return "just now";
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

export default function ListOfPosts() {
  const dispatch = useDispatch();
  const { posts, selectedPostId, showSidebar, searchQuery, postFollowupStatus } = useSelector(
    (state: RootState) => state.pazzaReducer,
  );

  if (!showSidebar) {
    return (
      <div className="border-end p-2" style={{ width: 30 }}>
        <FaCaretRight
          className="cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(toggleSidebar())}
        />
      </div>
    );
  }

  const groups = groupPostsByDate(posts);

  return (
    <div className="border-end d-flex flex-column" style={{ width: 320, minWidth: 320 }}>
      {/* Controls */}
      <div className="p-2 border-bottom">
        <div className="d-flex align-items-center mb-2">
          <FaCaretLeft
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(toggleSidebar())}
            className="me-2"
          />
        </div>
        <div className="d-flex gap-2 mb-2">
          <Button
            size="sm"
            className="flex-fill text-white"
            style={{ backgroundColor: "#4a90b8", borderColor: "#4a90b8" }}
            onClick={() => dispatch(setShowNewPost(true))}
          >
            New Post
          </Button>
        </div>
        <FormControl
          size="sm"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      {/* Post list */}
      <div className="overflow-auto flex-fill">
        {groups.length === 0 && (
          <div className="text-muted text-center p-3">No posts yet</div>
        )}
        {groups.map((group) => (
          <div key={group.label}>
            <div className="px-2 py-1 bg-light fw-bold small text-muted border-bottom">
              {group.label}
            </div>
            {group.posts.map((post: any) => {
              const isSelected = post._id === selectedPostId;
              const preview = stripHtml(post.details || "").slice(0, 120);
              const isQuestion = post.type === "Question";
              const fStatus = postFollowupStatus[post._id];
              return (
                <div
                  key={post._id}
                  className="px-2 py-2 border-bottom"
                  style={{ cursor: "pointer", backgroundColor: isSelected ? "#4a90b833" : "transparent" }}
                  onClick={() => dispatch(setSelectedPostId(post._id))}
                >
                  <div className="d-flex align-items-center gap-1 mb-1">
                    <span
                      className="badge fw-bold"
                      style={{
                        backgroundColor: isQuestion ? "#e08a2c" : "#4a90b8",
                        fontSize: "0.65rem",
                        minWidth: 18,
                      }}
                    >
                      {isQuestion ? "Q" : "N"}
                    </span>
                    {fStatus && fStatus !== "none" && (
                      <span
                        className="badge fw-bold"
                        style={{
                          backgroundColor: fStatus === "resolved" ? "#28a745" : "#dc3545",
                          fontSize: "0.6rem",
                        }}
                      >
                        {fStatus === "resolved" ? "resolved" : "unresolved"}
                      </span>
                    )}
                    <span className="fw-bold small text-truncate">{post.summary}</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                    {post.authorRole === "FACULTY" || post.authorRole === "ADMIN"
                      ? "Instructor"
                      : "Student"}
                    {" · "}
                    {formatTime(post.createdAt)}
                  </div>
                  <div
                    className="text-muted small"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {preview}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
