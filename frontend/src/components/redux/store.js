import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectSlice from "./projectSlice";
import issueSlice from "./issueSlice";

 const store = configureStore({
  reducer: {
    auth:authReducer,
    project:projectSlice,
    issue:issueSlice,
  
  },
});
export default store;