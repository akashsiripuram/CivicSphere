import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
 isLoading:false,
 issues:[]
};

export const fetchIssues = createAsyncThunk("/issues", async () => {
 const response = await axios.get("http://localhost:8080/api/issues/all");
 return response.data;
});

const issueSlice=createSlice({
    name:"issue",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchIssues.pending,(state)=>{
            state.isLoading=true;
        }),
        builder.addCase(fetchIssues.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.issues=action.payload.issues;
        }),
        builder.addCase(fetchIssues.rejected,(state,action)=>{
            state.isLoading=false;
            console.error(`Failed to fetch issues: ${action.error.message}`);
        })
    }
});

export default issueSlice.reducer;