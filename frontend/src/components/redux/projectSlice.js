import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    projects:[]
};

export const fetchProjects = createAsyncThunk("/project", async () => {
    const response = await axios.get("http://localhost:8080/api/project");
    return response.data;
});

const projectSlice=createSlice({
    name:"project",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProjects.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(fetchProjects.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.projects=action.payload.success?action.payload.project:null;

        })
        builder.addCase(fetchProjects.rejected,(state)=>{
            state.isLoading=false;
        })
    }
})



export default projectSlice.reducer;



