import { enrollments } from "../database";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload }) => {
      const { user, course } = payload;

      const exists = state.enrollments.some((e) => e.user === user && e.course === course);

      if (!exists) {
        state.enrollments.push({
          _id: new Date().getTime().toString(),
          user,
          course,
        });
      }
    },

    deleteEnrollment: (state, { payload }) => {
      const { user, course } = payload;

      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course),
      );
    },
  },
});

export const { addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
