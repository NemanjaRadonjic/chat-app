import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setOnlineUsers: (_state, action) => [...action.payload],
  },
});

export const { setOnlineUsers } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
