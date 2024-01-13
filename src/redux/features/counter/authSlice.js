import { createSlice } from "@reduxjs/toolkit";
import ApplicationModal from "../../json/ApplicationModal";

export const auth = createSlice({
  name: "auth",
  initialState: {
    config: window.localStorage.getItem("config")
      ? typeof window.localStorage.getItem("config") == "string"
        ? JSON.parse(window.localStorage.getItem("config"))
        : window.localStorage.getItem("config")
      : ApplicationModal,
  },
  reducers: {
    saveConfig: (state, action) => {
      state.config = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveConfig } = auth.actions;

export default auth.reducer;
