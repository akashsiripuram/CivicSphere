import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectSlice from "./projectSlice";

 const store = configureStore({
  reducer: {
    auth:authReducer,
    project:projectSlice
  },
});
export default store;