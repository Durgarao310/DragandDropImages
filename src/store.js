import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import projectReducer from "./redux/project";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
  devTools: false,
   middleware: getDefaultMiddleware({
   serializableCheck: false
  }),
});

