/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAnswer, updateAnswer, removeAnswer } from "../reducer";
import * as pazzaClient from "../client";
import { Button, Dropdown } from "react-bootstrap";
import RichTextEditor from "./RichTextEditor";

export default function AnswerSection({ postId }: { postId: string }) {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();

  const { currentPostAnswers } = useSelector((state: RootState) => state.pazzaReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: any;
  };

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const studentAnswers = currentPostAnswers.filter((a: any) => a.answerType === "student");
  const instructorAnswers = currentPostAnswers.filter((a: any) => a.answerType === "instructor");

  const [studentDraft, setStudentDraft] = useState("");
  const [instructorDraft, setInstructorDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const canEditAnswer = (answer: any) =>
    isFaculty || answer.author === currentUser?._id;

  const handlePostAnswer = async (content: string, clearFn: () => void) => {
    if (!content.trim() || content === "<p><br></p>") return;
    try {
      const answer = await pazzaClient.createAnswer(courseId, postId, content);
      dispatch(addAnswer(answer));
      clearFn();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleEditAnswer = async (answerId: string) => {
    if (!editContent.trim() || editContent === "<p><br></p>") return;
    try {
      const updated = await pazzaClient.updateAnswer(courseId, answerId, editContent);
      dispatch(updateAnswer(updated));
      setEditingId(null);
      setEditContent("");
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    try {
      await pazzaClient.deleteAnswer(courseId, answerId);
      dispatch(removeAnswer(answerId));
    } catch (err: any) {
      console.error(err);
    }
  };

  const renderAnswer = (answer: any) => (
    <div key={answer._id} className="border rounded p-3 mb-2">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <span className="fw-bold">{answer.authorName}</span>
          <span className="text-muted small ms-2">
            {new Date(answer.createdAt).toLocaleString()}
          </span>
        </div>
        {canEditAnswer(answer) && (
          <Dropdown>
            <Dropdown.Toggle variant="link" size="sm" className="text-muted p-0">
              Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setEditingId(answer._id);
                  setEditContent(answer.content);
                }}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteAnswer(answer._id)}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      {editingId === answer._id ? (
        <div>
          <RichTextEditor value={editContent} onChange={setEditContent} />
          <div className="d-flex gap-2 mt-2">
            <Button size="sm" onClick={() => handleEditAnswer(answer._id)}>
              Save
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setEditingId(null);
                setEditContent("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: answer.content }} />
      )}
    </div>
  );

  const showStudentEditor = !isFaculty && studentAnswers.length === 0;
  const showInstructorEditor = isFaculty && instructorAnswers.length === 0;

  return (
    <div>
      {/* Student's Answers */}
      <div className="mb-4">
        <h6 className="fw-bold border-bottom pb-2">Student&apos;s Answers</h6>
        {studentAnswers.length > 0 ? (
          studentAnswers.map(renderAnswer)
        ) : (
          <p className="text-muted small">No student answers yet.</p>
        )}
        {showStudentEditor && (
          <div className="mt-2">
            <RichTextEditor
              value={studentDraft}
              onChange={setStudentDraft}
              placeholder="Write your answer..."
            />
            <Button
              size="sm"
              className="mt-2"
              onClick={() => handlePostAnswer(studentDraft, () => setStudentDraft(""))}
            >
              Submit Answer
            </Button>
          </div>
        )}
      </div>

      {/* Instructor's Answers */}
      <div className="mb-4">
        <h6 className="fw-bold border-bottom pb-2">Instructor&apos;s Answers</h6>
        {instructorAnswers.length > 0 ? (
          instructorAnswers.map(renderAnswer)
        ) : (
          <p className="text-muted small">No instructor answers yet.</p>
        )}
        {showInstructorEditor && (
          <div className="mt-2">
            <RichTextEditor
              value={instructorDraft}
              onChange={setInstructorDraft}
              placeholder="Write your answer..."
            />
            <Button
              size="sm"
              className="mt-2"
              onClick={() => handlePostAnswer(instructorDraft, () => setInstructorDraft(""))}
            >
              Submit Answer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
