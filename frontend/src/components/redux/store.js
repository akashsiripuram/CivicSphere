import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectSlice from "./projectSlice";
import issueSlice from "./issueSlice";
import resourceSlice from "./resourceSlice";

 const store = configureStore({
  reducer: {
    auth:authReducer,
    project:projectSlice,
    issue:issueSlice,
    resource:resourceSlice,
  
  },
});
export default store;