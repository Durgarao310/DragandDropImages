import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: {},
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.project = action.payload;
    },
    removeProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProject, removeProject } = projectSlice.actions;

export default projectSlice.reducer;
