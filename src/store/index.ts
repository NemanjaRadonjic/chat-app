import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./reducers/currentUser";

export const store = configureStore({
  reducer: { currentUser: currentUserReducer },
});

export type RootState = ReturnType<typeof store.getState>;
