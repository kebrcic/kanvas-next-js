/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as client from "../../../account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FormControl, FormSelect } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, email, firstName, lastName, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  useEffect(() => {
    if (user) {
      setName(`${user.firstName} ${user.lastName}`);
      setEmail(user.email || "");
      setRole(user.role || "");
    }
  }, [user]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)} className="float-end fs-5 mt-2 wd-edit" />
        )}
        {editing && (
          <FaCheck onClick={() => saveUser()} className="float-end fs-5 mt-2 me-2 wd-save" />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <>
            <FormControl
              className="w-50 wd-edit-name"
              defaultValue={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
          </>
        )}
      </div>
      <b>Roles:</b>{" "}
      {editing ? (
        <FormSelect
          className="w-50 d-inline wd-edit-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="FACULTY">FACULTY</option>
          <option value="TA">TA</option>
        </FormSelect>
      ) : (
        <span className="wd-roles"> {user.role} </span>
      )}
      <br />
      <b>Email:</b>{" "}
      {editing ? (
        <FormControl
          className="w-50 d-inline wd-edit-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveUser();
          }}
        />
      ) : (
        <span className="wd-email-id"> {user.email} </span>
      )}
      <br />
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span> <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span> <br />
      <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete">
        {" "}
        Delete{" "}
      </button>
      <button onClick={onClose} className="btn btn-secondary float-end me-2 wd-cancel">
        {" "}
        Cancel{" "}
      </button>
    </div>
  );
}
