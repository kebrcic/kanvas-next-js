/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedFolder } from "../reducer";

export default function FolderFilters() {
  const dispatch = useDispatch();
  const { folders, selectedFolder } = useSelector((state: RootState) => state.pazzaReducer);

  return (
    <div className="d-flex flex-wrap gap-1 px-3 py-2 border-bottom bg-light"
         style={{ position: "sticky", top: 0, zIndex: 5 }}>
      <span
        className="badge"
        style={{ backgroundColor: selectedFolder === null ? "#4a90b8" : "#6c757d", cursor: "pointer" }}
        onClick={() => dispatch(setSelectedFolder(null))}
      >
        All
      </span>
      {folders.map((folder: any) => (
        <span
          key={folder._id}
          className="badge"
          style={{ backgroundColor: selectedFolder === folder._id ? "#4a90b8" : "#6c757d", cursor: "pointer" }}
          onClick={() =>
            dispatch(setSelectedFolder(selectedFolder === folder._id ? null : folder._id))
          }
        >
          {folder.name}
        </span>
      ))}
    </div>
  );
}
