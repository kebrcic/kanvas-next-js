/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import {
  updatePost,
  removePost,
  setSelectedPostId,
  setPosts,
  setCurrentPostAnswers,
  setCurrentPostFollowups,
  setPostFollowupStatus,
} from "../reducer";
import * as pazzaClient from "../client";
import { Button, Dropdown } from "react-bootstrap";
import RichTextEditor from "./RichTextEditor";
import { FormControl, Form } from "react-bootstrap";
import AnswerSection from "./AnswerSection";
import FollowupList from "./FollowupList";

export default function ViewPost() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();

  const { posts, selectedPostId, folders } = useSelector(
    (state: RootState) => state.pazzaReducer,
  );
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: any;
  };

  const post = posts.find((p: any) => p._id === selectedPostId);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const canEdit = isFaculty || post?.author === currentUser?._id;

  const [editing, setEditing] = useState(false);
  const [editSummary, setEditSummary] = useState("");
  const [editDetails, setEditDetails] = useState("");

  useEffect(() => {
    if (!selectedPostId) return;
    const loadPostData = async () => {
      try {
        // Fetch the post (marks as read)
        await pazzaClient.fetchPost(courseId, selectedPostId);
        // Fetch answers and followups
        const [answers, followups] = await Promise.all([
          pazzaClient.fetchAnswers(courseId, selectedPostId),
          pazzaClient.fetchFollowups(courseId, selectedPostId),
        ]);
        dispatch(setCurrentPostAnswers(answers));
        dispatch(setCurrentPostFollowups(followups));
        // Compute followup resolution status for this post
        if (followups.length === 0) {
          dispatch(setPostFollowupStatus({ postId: selectedPostId, status: "none" }));
        } else {
          const allResolved = followups.every((f: any) => f.resolved);
          dispatch(setPostFollowupStatus({ postId: selectedPostId, status: allResolved ? "resolved" : "unresolved" }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadPostData();
  }, [courseId, selectedPostId, dispatch]);

  if (!post) return <div className="p-4 text-muted">Post not found.</div>;

  const postFolders = folders
    .filter((f: any) => post.folders?.includes(f._id))
    .map((f: any) => f.name);

  const handleEdit = async () => {
    try {
      await pazzaClient.updatePost(courseId, post._id, {
        summary: editSummary,
        details: editDetails,
      });
      // Re-fetch posts to ensure state is fully in sync
      const freshPosts = await pazzaClient.fetchPosts(courseId);
      dispatch(setPosts(freshPosts));
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await pazzaClient.deletePost(courseId, post._id);
      dispatch(removePost(post._id));
      dispatch(setSelectedPostId(null));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-3 overflow-auto">
      {/* Post header */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            {postFolders.map((name: string) => (
              <span key={name} className="badge" style={{ backgroundColor: "#6c757d" }}>{name}</span>
            ))}
            <span
              className="badge"
              style={{ backgroundColor: post.type === "Question" ? "#e08a2c" : "#4a90b8" }}
            >
              {post.type === "Question" ? "Q" : "N"} {post.type}
            </span>
          </div>
          {editing ? (
            <FormControl
              className="mb-2"
              value={editSummary}
              maxLength={100}
              onChange={(e) => setEditSummary(e.target.value)}
            />
          ) : (
            <h5 className="fw-bold mb-1">{post.summary}</h5>
          )}
          <div className="text-muted small">
            Posted by <span className="fw-bold">{post.authorName}</span>
            {" · "}
            {new Date(post.createdAt).toLocaleString()}
            {" · "}
            {post.viewCount ?? 0} view{(post.viewCount ?? 0) === 1 ? "" : "s"}
          </div>
        </div>
        {canEdit && (
          <div className="d-flex gap-2">
            {!editing && (
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => {
                  setEditing(true);
                  setEditSummary(post.summary);
                  setEditDetails(post.details);
                }}
              >
                Edit
              </Button>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="link" size="sm" className="text-muted p-0">
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setEditing(true);
                    setEditSummary(post.summary);
                    setEditDetails(post.details);
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={handleDelete}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>

      {/* Post body */}
      {editing ? (
        <div className="mb-3">
          <RichTextEditor value={editDetails} onChange={setEditDetails} />
          <div className="d-flex gap-2 mt-2">
            <Button size="sm" onClick={handleEdit}>Save</Button>
            <Button size="sm" variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-4" dangerouslySetInnerHTML={{ __html: post.details }} />
      )}

      <hr />

      {/* Answers (only for Questions) */}
      {post.type === "Question" && (
        <>
          <AnswerSection postId={post._id} />
          <hr />
        </>
      )}

      {/* Followup Discussions */}
      <FollowupList postId={post._id} />
    </div>
  );
}
