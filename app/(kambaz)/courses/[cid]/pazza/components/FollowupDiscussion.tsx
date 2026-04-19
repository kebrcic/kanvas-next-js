/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import {
  updateFollowup,
  removeFollowup,
  setFollowupReplies,
  addReply,
  updateReply as updateReplyAction,
  removeReply,
  setPostFollowupStatus,
} from "../reducer";
import * as pazzaClient from "../client";
import { Button, Dropdown, FormControl } from "react-bootstrap";

export default function FollowupDiscussion({ followup }: { followup: any }) {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: any;
  };
  const { followupReplies, currentPostFollowups, selectedPostId } = useSelector(
    (state: RootState) => state.pazzaReducer,
  );

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  // Read live followup from Redux so resolved toggle updates immediately
  const liveFollowup = currentPostFollowups.find((f: any) => f._id === followup._id) || followup;
  const replies = followupReplies[followup._id] || [];

  const [replyText, setReplyText] = useState("");
  const [editingFollowup, setEditingFollowup] = useState(false);
  const [editFollowupContent, setEditFollowupContent] = useState(followup.content);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");

  const canEditFollowup = isFaculty || liveFollowup.author === currentUser?._id;

  useEffect(() => {
    const loadReplies = async () => {
      try {
        const data = await pazzaClient.fetchReplies(courseId, followup._id);
        dispatch(setFollowupReplies({ followupId: followup._id, replies: data }));
      } catch (err) {
        console.error(err);
      }
    };
    loadReplies();
  }, [courseId, followup._id, dispatch]);

  const handleToggleResolved = async () => {
    try {
      const updated = await pazzaClient.updateFollowup(courseId, followup._id, {
        resolved: !liveFollowup.resolved,
      });
      dispatch(updateFollowup(updated));
      // Recompute post followup status
      if (selectedPostId) {
        const updatedFollowups = currentPostFollowups.map((f: any) =>
          f._id === updated._id ? updated : f,
        );
        const allResolved = updatedFollowups.every((f: any) => f.resolved);
        dispatch(setPostFollowupStatus({
          postId: selectedPostId,
          status: allResolved ? "resolved" : "unresolved",
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFollowup = async () => {
    if (!editFollowupContent.trim()) return;
    try {
      const updated = await pazzaClient.updateFollowup(courseId, followup._id, {
        content: editFollowupContent,
      });
      dispatch(updateFollowup(updated));
      setEditingFollowup(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFollowup = async () => {
    try {
      await pazzaClient.deleteFollowup(courseId, followup._id);
      dispatch(removeFollowup(followup._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReply = async () => {
    if (!replyText.trim()) return;
    try {
      const reply = await pazzaClient.createReply(courseId, followup._id, replyText);
      dispatch(addReply({ followupId: followup._id, reply }));
      setReplyText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditReply = async (replyId: string) => {
    if (!editReplyContent.trim()) return;
    try {
      const updated = await pazzaClient.updateReply(courseId, replyId, editReplyContent);
      dispatch(updateReplyAction({ followupId: followup._id, reply: updated }));
      setEditingReplyId(null);
      setEditReplyContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      await pazzaClient.deleteReply(courseId, replyId);
      dispatch(removeReply({ followupId: followup._id, replyId }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border rounded p-3 mb-2">
      {/* Followup header */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <span className="fw-bold">{liveFollowup.authorName}</span>
          <span className="text-muted small ms-2">
            {new Date(liveFollowup.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button
            size="sm"
            variant={liveFollowup.resolved ? "success" : "outline-warning"}
            onClick={handleToggleResolved}
          >
            {liveFollowup.resolved ? "Resolved" : "Unresolved"}
          </Button>
          {canEditFollowup && (
            <Dropdown>
              <Dropdown.Toggle variant="link" size="sm" className="text-muted p-0">
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setEditingFollowup(true);
                    setEditFollowupContent(liveFollowup.content);
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={handleDeleteFollowup}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>

      {/* Followup content */}
      {editingFollowup ? (
        <div className="mb-2">
          <FormControl
            as="textarea"
            rows={2}
            value={editFollowupContent}
            onChange={(e) => setEditFollowupContent(e.target.value)}
          />
          <div className="d-flex gap-2 mt-1">
            <Button size="sm" onClick={handleEditFollowup}>Save</Button>
            <Button size="sm" variant="secondary" onClick={() => setEditingFollowup(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="mb-2">{liveFollowup.content}</p>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <div className="ms-3 border-start ps-3">
          {replies.map((reply: any) => {
            const canEditReply = isFaculty || reply.author === currentUser?._id;
            return (
              <div key={reply._id} className="mb-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="fw-bold small">{reply.authorName}</span>
                    <span className="text-muted small ms-2">
                      {new Date(reply.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {canEditReply && (
                    <Dropdown>
                      <Dropdown.Toggle variant="link" size="sm" className="text-muted p-0">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            setEditingReplyId(reply._id);
                            setEditReplyContent(reply.content);
                          }}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => handleDeleteReply(reply._id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
                {editingReplyId === reply._id ? (
                  <div className="mt-1">
                    <FormControl
                      as="textarea"
                      rows={2}
                      value={editReplyContent}
                      onChange={(e) => setEditReplyContent(e.target.value)}
                    />
                    <div className="d-flex gap-2 mt-1">
                      <Button size="sm" onClick={() => handleEditReply(reply._id)}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setEditingReplyId(null);
                          setEditReplyContent("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="small mb-1">{reply.content}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reply input */}
      <div className="d-flex gap-2 mt-2">
        <FormControl
          size="sm"
          placeholder="Reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddReply();
            }
          }}
        />
        <Button size="sm" onClick={handleAddReply}>
          Reply
        </Button>
      </div>
    </div>
  );
}
