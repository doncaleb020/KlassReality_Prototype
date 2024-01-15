import { createSlice } from "@reduxjs/toolkit";
import ApplicationModal from "../../json/ApplicationModal";

const { sessionModal, assessmentModal, contentModal } = ApplicationModal();
export const application = createSlice({
  name: "application",
  initialState: {
    session: window.localStorage.getItem("session")
      ? typeof window.localStorage.getItem("session") == "string"
        ? JSON.parse(window.localStorage.getItem("session"))
        : window.localStorage.getItem("session")
      : sessionModal,
    assessmentData: window.localStorage.getItem("assessmentData")
      ? typeof window.localStorage.getItem("assessmentData") == "string"
        ? JSON.parse(window.localStorage.getItem("assessmentData"))
        : window.localStorage.getItem("assessmentData")
      : assessmentModal,
    contentData: window.localStorage.getItem("contentData")
      ? typeof window.localStorage.getItem("contentData") == "string"
        ? JSON.parse(window.localStorage.getItem("contentData"))
        : window.localStorage.getItem("contentData")
      : contentModal,
    defaultStep: window.localStorage.getItem("step")
      ? typeof window.localStorage.getItem("step") == "string"
        ? JSON.parse(window.localStorage.getItem("step"))
        : window.localStorage.getItem("step")
      : 1,
  },

  reducers: {
    assessmentData: (state, action) => {
      state.data = action.payload;
      window.localStorage.setItem("assessmentData", JSON.stringify(state.data));
    },
    contentData: (state, action) => {
      state.contentData = action.payload;
      window.localStorage.setItem("contentData", JSON.stringify(state.contentData));
    },
    step: (state, action) => {
      state.defaultStep = action.payload;
      window.localStorage.setItem("step", JSON.stringify(state.defaultStep));
    },
    session: (state, action) => {
      state.session = action.payload;
      window.localStorage.setItem("session", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { assessmentData, contentData, step, session } =
  application.actions;

export default application.reducer;
