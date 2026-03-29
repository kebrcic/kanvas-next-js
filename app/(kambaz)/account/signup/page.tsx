/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/account/profile");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <button onClick={signup} id="wd-signin-btn" className="btn btn-primary w-100 mb-2">
        Sign up{" "}
      </button>
      <br />
      <Link id="wd-signin-link" href="/account/signin">
        Sign in
      </Link>
    </div>
  );
}
