import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import modulesReducer from "./courses/[cid]/modules/reducer";
import accountReducer from "./account/reducer";
import assignmentsReducer from "./courses/[cid]/assignments/reducer";
import pazzaReducer from "./courses/[cid]/pazza/reducer";
const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    pazzaReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
