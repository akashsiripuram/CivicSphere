import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
 isLoading:false,
 issues:[],
 issue:null,
};

export const fetchIssues = createAsyncThunk("/issues", async () => {
 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/issues/all`);
 return response.data;
});
const addIssue=createAsyncThunk("/issues/report", async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/issues/report`);
    return response.data;
})

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
        builder.addCase(addIssue.pending,(state)=>{
            state.isLoading=true;
        }),
        builder.addCase(addIssue.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.issues.push(action.payload.issue);
        }),
        builder.addCase(addIssue.rejected,(state,action)=>{
            state.isLoading=false;
            console.error(`Failed to add issue: ${action.error.message}`);
        })
    }
});

export default issueSlice.reducer;