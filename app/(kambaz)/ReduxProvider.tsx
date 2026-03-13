"use client"; // This creates the necessary boundary

import { Provider } from "react-redux";
import store from "./store";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
