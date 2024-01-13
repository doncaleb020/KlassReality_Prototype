import { createSlice } from "@reduxjs/toolkit";
import ApplicationModal from "../../json/ApplicationModal";

export const application = createSlice({
  name: "application",
  initialState: {
    applicationId: window.localStorage.getItem("applicationId")
      ? window.localStorage.getItem("applicationId")
      : "",
    data: window.localStorage.getItem("data")
      ? typeof window.localStorage.getItem("data") == "string"
        ? JSON.parse(window.localStorage.getItem("data"))
        : window.localStorage.getItem("data")
      : ApplicationModal,
    defaultStep: window.localStorage.getItem("step")
      ? typeof window.localStorage.getItem("step") == "string"
        ? JSON.parse(window.localStorage.getItem("step"))
        : window.localStorage.getItem("step")
      : 1,
  },

  reducers: {
    data: (state, action) => {
      state.data = action.payload;
      window.localStorage.setItem("data", JSON.stringify(state.data));
    },
    step: (state, action) => {
      state.defaultStep = action.payload;
      window.localStorage.setItem("step", JSON.stringify(state.defaultStep));
    },
    applicationId: (state, action) => {
      state.applicationId = action.payload;
      window.localStorage.setItem("applicationId", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  data,
  step,
  applicationId,
} = application.actions;

export default application.reducer;
