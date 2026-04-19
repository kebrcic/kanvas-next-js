/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import {
  setFolders,
  addFolder,
  updateFolder as updateFolderAction,
  removeFolder,
} from "../reducer";
import * as pazzaClient from "../client";
import { Button, FormControl, FormCheck, Nav, Tab } from "react-bootstrap";

export default function ManageClassScreen() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as {
    currentUser: any;
  };
  const { folders } = useSelector((state: RootState) => state.pazzaReducer);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [newFolderName, setNewFolderName] = useState("");
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/courses/${courseId}/pazza`);
    }
  }, [isFaculty, courseId, router]);

  const handleCreateDefaults = async () => {
    try {
      const defaults = await pazzaClient.createDefaultFolders(courseId);
      dispatch(setFolders(defaults));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const folder = await pazzaClient.createFolder(courseId, newFolderName.trim());
      dispatch(addFolder(folder));
      setNewFolderName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSelected = async () => {
    for (const folderId of selectedForDelete) {
      try {
        await pazzaClient.deleteFolder(courseId, folderId);
        dispatch(removeFolder(folderId));
      } catch (err) {
        console.error(err);
      }
    }
    setSelectedForDelete([]);
  };

  const handleSaveEdit = async (folderId: string) => {
    if (!editName.trim()) return;
    try {
      const updated = await pazzaClient.updateFolder(courseId, folderId, editName.trim());
      dispatch(updateFolderAction(updated));
      setEditingId(null);
      setEditName("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSelectForDelete = (folderId: string) => {
    setSelectedForDelete((prev) =>
      prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId],
    );
  };

  if (!isFaculty) return null;

  const disabledTabs = [
    "Enrollment",
    "Class Page",
    "Class Details",
    "Polls/In-Class",
    "Chat Settings",
    "Course Actions",
  ];

  return (
    <div className="p-4">
      <h4 className="mb-3">Manage Class</h4>
      <Tab.Container defaultActiveKey="manage-folders">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="manage-folders">Manage Folders</Nav.Link>
          </Nav.Item>
          {disabledTabs.map((label) => (
            <Nav.Item key={label}>
              <Nav.Link disabled>{label}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="manage-folders">
            <h5 className="mb-3">Configure Class Folders</h5>

            {/* Create default folders */}
            {folders.length === 0 && (
              <div className="mb-3">
                <p className="text-muted">No folders configured yet.</p>
                <Button
                  style={{
                    color: "#4a90b8",
                    borderColor: "#4a90b8",
                    backgroundColor: "transparent",
                  }}
                  onClick={handleCreateDefaults}
                >
                  Create Default Folders
                </Button>
              </div>
            )}

            {/* Add new folder */}
            <div className="d-flex gap-2 mb-3">
              <FormControl
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddFolder();
                }}
              />
              <Button onClick={handleAddFolder}>Add Folder</Button>
            </div>

            {/* Delete selected */}
            {selectedForDelete.length > 0 && (
              <Button
                variant="danger"
                size="sm"
                className="mb-3"
                onClick={handleDeleteSelected}
              >
                Delete selected folders ({selectedForDelete.length})
              </Button>
            )}

            {/* Folder list */}
            <div className="list-group">
              {folders.map((folder: any) => (
                <div
                  key={folder._id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center gap-2">
                    <FormCheck
                      checked={selectedForDelete.includes(folder._id)}
                      onChange={() => toggleSelectForDelete(folder._id)}
                    />
                    {editingId === folder._id ? (
                      <FormControl
                        size="sm"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveEdit(folder._id);
                        }}
                      />
                    ) : (
                      <span>{folder.name}</span>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    {editingId === folder._id ? (
                      <>
                        <Button size="sm" onClick={() => handleSaveEdit(folder._id)}>
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setEditingId(null);
                            setEditName("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => {
                          setEditingId(folder._id);
                          setEditName(folder.name);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
