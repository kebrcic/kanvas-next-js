/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [] as any[],
  posts: [] as any[],
  selectedPostId: null as string | null,
  selectedFolder: null as string | null,
  searchQuery: "",
  showSidebar: true,
  showNewPost: false,
  stats: null as any,
  currentPostAnswers: [] as any[],
  currentPostFollowups: [] as any[],
  followupReplies: {} as Record<string, any[]>,
  // "resolved" | "unresolved" | "none" per post id
  postFollowupStatus: {} as Record<string, string>,
};

const pazzaSlice = createSlice({
  name: "pazza",
  initialState,
  reducers: {
    // Folders
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    addFolder: (state, action) => {
      state.folders = [...state.folders, action.payload];
    },
    updateFolder: (state, action) => {
      state.folders = state.folders.map((f: any) =>
        f._id === action.payload._id ? action.payload : f,
      );
    },
    removeFolder: (state, action) => {
      state.folders = state.folders.filter((f: any) => f._id !== action.payload);
    },

    // Posts
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((p: any) =>
        p._id === action.payload._id ? action.payload : p,
      );
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((p: any) => p._id !== action.payload);
    },

    // Selection & UI
    setSelectedPostId: (state, action) => {
      state.selectedPostId = action.payload;
      state.showNewPost = false;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setShowNewPost: (state, action) => {
      state.showNewPost = action.payload;
      if (action.payload) state.selectedPostId = null;
    },

    // Stats
    setStats: (state, action) => {
      state.stats = action.payload;
    },

    // Answers
    setCurrentPostAnswers: (state, action) => {
      state.currentPostAnswers = action.payload;
    },
    addAnswer: (state, action) => {
      state.currentPostAnswers = [...state.currentPostAnswers, action.payload];
    },
    updateAnswer: (state, action) => {
      state.currentPostAnswers = state.currentPostAnswers.map((a: any) =>
        a._id === action.payload._id ? action.payload : a,
      );
    },
    removeAnswer: (state, action) => {
      state.currentPostAnswers = state.currentPostAnswers.filter(
        (a: any) => a._id !== action.payload,
      );
    },

    // Post followup status
    setPostFollowupStatus: (state, action) => {
      const { postId, status } = action.payload;
      state.postFollowupStatus[postId] = status;
    },

    // Followups
    setCurrentPostFollowups: (state, action) => {
      state.currentPostFollowups = action.payload;
    },
    addFollowup: (state, action) => {
      state.currentPostFollowups = [...state.currentPostFollowups, action.payload];
    },
    updateFollowup: (state, action) => {
      state.currentPostFollowups = state.currentPostFollowups.map((f: any) =>
        f._id === action.payload._id ? action.payload : f,
      );
    },
    removeFollowup: (state, action) => {
      state.currentPostFollowups = state.currentPostFollowups.filter(
        (f: any) => f._id !== action.payload,
      );
    },

    // Replies
    setFollowupReplies: (state, action) => {
      const { followupId, replies } = action.payload;
      state.followupReplies[followupId] = replies;
    },
    addReply: (state, action) => {
      const { followupId, reply } = action.payload;
      if (!state.followupReplies[followupId]) {
        state.followupReplies[followupId] = [];
      }
      state.followupReplies[followupId] = [...state.followupReplies[followupId], reply];
    },
    updateReply: (state, action) => {
      const { followupId, reply } = action.payload;
      if (state.followupReplies[followupId]) {
        state.followupReplies[followupId] = state.followupReplies[followupId].map((r: any) =>
          r._id === reply._id ? reply : r,
        );
      }
    },
    removeReply: (state, action) => {
      const { followupId, replyId } = action.payload;
      if (state.followupReplies[followupId]) {
        state.followupReplies[followupId] = state.followupReplies[followupId].filter(
          (r: any) => r._id !== replyId,
        );
      }
    },

    // Reset when switching courses
    resetPazza: () => initialState,
  },
});

export const {
  setFolders,
  addFolder,
  updateFolder,
  removeFolder,
  setPosts,
  addPost,
  updatePost,
  removePost,
  setSelectedPostId,
  setSelectedFolder,
  setSearchQuery,
  toggleSidebar,
  setShowNewPost,
  setStats,
  setPostFollowupStatus,
  setCurrentPostAnswers,
  addAnswer,
  updateAnswer,
  removeAnswer,
  setCurrentPostFollowups,
  addFollowup,
  updateFollowup,
  removeFollowup,
  setFollowupReplies,
  addReply,
  updateReply,
  removeReply,
  resetPazza,
} = pazzaSlice.actions;
export default pazzaSlice.reducer;
