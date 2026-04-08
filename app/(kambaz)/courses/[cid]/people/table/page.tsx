/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Table, Button, FormControl, FormSelect } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as courseClient from "../../../client";
import * as accountClient from "../../../../account/client";
import PeopleDetails from "../Details";
import Link from "next/link";

export default function PeopleTable({
  userss = [],
  fetchUsers,
}: {
  userss?: any[];
  fetchUsers: () => void;
}) {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
    section: "S101",
    loginId: "",
  });

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: { _id: string; role?: string } | null;
  };
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchUsersForCourse = async () => {
    try {
      const users = await courseClient.findUsersForCourse(cid as string);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsersForCourse();
  }, []);

  const resetNewUser = () => {
    setNewUser({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "STUDENT",
      section: "S101",
      loginId: "",
    });
  };

  const handleCreateUser = async () => {
    try {
      await courseClient.createUser(newUser);
      setShowAddForm(false);
      resetNewUser();
      fetchUsersForCourse();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await accountClient.updateUser(editingUser);
      setEditingUser(null);
      fetchUsersForCourse();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await courseClient.deleteUser(userId);
      fetchUsersForCourse();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}
      {isFaculty && (
        <div className="mb-3">
          <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "Add User"}
          </Button>
        </div>
      )}

      {isFaculty && showAddForm && (
        <div className="border p-3 mb-3 rounded">
          <h5>Create New User</h5>
          <div className="d-flex gap-2 mb-2">
            <FormControl
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <FormControl
              placeholder="Password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </div>
          <div className="d-flex gap-2 mb-2">
            <FormControl
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <FormControl
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
          </div>
          <div className="d-flex gap-2 mb-2">
            <FormControl
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <FormControl
              placeholder="Login ID"
              value={newUser.loginId}
              onChange={(e) => setNewUser({ ...newUser, loginId: e.target.value })}
            />
          </div>
          <div className="d-flex gap-2 mb-2">
            <FormSelect
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="TA">TA</option>
            </FormSelect>
            <FormControl
              placeholder="Section"
              value={newUser.section}
              onChange={(e) => setNewUser({ ...newUser, section: e.target.value })}
            />
          </div>
          <Button variant="success" onClick={handleCreateUser}>
            Create
          </Button>
        </div>
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {userss.map((user: any) => (
            <tr key={user._id}>
              {editingUser && editingUser._id === user._id ? (
                <>
                  <td>
                    <span
                      className="text-decoration-none"
                      onClick={() => {
                        setShowDetails(true);
                        setShowUserId(user._id);
                      }}
                    >
                      <div className="d-flex gap-1">
                        <FormControl
                          size="sm"
                          value={editingUser.firstName}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, firstName: e.target.value })
                          }
                        />
                        <FormControl
                          size="sm"
                          value={editingUser.lastName}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, lastName: e.target.value })
                          }
                        />
                      </div>
                    </span>
                  </td>
                  <td>
                    <FormControl
                      size="sm"
                      value={editingUser.loginId}
                      onChange={(e) => setEditingUser({ ...editingUser, loginId: e.target.value })}
                    />
                  </td>
                  <td>
                    <FormControl
                      size="sm"
                      value={editingUser.section}
                      onChange={(e) => setEditingUser({ ...editingUser, section: e.target.value })}
                    />
                  </td>
                  <td>
                    <FormSelect
                      size="sm"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    >
                      <option value="STUDENT">STUDENT</option>
                      <option value="FACULTY">FACULTY</option>
                      <option value="TA">TA</option>
                    </FormSelect>
                  </td>
                  <td>{user.lastActivity}</td>
                  <td>{user.totalActivity}</td>
                  <td>
                    <Button size="sm" variant="success" className="me-1" onClick={handleUpdateUser}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingUser(null)}>
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td className="wd-full-name text-nowrap">
                    <span
                      className="text-decoration-none"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowDetails(true);
                        setShowUserId(user._id);
                      }}
                    >
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </span>
                  </td>
                  <td className="wd-login-id">{user.loginId}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{user.lastActivity}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>
                  {isFaculty && (
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-1"
                        onClick={() => setEditingUser({ ...user })}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </Button>
                    </td>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
