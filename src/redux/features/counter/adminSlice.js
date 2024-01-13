import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
  name: "admin",
  initialState: {
    accessToken: window.localStorage.getItem("accessToken")
      ? typeof window.localStorage.getItem("accessToken") == "string"
        ? JSON.parse(window.localStorage.getItem("accessToken"))
        : window.localStorage.getItem("accessToken")
      : null,
    refreshToken: window.localStorage.getItem("refreshToken")
      ? typeof window.localStorage.getItem("refreshToken") == "string"
        ? JSON.parse(window.localStorage.getItem("refreshToken"))
        : window.localStorage.getItem("refreshToken")
      : null,
    user: window.localStorage.getItem("user")
      ? typeof window.localStorage.getItem("user") == "string"
        ? JSON.parse(window.localStorage.getItem("user"))
        : window.localStorage.getItem("user")
      : null,
  },
  reducers: {
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    user: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { accessToken, refreshToken, user } = admin.actions;

export default admin.reducer;
