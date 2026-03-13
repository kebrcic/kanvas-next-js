/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        course: assignment.course,
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        due_date: assignment.due_date,
        available_from_date: assignment.available_from_date,
        available_until_date: assignment.available_to_date,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.filter((a) => a._id !== assignment._id);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) => (a._id === assignment._id ? assignment : a));
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a,
      );
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
