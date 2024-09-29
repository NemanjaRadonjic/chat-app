import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(window.localStorage.getItem("currentUser")!);

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    signIn: (_state, action) => ({ ...action.payload }),
    signOut: () => null,
  },
});

export const { signIn: signInAction, signOut: signOutAction } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;
