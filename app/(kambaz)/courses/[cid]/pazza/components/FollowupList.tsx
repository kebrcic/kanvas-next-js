/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addFollowup } from "../reducer";
import * as pazzaClient from "../client";
import { Button, FormControl } from "react-bootstrap";
import FollowupDiscussion from "./FollowupDiscussion";

export default function FollowupList({ postId }: { postId: string }) {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();

  const { currentPostFollowups } = useSelector((state: RootState) => state.pazzaReducer);
  const [newFollowup, setNewFollowup] = useState("");

  const handleStartFollowup = async () => {
    if (!newFollowup.trim()) return;
    try {
      const followup = await pazzaClient.createFollowup(courseId, postId, newFollowup);
      dispatch(addFollowup(followup));
      setNewFollowup("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h6 className="fw-bold border-bottom pb-2">Followup Discussions</h6>

      {currentPostFollowups.length === 0 && (
        <p className="text-muted small">No followup discussions yet.</p>
      )}

      {currentPostFollowups.map((followup: any) => (
        <FollowupDiscussion key={followup._id} followup={followup} />
      ))}

      <div className="d-flex gap-2 mt-3">
        <FormControl
          placeholder="Start a new followup discussion..."
          value={newFollowup}
          onChange={(e) => setNewFollowup(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleStartFollowup();
            }
          }}
        />
        <Button onClick={handleStartFollowup}>Post</Button>
      </div>
    </div>
  );
}
