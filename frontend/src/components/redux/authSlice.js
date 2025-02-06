import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
   
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );
    

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "http://localhost:8080/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(registerUser.pending,(state)=>{
        state.isLoading=true;
    })
    .addCase(registerUser.fulfilled,(state)=>{
        state.isLoading=false;
        state.isAuthenticated=false;
        state.user=null;
    })
    .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
       

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
     
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;