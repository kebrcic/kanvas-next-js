/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const PAZZA_API = (cid: string) => `${HTTP_SERVER}/api/courses/${cid}/pazza`;

// Folders
export const fetchFolders = async (cid: string) => {
  const { data } = await axiosWithCredentials.get(`${PAZZA_API(cid)}/folders`);
  return data;
};
export const createFolder = async (cid: string, name: string) => {
  const { data } = await axiosWithCredentials.post(`${PAZZA_API(cid)}/folders`, { name });
  return data;
};
export const createDefaultFolders = async (cid: string) => {
  const { data } = await axiosWithCredentials.post(`${PAZZA_API(cid)}/folders/defaults`);
  return data;
};
export const updateFolder = async (cid: string, folderId: string, name: string) => {
  const { data } = await axiosWithCredentials.put(`${PAZZA_API(cid)}/folders/${folderId}`, { name });
  return data;
};
export const deleteFolder = async (cid: string, folderId: string) => {
  const { data } = await axiosWithCredentials.delete(`${PAZZA_API(cid)}/folders/${folderId}`);
  return data;
};

// Posts
export const fetchPosts = async (cid: string, folder?: string, search?: string) => {
  const params = new URLSearchParams();
  if (folder) params.set("folder", folder);
  if (search) params.set("search", search);
  const query = params.toString() ? `?${params.toString()}` : "";
  const { data } = await axiosWithCredentials.get(`${PAZZA_API(cid)}/posts${query}`);
  return data;
};
export const fetchPost = async (cid: string, postId: string) => {
  const { data } = await axiosWithCredentials.get(`${PAZZA_API(cid)}/posts/${postId}`);
  return data;
};
export const createPost = async (cid: string, post: any) => {
  const { data } = await axiosWithCredentials.post(`${PAZZA_API(cid)}/posts`, post);
  return data;
};
export const updatePost = async (cid: string, postId: string, post: any) => {
  const { data } = await axiosWithCredentials.put(`${PAZZA_API(cid)}/posts/${postId}`, post);
  return data;
};
export const deletePost = async (cid: string, postId: string) => {
  const { data } = await axiosWithCredentials.delete(`${PAZZA_API(cid)}/posts/${postId}`);
  return data;
};

// Answers
export const fetchAnswers = async (cid: string, postId: string) => {
  const { data } = await axiosWithCredentials.get(`${PAZZA_API(cid)}/posts/${postId}/answers`);
  return data;
};
export const createAnswer = async (cid: string, postId: string, content: string) => {
  const { data } = await axiosWithCredentials.post(`${PAZZA_API(cid)}/posts/${postId}/answers`, { content });
  return data;
};
export const updateAnswer = async (cid: string, answerId: string, content: string) => {
  const { data } = await axiosWithCredentials.put(`${PAZZA_API(cid)}/answers/${answerId}`, { content });
  return data;
};
export const deleteAnswer = async (cid: string, answerId: string) => {
  const { data } = await axiosWithCredentials.delete(`${PAZZA_API(cid)}/answers/${answerId}`);
  return data;
};

// Followups
export const fetchFollowups = async (cid: string, postId: string) => {
  const { data } = await axiosWithCredentials.get(`${PAZZA_API(cid)}/posts/${postId}/followups`);
  return data;
};
export const createFollowup = async (cid: string, postId: string, content: string) => {
  const { data } = await axiosWithCredentials.post(`${PAZZA_API(cid)}/posts/${postId}/followups`, { content });
  return data;
};
export const updateFollowup = async (cid: string, followupId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(`${PAZZA_API(cid)}/followups/${followupId}`, updates);
  return data;
};
export const deleteFollowup = async (cid: string, followupId: string) => {
  const { data } = await axiosWithCredentials.delete(`${PAZZA_API(cid)}/followups/${followupId}`);
  return data;
};

// Replies
export const fetchReplies = async (cid: string, followupId: string) => {
  const { data } = await axiosWithCredentials.get(`${PAZZA_API(cid)}/followups/${followupId}/replies`);
  return data;
};
export const createReply = async (cid: string, followupId: string, content: string) => {
  const { data } = await axiosWithCredentials.post(`${PAZZA_API(cid)}/followups/${followupId}/replies`, { content });
  return data;
};
export const updateReply = async (cid: string, replyId: string, content: string) => {
  const { data } = await axiosWithCredentials.put(`${PAZZA_API(cid)}/replies/${replyId}`, { content });
  return data;
};
export const deleteReply = async (cid: string, replyId: string) => {
  const { data } = await axiosWithCredentials.delete(`${PAZZA_API(cid)}/replies/${replyId}`);
  return data;
};

// Stats
export const fetchStats = async (cid: string) => {
  const { data } = await axiosWithCredentials.get(`${PAZZA_API(cid)}/stats`);
  return data;
};
