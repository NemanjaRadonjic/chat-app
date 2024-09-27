import { configureStore } from "@reduxjs/toolkit";
import currentUser from "./reducers/currentUser";
import onlineUsers from "./reducers/onlineUsers";

export const store = configureStore({
  reducer: { currentUser, onlineUsers },
});

export type RootState = ReturnType<typeof store.getState>;
