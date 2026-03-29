/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },

    addEnrollment: (state, { payload }) => {
      const { user, course } = payload;
      const exists = state.enrollments.some((e: any) => e.user === user && e.course === course);
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
        (e: any) => !(e.user === user && e.course === course),
      );
    },
  },
});

export const { setEnrollments, addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
