// userSessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSessionSlice = createSlice({
  name: "userSession",
  initialState: null,
  reducers: {
    setSession: (state, action) => action.payload,
    clearSession: (state) => null,
  },
});

export const { setSession, clearSession } = userSessionSlice.actions;

export default userSessionSlice.reducer;
