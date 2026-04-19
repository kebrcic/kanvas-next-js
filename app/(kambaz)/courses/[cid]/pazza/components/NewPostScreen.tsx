/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addPost, setSelectedPostId, setShowNewPost } from "../reducer";
import * as pazzaClient from "../client";
import * as courseClient from "../../../client";
import { Button, Form, FormControl, FormCheck, FormSelect } from "react-bootstrap";
import RichTextEditor from "./RichTextEditor";
import Link from "next/link";

export default function NewPostScreen() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();

  const { folders } = useSelector((state: RootState) => state.pazzaReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: any;
  };

  const [postType, setPostType] = useState<"Question" | "Note">("Question");
  const [postTo, setPostTo] = useState<"Entire Class" | "Individual">("Entire Class");
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [visibleTo, setVisibleTo] = useState<string[]>([]);
  const [courseUsers, setCourseUsers] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (postTo === "Individual") {
      courseClient.findUsersForCourse(courseId).then(setCourseUsers).catch(console.error);
    }
  }, [postTo, courseId]);

  const toggleFolder = (folderId: string) => {
    setSelectedFolders((prev) =>
      prev.includes(folderId) ? prev.filter((f) => f !== folderId) : [...prev, folderId],
    );
  };

  const toggleVisibleTo = (userId: string) => {
    setVisibleTo((prev) =>
      prev.includes(userId) ? prev.filter((u) => u !== userId) : [...prev, userId],
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!summary.trim()) errs.summary = "Summary is required";
    if (summary.length > 100) errs.summary = "Summary must be 100 characters or less";
    if (!details.trim() || details === "<p><br></p>") errs.details = "Details are required";
    if (selectedFolders.length === 0) errs.folders = "At least one folder is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const post = await pazzaClient.createPost(courseId, {
        type: postType,
        summary: summary.trim(),
        details,
        postTo: postTo === "Entire Class" ? "Entire Class" : "Individual",
        visibleTo: postTo === "Individual" ? visibleTo : [],
        folders: selectedFolders,
      });
      dispatch(addPost(post));
      dispatch(setSelectedPostId(post._id));
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create post. Please try again.";
      const lower = message.toLowerCase();
      const fieldErrs: Record<string, string> = {};
      if (lower.includes("details")) fieldErrs.details = message;
      else if (lower.includes("folder")) fieldErrs.folders = message;
      else if (lower.includes("summary")) fieldErrs.summary = message;
      else fieldErrs.submit = message;
      setErrors(fieldErrs);
    }
  };

  const handleCancel = () => {
    dispatch(setShowNewPost(false));
  };

  return (
    <div className="p-3">
      <h5>New Post</h5>

      {/* Post Type Tabs */}
      <div className="d-flex gap-2 mb-3">
        <Button
          size="sm"
          className={postType === "Question" ? "text-white" : ""}
          style={postType === "Question"
            ? { backgroundColor: "#4a90b8", borderColor: "#4a90b8" }
            : { color: "#4a90b8", borderColor: "#4a90b8", backgroundColor: "transparent" }}
          onClick={() => setPostType("Question")}
        >
          Question
        </Button>
        <Button
          size="sm"
          className={postType === "Note" ? "text-white" : ""}
          style={postType === "Note"
            ? { backgroundColor: "#4a90b8", borderColor: "#4a90b8" }
            : { color: "#4a90b8", borderColor: "#4a90b8", backgroundColor: "transparent" }}
          onClick={() => setPostType("Note")}
        >
          Note
        </Button>
      </div>

      {/* Post To */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Post To</Form.Label>
        <div className="d-flex gap-3">
          <FormCheck
            type="radio"
            label="Entire Class"
            checked={postTo === "Entire Class"}
            onChange={() => setPostTo("Entire Class")}
          />
          <FormCheck
            type="radio"
            label="Individual Students/Instructors"
            checked={postTo === "Individual"}
            onChange={() => setPostTo("Individual")}
          />
        </div>
      </Form.Group>

      {/* User selection for Individual */}
      {postTo === "Individual" && (
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Visible To</Form.Label>
          <div className="border rounded p-2" style={{ maxHeight: 150, overflowY: "auto" }}>
            {courseUsers.map((user: any) => (
              <FormCheck
                key={user._id}
                label={`${user.firstName} ${user.lastName} (${user.role})`}
                checked={visibleTo.includes(user._id)}
                onChange={() => toggleVisibleTo(user._id)}
              />
            ))}
          </div>
        </Form.Group>
      )}

      {/* Select Folders */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Select Folder(s)</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {folders.map((folder: any) => (
            <FormCheck
              key={folder._id}
              label={folder.name}
              checked={selectedFolders.includes(folder._id)}
              onChange={() => toggleFolder(folder._id)}
            />
          ))}
        </div>
        {errors.folders && <div className="text-danger small mt-1">{errors.folders}</div>}
        <Link
          href={`/courses/${courseId}/pazza/manage-class`}
          className="small"
        >
          Manage and reorder folders
        </Link>
      </Form.Group>

      {/* Summary */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Summary</Form.Label>
        <FormControl
          placeholder="Enter a brief summary (max 100 characters)"
          maxLength={100}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <div className="text-muted small">{summary.length}/100</div>
        {errors.summary && <div className="text-danger small">{errors.summary}</div>}
      </Form.Group>

      {/* Details */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Details</Form.Label>
        <RichTextEditor
          value={details}
          onChange={setDetails}
          placeholder="Provide details about your question or note..."
        />
        {errors.details && <div className="text-danger small mt-1">{errors.details}</div>}
      </Form.Group>

      {/* Actions */}
      <div className="d-flex gap-2">
        <Button className="text-white" style={{ backgroundColor: "#4a90b8", borderColor: "#4a90b8" }} onClick={handleSubmit}>
          {postType === "Question" ? "Post My Question" : "Post My Note"}
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      {errors.submit && <div className="text-danger small mt-2">{errors.submit}</div>}
    </div>
  );
}
