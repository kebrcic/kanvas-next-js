/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import * as client from "./client";
import * as courseClient from "../courses/client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { setEnrollments } from "../enrollments/reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
      const enrollments = await courseClient.findEnrollmentsForUser();
      dispatch(setEnrollments(enrollments));
    } catch (err: any) {
      console.error(err);
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
}
