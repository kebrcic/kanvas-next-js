/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setPosts, setStats } from "./reducer";
import * as pazzaClient from "./client";
import FolderFilters from "./components/FolderFilters";
import ListOfPosts from "./components/ListOfPosts";
import ClassAtGlance from "./components/ClassAtGlance";
import NewPostScreen from "./components/NewPostScreen";
import ViewPost from "./components/ViewPost";

export default function PazzaQAScreen() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : (cid as string);
  const dispatch = useDispatch();

  const { selectedPostId, showNewPost, selectedFolder, searchQuery } = useSelector(
    (state: RootState) => state.pazzaReducer,
  );

  const loadPosts = useCallback(async () => {
    try {
      const posts = await pazzaClient.fetchPosts(
        courseId,
        selectedFolder || undefined,
        searchQuery || undefined,
      );
      dispatch(setPosts(posts));
    } catch (err) {
      console.error(err);
    }
  }, [courseId, selectedFolder, searchQuery, dispatch]);

  const loadStats = useCallback(async () => {
    try {
      const stats = await pazzaClient.fetchStats(courseId);
      dispatch(setStats(stats));
    } catch (err) {
      console.error(err);
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    loadPosts();
    loadStats();
  }, [loadPosts, loadStats]);

  return (
    <div className="d-flex flex-column" style={{ height: "calc(100vh - 150px)" }}>
      {/* Folder Filters */}
      <FolderFilters />

      {/* Two-column layout */}
      <div className="d-flex flex-fill overflow-hidden">
        {/* List of Posts Sidebar */}
        <ListOfPosts />

        {/* Post Screen */}
        <div className="flex-fill overflow-auto">
          {showNewPost ? <NewPostScreen /> : selectedPostId ? <ViewPost /> : <ClassAtGlance />}
        </div>
      </div>
    </div>
  );
}
